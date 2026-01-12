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
    });

    // Map database fields to application-friendly names if needed, 
    // or return as is. The UI expects certain names.
    const agent = preferences ? {
      userId: preferences.cand_id.toString(),
      status: preferences.is_active ? 'running' : 'paused',
      dailyLimit: preferences.daily_application_limit,
      keywords: preferences.job_keywords,
      applyRecentFirst: preferences.apply_most_recent_jobs_first,
      // Notifications are currently separate in schema, 
      // but we can default them or fetch from candidate table if needed
      emailNotifications: true,
      smsNotifications: false,
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

    // Upsert preferences in PostgreSQL
    const updatedPref = await prisma.auto_apply_agent_preferences.upsert({
      where: { cand_id: candId },
      update: {
        daily_application_limit: body.dailyLimit ?? 10,
        job_keywords: body.keywords ?? [],
        apply_most_recent_jobs_first: body.applyRecentFirst !== undefined ? body.applyRecentFirst : true,
        is_active: body.status === 'running',
        updated_at: now,
      },
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

    const agentDoc = {
      userId: updatedPref.cand_id.toString(),
      status: updatedPref.is_active ? 'running' : 'paused',
      dailyLimit: updatedPref.daily_application_limit,
      keywords: updatedPref.job_keywords,
      emailNotifications: body.emailNotifications !== undefined ? body.emailNotifications : true,
      smsNotifications: body.smsNotifications ?? false,
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
