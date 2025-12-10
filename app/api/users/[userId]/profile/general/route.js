/**
 * General Profile API
 * Returns and updates general candidate information from auto_apply_cand table
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

// Get general profile data
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
      include: {
        parsed_cand_resume: {
          select: {
            professional_summary: true,
          },
        },
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
      data: {
        // Basic Info
        first_name: candidate.first_name || '',
        last_name: candidate.last_name || '',
        email: candidate.email || '',
        
        // Contact Info
        mobile: candidate.mobile || '',
        home: candidate.home || '',
        work: candidate.work || '',
        work_ext: candidate.work_ext || '',
        
        // Location
        address: candidate.address || '',
        city: candidate.city || '',
        country: candidate.country || '',
        zipcode: candidate.zipcode || '',
        
        // Personal
        birth_date: candidate.birth_date ? candidate.birth_date.toISOString().split('T')[0] : null,
        over_18_age: candidate.over_18_age ?? true,
        
        // Professional Summary (from parsed resume)
        professional_summary: candidate.parsed_cand_resume?.professional_summary || '',
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/profile/general error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch general profile' },
      { status: 500 }
    );
  }
}

// Update general profile data
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

    // Update auto_apply_cand
    const updated = await prisma.auto_apply_cand.update({
      where: { cand_id: candidateId },
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        mobile: body.mobile || null,
        home: body.home || null,
        work: body.work || null,
        work_ext: body.work_ext || null,
        address: body.address || null,
        city: body.city || null,
        country: body.country || null,
        zipcode: body.zipcode || null,
        birth_date: body.birth_date ? new Date(body.birth_date) : null,
        over_18_age: body.over_18_age ?? true,
        profile_updated_on: now,
        updated_at: now,
      },
    });

    // Update professional_summary in parsed_cand_resume if provided
    if (body.professional_summary !== undefined) {
      await prisma.parsed_cand_resume.upsert({
        where: { cand_id: candidateId },
        update: {
          professional_summary: body.professional_summary || null,
          last_updated: now,
        },
        create: {
          cand_id: candidateId,
          professional_summary: body.professional_summary || null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'General profile updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/users/[userId]/profile/general error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update general profile' },
      { status: 500 }
    );
  }
}

