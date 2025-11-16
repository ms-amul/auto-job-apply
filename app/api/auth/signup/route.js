import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// Basic signup + profile creation (applicant-focused for now)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password, // not hashed in this demo
      role = 'applicant',
      phone,
      location,
      title,
      bio,
      willingToMoveToUS,
      hasVisa,
      needsVisaSponsorship,
      yearsOfExperience,
      preferredLocations,
      salaryExpectation,
      resumeUrl,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 },
      );
    }

    const db = await getDb();
    const usersCol = db.collection('users');

    const existing = await usersCol.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 },
      );
    }

    const now = new Date();

    const userResult = await usersCol.insertOne({
      name,
      email,
      password, // Store password (in production, hash with bcrypt!)
      role,
      phone: phone ?? '',
      location: location ?? '',
      title: title ?? '',
      bio: bio ?? '',
      willingToMoveToUS: willingToMoveToUS ?? null,
      hasVisa: hasVisa ?? null,
      needsVisaSponsorship: needsVisaSponsorship ?? null,
      yearsOfExperience: yearsOfExperience ?? '',
      preferredLocations: preferredLocations ?? [],
      salaryExpectation: salaryExpectation ?? '',
      resumeUrl: resumeUrl ?? '',
      profileCompleted: false, // Set to false initially, user needs to complete profile
      createdAt: now,
      updatedAt: now,
    });

    const userId = userResult.insertedId.toString();

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email,
        role,
        profileCompleted: false,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sign up' },
      { status: 500 },
    );
  }
}


