import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * Signup API Route
 * 
 * 1. Accepts email and password only
 * 2. Calls candidate-sync API to sync user from master DB (agent API handles all fields)
 * 3. Hashes the password and updates only the password field in auto_apply_cand table
 * 4. Returns candidate_id on success
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 },
      );
    }

    // Note: We don't check if user exists here because the agent API
    // will handle creating/updating the user in auto_apply_cand table

    // Get agent API base URL from environment
    const agentApiBaseUrl = process.env.AGENT_API_BASE_URL;
    if (!agentApiBaseUrl) {
      console.error('AGENT_API_BASE_URL environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 },
      );
    }

    // Call candidate-sync API
    let syncResponse;
    try {
      const syncUrl = `${agentApiBaseUrl}/candidate-sync`;
      const syncRes = await fetch(syncUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!syncRes.ok) {
        const errorData = await syncRes.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || 'Failed to sync candidate from master database',
          },
          { status: syncRes.status },
        );
      }

      syncResponse = await syncRes.json();
    } catch (error) {
      console.error('Error calling candidate-sync API:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to connect to candidate sync service' },
        { status: 503 },
      );
    }

    // Check if sync was successful
    if (!syncResponse.success || !syncResponse.data) {
      return NextResponse.json(
        {
          success: false,
          error: syncResponse.message || 'Candidate sync failed',
        },
        { status: 400 },
      );
    }

    const candidateData = syncResponse.data;

    // Validate that candidate_id is present
    if (!candidateData.candidate_id) {
      console.error('Candidate sync response missing candidate_id:', candidateData);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid response from candidate sync service',
        },
        { status: 500 },
      );
    }

    const candidateId = candidateData.candidate_id;

    // Hash the password before storing
    const saltRounds = 10;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return NextResponse.json(
        { success: false, error: 'Failed to process password' },
        { status: 500 },
      );
    }

    // Update only the password field in auto_apply_cand table
    // The agent API has already created/updated all other fields
    try {
      const user = await prisma.auto_apply_cand.update({
        where: { cand_id: candidateId },
        data: {
          password: hashedPassword,
          updated_at: new Date(),
        },
        select: {
          cand_id: true,
          email: true,
          first_name: true,
          last_name: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.cand_id.toString(),
          candidate_id: user.cand_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
    } catch (dbError) {
      console.error('Database error during password update:', dbError);
      
      // If user doesn't exist (P2025), the agent API might not have created it yet
      if (dbError.code === 'P2025') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'User record not found. Please try again or contact support.' 
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: false, error: 'Failed to update account password' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sign up' },
      { status: 500 },
    );
  }
}


