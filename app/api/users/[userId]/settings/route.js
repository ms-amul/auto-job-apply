/**
 * User Settings API
 * Handles notification preferences and other user settings
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

// Get user settings
export async function GET(_request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.candidate_id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = await params;
    const candidateId = parseInt(userId);

    // Verify user owns this resource
    if (session.user.candidate_id !== candidateId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Fetch user from database
    const candidate = await prisma.auto_apply_cand.findUnique({
      where: { cand_id: candidateId },
      select: {
        notify_email: true,
        notify_sms: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: {
        emailNotifications: candidate.notify_email ?? true,
        pushNotifications: false, // Not implemented yet
        jobAlerts: candidate.notify_email ?? true,
        weeklyDigest: candidate.notify_email ?? true,
        smsNotifications: candidate.notify_sms ?? false,
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// Update user settings
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.candidate_id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = await params;
    const candidateId = parseInt(userId);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    // Verify user owns this resource
    if (session.user.candidate_id !== candidateId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Build update object surgically
    const updateData = {
      updated_at: new Date(),
    };

    if (body.emailNotifications !== undefined) updateData.notify_email = body.emailNotifications;
    if (body.smsNotifications !== undefined) updateData.notify_sms = body.smsNotifications;

    // If jobAlerts or weeklyDigest are provided, they also influence notify_email for now
    // but only if emailNotifications itself wasn't explicitly provided
    if (body.emailNotifications === undefined) {
      if (body.jobAlerts !== undefined) updateData.notify_email = body.jobAlerts;
      else if (body.weeklyDigest !== undefined) updateData.notify_email = body.weeklyDigest;
    }

    const updated = await prisma.auto_apply_cand.update({
      where: { cand_id: candidateId },
      data: updateData,
      select: {
        notify_email: true,
        notify_sms: true,
      },
    });

    return NextResponse.json({
      success: true,
      settings: {
        emailNotifications: updated.notify_email ?? true,
        pushNotifications: false,
        jobAlerts: updated.notify_email ?? true,
        weeklyDigest: updated.notify_email ?? true,
        smsNotifications: updated.notify_sms ?? false,
      },
    });
  } catch (error) {
    console.error('PUT /api/users/[userId]/settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

