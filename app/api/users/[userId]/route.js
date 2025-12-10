import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';

/**
 * Get User Profile API
 * 
 * Returns complete profile data from:
 * - auto_apply_cand table (excluding password)
 * - parsed_cand_resume table (if exists)
 * - Related master tables (gender, ethnicity, race, disability, veteran)
 */
export async function GET(request, { params }) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { userId } = await params;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 },
      );
    }

    // Verify user can only access their own profile
    const sessionUserId = session.user.id || session.user.candidate_id?.toString();
    if (userId !== sessionUserId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 },
      );
    }

    const candidateId = parseInt(userId, 10);
    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 },
      );
    }

    // Fetch candidate data with related parsed resume
    const candidate = await prisma.auto_apply_cand.findUnique({
      where: { cand_id: candidateId },
      include: {
        parsed_cand_resume: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    // Fetch master table data if IDs exist
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

    // Parse JSON fields from parsed_cand_resume
    const parsedResume = candidate.parsed_cand_resume;
    let certifications = [];
    let education = [];
    let workExperience = [];
    let projects = [];

    if (parsedResume) {
      try {
        certifications = parsedResume.certifications ? (typeof parsedResume.certifications === 'string' ? JSON.parse(parsedResume.certifications) : parsedResume.certifications) : [];
        education = parsedResume.education ? (typeof parsedResume.education === 'string' ? JSON.parse(parsedResume.education) : parsedResume.education) : [];
        workExperience = parsedResume.work_experience ? (typeof parsedResume.work_experience === 'string' ? JSON.parse(parsedResume.work_experience) : parsedResume.work_experience) : [];
        projects = parsedResume.projects ? (typeof parsedResume.projects === 'string' ? JSON.parse(parsedResume.projects) : parsedResume.projects) : [];
      } catch (e) {
        console.error('Error parsing JSON fields:', e);
      }
    }

    // Combine data from both tables
    const profileData = {
      // Basic Info from auto_apply_cand
      candidate_id: candidate.cand_id,
      first_name: candidate.first_name || '',
      last_name: candidate.last_name || '',
      full_name: `${candidate.first_name || ''} ${candidate.last_name || ''}`.trim(),
      email: candidate.email || '',
      
      // Contact Info
      mobile: candidate.mobile || '',
      home: candidate.home || '',
      work: candidate.work || '',
      work_ext: candidate.work_ext || '',
      phone: candidate.mobile || candidate.home || candidate.work || '', // Primary phone
      
      // Location
      address: candidate.address || '',
      city: candidate.city || '',
      country: candidate.country || '',
      zipcode: candidate.zipcode || '',
      location: [candidate.city, candidate.country].filter(Boolean).join(', ') || '',
      
      // Personal Info
      birth_date: candidate.birth_date ? candidate.birth_date.toISOString().split('T')[0] : null,
      over_18_age: candidate.over_18_age ?? true,
      relocation: candidate.relocation ?? false,
      experience: candidate.experience ?? 0,
      yearsOfExperience: candidate.experience?.toString() || '',
      
      // Resume Info
      resume_storage_path: candidate.resume_storage_path || '',
      resume_file_name: candidate.resume_file_name || '',
      resume_file_type: candidate.resume_file_type || '',
      resume_file_size: candidate.resume_file_size || null,
      resume_upload_date: candidate.resume_upload_date ? candidate.resume_upload_date.toISOString() : null,
      resume_parsed_at: parsedResume?.parsed_at ? parsedResume.parsed_at.toISOString() : null,
      
      // Diversity & Inclusion (from master tables)
      gender_id: candidate.gender_id,
      gender: gender?.gender_text || '',
      ethnicity_id: candidate.ethnicity_id,
      ethnicity: ethnicity?.ethnicity_text || '',
      race_id: candidate.race_id,
      race: race?.race_text || '',
      disability_id: candidate.disability_id,
      disability: disability?.disability_text || '',
      hasDisability: candidate.disability_id ? (candidate.disability_id > 0 ? true : false) : null,
      veteran_disclosure_id: candidate.veteran_disclosure_id,
      veteran: veteran?.veteran_disclosure_text || '',
      isVeteran: candidate.veteran_disclosure_id ? (candidate.veteran_disclosure_id > 0 ? true : false) : null,
      
      // Timestamps
      created_at: candidate.created_at ? candidate.created_at.toISOString() : null,
      updated_at: candidate.updated_at ? candidate.updated_at.toISOString() : null,
      profile_updated_on: candidate.profile_updated_on ? candidate.profile_updated_on.toISOString() : null,
      
      // Data from parsed_cand_resume (if exists)
      parsed_resume: parsedResume ? {
        full_name: parsedResume.full_name || '',
        phone: parsedResume.phone || '',
        location: parsedResume.location || '',
        zipcode: parsedResume.zipcode || '',
        total_experience_years: parsedResume.total_experience_years ?? 0,
        professional_summary: parsedResume.professional_summary || '',
        technical_skills: parsedResume.technical_skills || [],
        soft_skills: parsedResume.soft_skills || [],
        languages: parsedResume.languages || [],
        certifications: certifications,
        education: education,
        work_experience: workExperience,
        projects: projects,
        achievements: parsedResume.achievements || [],
        parsed_at: parsedResume.parsed_at ? parsedResume.parsed_at.toISOString() : null,
        last_updated: parsedResume.last_updated ? parsedResume.last_updated.toISOString() : null,
      } : null,
    };

    return NextResponse.json({
      success: true,
      user: profileData,
    });
  } catch (error) {
    console.error('GET /api/users/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: `Failed to load profile: ${error.message}` },
      { status: 500 },
    );
  }
}

/**
 * Update User Profile API
 * 
 * Updates data in:
 * - auto_apply_cand table
 * - parsed_cand_resume table (if exists, or creates if needed)
 */
export async function PUT(request, { params }) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { userId } = await params;
    const body = await request.json();

    // Verify user can only update their own profile
    const sessionUserId = session.user.id || session.user.candidate_id?.toString();
    if (userId !== sessionUserId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 },
      );
    }

    const candidateId = parseInt(userId, 10);
    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 },
      );
    }

    // Check if candidate exists
    const candidate = await prisma.auto_apply_cand.findUnique({
      where: { cand_id: candidateId },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    const now = new Date();

    // Prepare update data for auto_apply_cand
    const updateData = {
      first_name: body.first_name || candidate.first_name,
      last_name: body.last_name || candidate.last_name,
      mobile: body.mobile || body.phone || candidate.mobile,
      home: body.home || candidate.home,
      work: body.work || candidate.work,
      work_ext: body.work_ext || candidate.work_ext,
      address: body.address || candidate.address,
      city: body.city || candidate.city,
      country: body.country || candidate.country,
      zipcode: body.zipcode || candidate.zipcode,
      relocation: body.relocation !== undefined ? body.relocation : candidate.relocation,
      experience: body.experience !== undefined ? parseInt(body.experience) || body.yearsOfExperience ? parseInt(body.yearsOfExperience) : candidate.experience : candidate.experience,
      profile_updated_on: now,
      updated_at: now,
    };

    // Handle birth_date
    if (body.birth_date) {
      updateData.birth_date = new Date(body.birth_date);
    }

    // Handle diversity fields - need to find IDs from master tables
    if (body.gender) {
      const genderRecord = await prisma.gender_master.findFirst({
        where: { gender_text: { equals: body.gender, mode: 'insensitive' } },
      });
      if (genderRecord) {
        updateData.gender_id = genderRecord.gender_id;
      }
    }

    if (body.ethnicity) {
      const ethnicityRecord = await prisma.ethnicity_master.findFirst({
        where: { ethnicity_text: { equals: body.ethnicity, mode: 'insensitive' } },
      });
      if (ethnicityRecord) {
        updateData.ethnicity_id = ethnicityRecord.ethnicity_id;
      }
    }

    if (body.race) {
      const raceRecord = await prisma.race_master.findFirst({
        where: { race_text: { equals: body.race, mode: 'insensitive' } },
      });
      if (raceRecord) {
        updateData.race_id = raceRecord.race_id;
      }
    }

    // Handle disability (boolean to ID mapping)
    if (body.hasDisability !== undefined) {
      if (body.hasDisability === true) {
        // Set a default disability_id (you may need to adjust this logic)
        const disabilityRecord = await prisma.disability_master.findFirst({
          where: { is_active: true },
        });
        if (disabilityRecord) {
          updateData.disability_id = disabilityRecord.disability_id;
        }
      } else if (body.hasDisability === false) {
        updateData.disability_id = null;
      }
    }

    // Handle veteran status
    if (body.isVeteran !== undefined) {
      if (body.isVeteran === true) {
        const veteranRecord = await prisma.veteran_disclosure_master.findFirst({
          where: { is_active: true },
        });
        if (veteranRecord) {
          updateData.veteran_disclosure_id = veteranRecord.veteran_disclosure_id;
        }
      } else if (body.isVeteran === false) {
        updateData.veteran_disclosure_id = null;
      }
    }

    // Update auto_apply_cand
    const updatedCandidate = await prisma.auto_apply_cand.update({
      where: { cand_id: candidateId },
      data: updateData,
    });

    // Update or create parsed_cand_resume if resume data is provided
    if (body.parsed_resume || body.technical_skills || body.soft_skills || body.languages) {
      const parsedResumeData = {
        technical_skills: body.technical_skills || body.parsed_resume?.technical_skills || [],
        soft_skills: body.soft_skills || body.parsed_resume?.soft_skills || [],
        languages: body.languages || body.parsed_resume?.languages || [],
        professional_summary: body.professional_summary || body.parsed_resume?.professional_summary || null,
        total_experience_years: body.total_experience_years || body.parsed_resume?.total_experience_years || candidate.experience || 0,
        last_updated: now,
      };

      // Handle JSON fields
      if (body.certifications || body.parsed_resume?.certifications) {
        parsedResumeData.certifications = body.certifications || body.parsed_resume?.certifications;
      }
      if (body.education || body.parsed_resume?.education) {
        parsedResumeData.education = body.education || body.parsed_resume?.education;
      }
      if (body.work_experience || body.parsed_resume?.work_experience) {
        parsedResumeData.work_experience = body.work_experience || body.parsed_resume?.work_experience;
      }
      if (body.projects || body.parsed_resume?.projects) {
        parsedResumeData.projects = body.projects || body.parsed_resume?.projects;
      }
      if (body.achievements || body.parsed_resume?.achievements) {
        parsedResumeData.achievements = body.achievements || body.parsed_resume?.achievements || [];
      }

      // Upsert parsed_cand_resume
      await prisma.parsed_cand_resume.upsert({
        where: { cand_id: candidateId },
        update: parsedResumeData,
        create: {
          cand_id: candidateId,
          ...parsedResumeData,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        candidate_id: updatedCandidate.cand_id,
        email: updatedCandidate.email,
      },
    });
  } catch (error) {
    console.error('PUT /api/users/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: `Failed to update profile: ${error.message}` },
      { status: 500 },
    );
  }
}
