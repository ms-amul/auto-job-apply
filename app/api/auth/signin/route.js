/**
 * Sign In API Route
 * 
 * This route uses NextAuth for authentication.
 * For direct API usage, you can call this endpoint, but it's recommended
 * to use NextAuth's signIn function from the client side.
 */

import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

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

    // Verify credentials using Prisma and bcrypt
    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 },
      );
    }

    // Return user data (email as requested)
    return NextResponse.json({
      success: true,
      message: 'Sign in successful',
      user: {
        id: user.id,
        candidate_id: user.candidate_id,
        email: user.email,
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

