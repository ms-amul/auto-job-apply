/**
 * Create Application API Route
 *
 * - Persists a manual application in MongoDB
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { jobId, applicantId, coverLetter } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validate input
    if (!jobId || !applicantId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job ID and Applicant ID are required',
        },
        { status: 400 },
      );
    }

    const db = await getDb();
    const appsCol = db.collection('applications');

    const now = new Date();

    const result = await appsCol.insertOne({
      userId: applicantId,
      jobId,
      coverLetter: coverLetter ?? '',
      status: 'pending',
      source: 'manual',
      appliedDate: now,
    });

    const application = {
      id: result.insertedId.toString(),
      jobId,
      applicantId,
      coverLetter: coverLetter ?? '',
      status: 'pending',
      appliedDate: now.toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit application',
      },
      { status: 500 },
    );
  }
}

