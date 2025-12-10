/**
 * Skills, Education & Certifications API
 * Returns and updates skills, education, and certifications from parsed_cand_resume table
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

// Get skills, education, and certifications
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

    const parsedResume = await prisma.parsed_cand_resume.findUnique({
      where: { cand_id: candidateId },
      select: {
        technical_skills: true,
        soft_skills: true,
        languages: true,
        total_experience_years: true,
        education: true,
        certifications: true,
      },
    });

    // Parse JSON fields
    let education = [];
    let certifications = [];
    
    if (parsedResume?.education) {
      try {
        education = typeof parsedResume.education === 'string' 
          ? JSON.parse(parsedResume.education) 
          : parsedResume.education;
      } catch (e) {
        console.error('Error parsing education:', e);
      }
    }

    if (parsedResume?.certifications) {
      try {
        certifications = typeof parsedResume.certifications === 'string' 
          ? JSON.parse(parsedResume.certifications) 
          : parsedResume.certifications;
      } catch (e) {
        console.error('Error parsing certifications:', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        technical_skills: parsedResume?.technical_skills || [],
        soft_skills: parsedResume?.soft_skills || [],
        languages: parsedResume?.languages || [],
        total_experience_years: parsedResume?.total_experience_years ?? 0,
        education: Array.isArray(education) ? education : [],
        certifications: Array.isArray(certifications) ? certifications : [],
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/profile/skills-experience error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Update skills, education, and certifications
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

    const updated = await prisma.parsed_cand_resume.upsert({
      where: { cand_id: candidateId },
      update: {
        technical_skills: body.technical_skills || [],
        soft_skills: body.soft_skills || [],
        languages: body.languages || [],
        total_experience_years: body.total_experience_years ? parseInt(body.total_experience_years) : 0,
        education: body.education || [],
        certifications: body.certifications || [],
        last_updated: now,
      },
      create: {
        cand_id: candidateId,
        technical_skills: body.technical_skills || [],
        soft_skills: body.soft_skills || [],
        languages: body.languages || [],
        total_experience_years: body.total_experience_years ? parseInt(body.total_experience_years) : 0,
        education: body.education || [],
        certifications: body.certifications || [],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Skills, education, and certifications updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/users/[userId]/profile/skills-experience error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    );
  }
}

