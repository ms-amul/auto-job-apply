/**
 * Work Experience & Projects API
 * Returns and updates work experience and projects from parsed_cand_resume table
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

// Get work experience and projects
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
        work_experience: true,
        projects: true,
      },
    });

    // Parse JSON fields
    let workExperience = [];
    let projects = [];
    
    if (parsedResume?.work_experience) {
      try {
        workExperience = typeof parsedResume.work_experience === 'string' 
          ? JSON.parse(parsedResume.work_experience) 
          : parsedResume.work_experience;
      } catch (e) {
        console.error('Error parsing work_experience:', e);
      }
    }

    if (parsedResume?.projects) {
      try {
        projects = typeof parsedResume.projects === 'string' 
          ? JSON.parse(parsedResume.projects) 
          : parsedResume.projects;
      } catch (e) {
        console.error('Error parsing projects:', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        work_experience: Array.isArray(workExperience) ? workExperience : [],
        projects: Array.isArray(projects) ? projects : [],
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/profile/work-projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Update work experience and projects
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
        work_experience: body.work_experience || [],
        projects: body.projects || [],
        last_updated: now,
      },
      create: {
        cand_id: candidateId,
        work_experience: body.work_experience || [],
        projects: body.projects || [],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Work experience and projects updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/users/[userId]/profile/work-projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    );
  }
}

