import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { jobId, applicantId, coverLetter, status } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validate input
    if (!jobId || !applicantId) {
      return NextResponse.json(
        { success: false, error: 'Job ID and Applicant ID are required' },
        { status: 400 },
      );
    }

    const now = new Date();

    // 1. Persist in MongoDB (as primary or backup tracker)
    const db = await getDb();
    const appsCol = db.collection('applications');
    const mongoResult = await appsCol.insertOne({
      userId: applicantId,
      jobId: jobId.toString(),
      coverLetter: coverLetter ?? '',
      status: status || 'pending',
      source: 'manual',
      appliedDate: now,
    });

    // 2. Persist in PostgreSQL (if IDs are compatible)
    // We check if the applicantId can be parsed as Int (candidate_id)
    // and if the requirement exists in PG
    const candIdInt = parseInt(applicantId);
    if (!isNaN(candIdInt)) {
      try {
        await prisma.job_application_tracking.create({
          data: {
            cand_id: candIdInt,
            requirement_id: jobId.toString(),
            application_status: status === 'APPLIED' ? 'APPLIED' : 'SUBMITTED',
            applied_at: now,
            cover_letter: coverLetter ?? '',
            applied_via_agent: false
          }
        });
        console.log(`[API] Synced application to PostgreSQL for candidate ${candIdInt}`);
      } catch (pgError) {
        console.warn('[API] Could not sync to PostgreSQL (expected if requirement/candidate not in PG):', pgError.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: mongoResult.insertedId.toString(),
        jobId,
        applicantId,
        status: status || 'pending',
        appliedDate: now.toISOString(),
      },
    });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 },
    );
  }
}

