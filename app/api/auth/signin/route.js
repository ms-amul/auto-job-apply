/**
 * Sign In API Route
 * 
 * Hardcoded users for testing:
 * - rajgopal@jobvita.com (recruiter)
 * - rajgopal@gmail.com (applicant)
 * 
 * TODO: Replace with actual database authentication
 * TODO: Add password hashing with bcrypt
 * TODO: Implement JWT tokens or session management
 * TODO: Add rate limiting for security
 */

import { NextResponse } from 'next/server';
import users from '@/data/users.json';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Find user in mock data
    const user = users.users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

    // TODO: In production, verify password with bcrypt
    // For now, accept any password for testing
    // const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

    // Return user data (excluding sensitive info)
    const { hashedPassword, ...userData } = user;

    return NextResponse.json({
      success: true,
      message: 'Sign in successful',
      user: userData,
    });

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred during sign in' 
      },
      { status: 500 }
    );
  }
}

