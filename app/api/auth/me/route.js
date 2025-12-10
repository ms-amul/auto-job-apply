/**
 * Get Current User API Route
 * 
 * Uses NextAuth session to get the current authenticated user
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { getUserById } from '@/lib/auth';

export async function GET(request) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({
        success: true,
        user: null,
      });
    }

    // Get user from database using candidate_id
    const candidateId = session.user.candidate_id || parseInt(session.user.id, 10);
    const user = await getUserById(candidateId);

    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        candidate_id: user.candidate_id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get user' 
      },
      { status: 500 }
    );
  }
}

