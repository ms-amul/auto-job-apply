/**
 * Sign In API Route
 *
 * - First checks MongoDB for real users (from signup)
 * - Falls back to mock users.json for demo accounts
 * - Returns the user with MongoDB _id
 */

import { NextResponse } from 'next/server';
import users from '@/data/users.json';
import { getDb } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 },
      );
    }

    const db = await getDb();
    const mongoUsers = db.collection('users');
    const now = new Date();

    // First, check if user exists in MongoDB (real signup)
    const mongoUser = await mongoUsers.findOne({ email });

    if (mongoUser) {
      // Real user from signup - validate password
      // Note: In production, use bcrypt to compare hashed passwords
      // For demo, we're storing plain text (NOT SECURE - demo only!)
      if (mongoUser.password && mongoUser.password === password) {
        // Update last login
        await mongoUsers.updateOne(
          { _id: mongoUser._id },
          { $set: { updatedAt: now } },
        );

        return NextResponse.json({
          success: true,
          message: 'Sign in successful',
          user: {
            id: mongoUser._id.toString(),
            name: mongoUser.name,
            email: mongoUser.email,
            role: mongoUser.role,
            profileCompleted: mongoUser.profileCompleted ?? false,
          },
        });
      }
      
      // If password doesn't match
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 },
      );
    }

    // Fall back to mock users for demo accounts
    const mockUser = users.users.find((u) => u.email === email);

    if (!mockUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 },
      );
    }

    // Create MongoDB user from mock data (first-time demo login)
    const insertResult = await mongoUsers.insertOne({
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      phone: '',
      location: '',
      title: '',
      bio: '',
      willingToMoveToUS: null,
      hasVisa: null,
      needsVisaSponsorship: null,
      yearsOfExperience: '',
      preferredLocations: [],
      salaryExpectation: '',
      resumeUrl: '',
      createdAt: now,
      updatedAt: now,
      profileCompleted: false,
    });

    return NextResponse.json({
      success: true,
      message: 'Sign in successful',
      user: {
        id: insertResult.insertedId.toString(),
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        profileCompleted: false,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred during sign in',
      },
      { status: 500 },
    );
  }
}

