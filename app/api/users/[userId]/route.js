import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

// Get user profile
export async function GET(_request, { params }) {
  try {
    const { userId } = await params;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 },
      );
    }

    const db = await getDb();
    const usersCol = db.collection('users');

    // Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 },
      );
    }

    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      console.log('User not found with ID:', userId);
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'applicant',
        profileCompleted: user.profileCompleted ?? false,
        phone: user.phone ?? '',
        location: user.location ?? '',
        title: user.title ?? '',
        bio: user.bio ?? '',
        willingToMoveToUS: user.willingToMoveToUS ?? null,
        hasVisa: user.hasVisa ?? null,
        needsVisaSponsorship: user.needsVisaSponsorship ?? null,
        yearsOfExperience: user.yearsOfExperience ?? '',
        preferredLocations: user.preferredLocations ?? [],
        salaryExpectation: user.salaryExpectation ?? '',
        resumeUrl: user.resumeUrl ?? '',
        technicalSkills: user.technicalSkills ?? [],
        softSkills: user.softSkills ?? [],
        languages: user.languages ?? [],
        certifications: user.certifications ?? [],
        tools: user.tools ?? [],
      },
    });
  } catch (error) {
    console.error('GET /api/users/[userId] error:', error);
    console.error('Error details:', error.message);
    return NextResponse.json(
      { success: false, error: `Failed to load profile: ${error.message}` },
      { status: 500 },
    );
  }
}

// Update user profile
export async function PUT(request, { params }) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const db = await getDb();
    const usersCol = db.collection('users');

    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    const now = new Date();

    const updateData = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? '',
      location: body.location ?? '',
      title: body.title ?? '',
      bio: body.bio ?? '',
      willingToMoveToUS: body.willingToMoveToUS ?? null,
      hasVisa: body.hasVisa ?? null,
      needsVisaSponsorship: body.needsVisaSponsorship ?? null,
      yearsOfExperience: body.yearsOfExperience ?? '',
      preferredLocations: body.preferredLocations ?? [],
      salaryExpectation: body.salaryExpectation ?? '',
      resumeUrl: body.resumeUrl ?? '',
      technicalSkills: body.technicalSkills ?? [],
      softSkills: body.softSkills ?? [],
      languages: body.languages ?? [],
      certifications: body.certifications ?? [],
      tools: body.tools ?? [],
      profileCompleted: true,
      updatedAt: now,
    };

    await usersCol.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData },
    );

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        ...updateData,
      },
    });
  } catch (error) {
    console.error('PUT /api/users/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save profile' },
      { status: 500 },
    );
  }
}


