/**
 * Preferences API
 * Returns and updates career preferences and diversity & inclusion data
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

// Get preferences
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

    if (session.user.candidate_id !== candidateId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const candidate = await prisma.auto_apply_cand.findUnique({
      where: { cand_id: candidateId },
      select: {
        relocation: true,
        experience: true,
        gender_id: true,
        ethnicity_id: true,
        race_id: true,
        disability_id: true,
        veteran_disclosure_id: true,
        Preferred_MinimumPayrate_PerHour: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch master table data
    const [gender, ethnicity, race, disability, veteran] = await Promise.all([
      candidate.gender_id
        ? prisma.gender_master.findUnique({ where: { gender_id: candidate.gender_id } })
        : null,
      candidate.ethnicity_id
        ? prisma.ethnicity_master.findUnique({ where: { ethnicity_id: candidate.ethnicity_id } })
        : null,
      candidate.race_id
        ? prisma.race_master.findUnique({ where: { race_id: candidate.race_id } })
        : null,
      candidate.disability_id
        ? prisma.disability_master.findUnique({ where: { disability_id: candidate.disability_id } })
        : null,
      candidate.veteran_disclosure_id
        ? prisma.veteran_disclosure_master.findUnique({ where: { veteran_disclosure_id: candidate.veteran_disclosure_id } })
        : null,
    ]);

    return NextResponse.json({
      success: true,
      data: {
        // Career Preferences
        relocation: candidate.relocation ?? false,
        experience: candidate.experience ?? 0,

        // Diversity & Inclusion - return both ID and text for proper handling
        gender_id: candidate.gender_id,
        gender: gender?.gender_text || '',
        ethnicity_id: candidate.ethnicity_id,
        ethnicity: ethnicity?.ethnicity_text || '',
        race_id: candidate.race_id,
        race: race?.race_text || '',
        disability_id: candidate.disability_id,
        disability: disability?.disability_text || '',
        veteran_disclosure_id: candidate.veteran_disclosure_id,
        veteran: veteran?.veteran_disclosure_text || '',
        min_payrate: candidate.Preferred_MinimumPayrate_PerHour || 25,
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/profile/preferences error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

// Update preferences
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

    if (session.user.candidate_id !== candidateId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const now = new Date();

    const updated = await prisma.auto_apply_cand.update({
      where: { cand_id: candidateId },
      data: {
        relocation: body.relocation ?? false,
        experience: body.experience ? parseInt(body.experience) : 0,
        gender_id: body.gender_id || null,
        ethnicity_id: body.ethnicity_id || null,
        race_id: body.race_id || null,
        disability_id: body.disability_id || null,
        veteran_disclosure_id: body.veteran_disclosure_id || null,
        Preferred_MinimumPayrate_PerHour: body.min_payrate ? parseFloat(body.min_payrate) : null,
        profile_updated_on: now,
        updated_at: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/users/[userId]/profile/preferences error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}

