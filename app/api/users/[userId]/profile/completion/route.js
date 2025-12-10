/**
 * Profile Completion API
 * Calculates profile completion percentage based on auto_apply_cand and parsed_cand_resume tables
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import prisma from '@/lib/prisma';

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
        parsed_cand_resume: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const parsedResume = candidate.parsed_cand_resume;

    // Define required fields and their weights
    const sections = {
      general: {
        label: 'General Information',
        weight: 25,
        fields: [
          { name: 'first_name', value: candidate.first_name },
          { name: 'last_name', value: candidate.last_name },
          { name: 'email', value: candidate.email },
          { name: 'mobile', value: candidate.mobile },
          { name: 'address', value: candidate.address },
          { name: 'city', value: candidate.city },
          { name: 'country', value: candidate.country },
        ],
      },
      professional: {
        label: 'Professional Summary',
        weight: 15,
        fields: [
          { name: 'professional_summary', value: parsedResume?.professional_summary },
        ],
      },
      skills: {
        label: 'Skills & Experience',
        weight: 20,
        fields: [
          { name: 'technical_skills', value: parsedResume?.technical_skills, isArray: true },
          { name: 'soft_skills', value: parsedResume?.soft_skills, isArray: true },
          { name: 'total_experience_years', value: parsedResume?.total_experience_years },
        ],
      },
      education: {
        label: 'Education',
        weight: 15,
        fields: [
          { name: 'education', value: parsedResume?.education, isArray: true, isJson: true },
        ],
      },
      workExperience: {
        label: 'Work Experience',
        weight: 15,
        fields: [
          { name: 'work_experience', value: parsedResume?.work_experience, isArray: true, isJson: true },
        ],
      },
      resume: {
        label: 'Resume',
        weight: 10,
        fields: [
          { name: 'resume_file_name', value: candidate.resume_file_name },
          { name: 'resume_parsed_at', value: parsedResume?.parsed_at },
        ],
      },
    };

    // Calculate completion for each section
    const sectionCompletions = {};
    let totalWeight = 0;
    let completedWeight = 0;
    const missingSections = [];

    for (const [key, section] of Object.entries(sections)) {
      const fieldCount = section.fields.length;
      let completedFields = 0;

      for (const field of section.fields) {
        let isCompleted = false;

        if (field.isJson) {
          // Parse JSON fields
          try {
            const parsed = typeof field.value === 'string' 
              ? JSON.parse(field.value) 
              : field.value;
            isCompleted = Array.isArray(parsed) && parsed.length > 0;
          } catch {
            isCompleted = false;
          }
        } else if (field.isArray) {
          isCompleted = Array.isArray(field.value) && field.value.length > 0;
        } else {
          isCompleted = field.value !== null && field.value !== undefined && field.value !== '';
        }

        if (isCompleted) {
          completedFields++;
        }
      }

      const sectionPercentage = (completedFields / fieldCount) * 100;
      const sectionScore = (sectionPercentage / 100) * section.weight;
      
      sectionCompletions[key] = {
        label: section.label,
        percentage: Math.round(sectionPercentage),
        completed: completedFields,
        total: fieldCount,
        status: sectionPercentage === 100 ? 'complete' : sectionPercentage >= 50 ? 'partial' : 'incomplete',
      };

      totalWeight += section.weight;
      completedWeight += sectionScore;

      if (sectionPercentage < 100) {
        missingSections.push({
          section: section.label,
          percentage: Math.round(sectionPercentage),
          missing: fieldCount - completedFields,
        });
      }
    }

    // Calculate overall completion percentage
    const overallPercentage = totalWeight > 0 
      ? Math.round((completedWeight / totalWeight) * 100) 
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        overallPercentage,
        sections: sectionCompletions,
        missingSections: missingSections.sort((a, b) => b.percentage - a.percentage),
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId]/profile/completion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate completion' },
      { status: 500 }
    );
  }
}

