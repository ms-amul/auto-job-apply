import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get agent configuration for user
export async function GET(_request, { params }) {
  try {
    const { userId } = await params;

    // Parse userId to Int for cand_id (PostgreSQL)
    const candId = parseInt(userId);

    if (isNaN(candId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    const preferences = await prisma.auto_apply_agent_preferences.findUnique({
      where: { cand_id: candId },
      include: {
        auto_apply_cand: {
          select: {
            notify_email: true,
            notify_sms: true,
          }
        }
      }
    });

    const agent = preferences ? {
      userId: preferences.cand_id.toString(),
      status: preferences.is_active ? 'running' : 'paused',
      dailyLimit: preferences.daily_application_limit,
      keywords: preferences.job_keywords,
      applyRecentFirst: preferences.apply_most_recent_jobs_first,
      emailNotifications: preferences.auto_apply_cand?.notify_email ?? true,
      smsNotifications: preferences.auto_apply_cand?.notify_sms ?? false,
    } : null;

    return NextResponse.json({
      success: true,
      agent: agent,
    });
  } catch (error) {
    console.error('GET /api/agent/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load agent config' },
      { status: 500 },
    );
  }
}

// Save / update agent configuration
export async function PUT(request, { params }) {
  try {
    const { userId } = await params;
    const body = await request.json();

    const candId = parseInt(userId);
    if (isNaN(candId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    const now = new Date();

    // Build update object dynamically to avoid resetting fields
    const updateData = { updated_at: now };
    if (body.dailyLimit !== undefined) updateData.daily_application_limit = body.dailyLimit;
    if (body.keywords !== undefined) updateData.job_keywords = body.keywords;
    if (body.applyRecentFirst !== undefined) updateData.apply_most_recent_jobs_first = body.applyRecentFirst;
    if (body.status !== undefined) updateData.is_active = body.status === 'running';

    // Use a transaction to update both preferences and candidate notification settings
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert preferences
      const updatedPref = await tx.auto_apply_agent_preferences.upsert({
        where: { cand_id: candId },
        update: updateData,
        create: {
          cand_id: candId,
          daily_application_limit: body.dailyLimit ?? 10,
          job_keywords: body.keywords ?? [],
          apply_most_recent_jobs_first: body.applyRecentFirst !== undefined ? body.applyRecentFirst : true,
          is_active: body.status === 'running',
          created_at: now,
          updated_at: now,
        },
      });

      // 2. Update candidate notification settings if provided
      const candUpdateData = {};
      if (body.emailNotifications !== undefined) candUpdateData.notify_email = body.emailNotifications;
      if (body.smsNotifications !== undefined) candUpdateData.notify_sms = body.smsNotifications;

      let updatedCand = null;
      if (Object.keys(candUpdateData).length > 0) {
        updatedCand = await tx.auto_apply_cand.update({
          where: { cand_id: candId },
          data: candUpdateData,
        });
      } else {
        updatedCand = await tx.auto_apply_cand.findUnique({
          where: { cand_id: candId },
          select: { notify_email: true, notify_sms: true }
        });
      }

      return { updatedPref, updatedCand };
    });

    const { updatedPref, updatedCand } = result;

    const agentDoc = {
      userId: updatedPref.cand_id.toString(),
      status: updatedPref.is_active ? 'running' : 'paused',
      dailyLimit: updatedPref.daily_application_limit,
      keywords: updatedPref.job_keywords,
      emailNotifications: updatedCand?.notify_email ?? true,
      smsNotifications: updatedCand?.notify_sms ?? false,
      applyRecentFirst: updatedPref.apply_most_recent_jobs_first,
      updatedAt: updatedPref.updated_at,
    };

    return NextResponse.json({
      success: true,
      agent: agentDoc,
    });
  } catch (error) {
    console.error('PUT /api/agent/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save agent config' },
      { status: 500 },
    );
  }
}
