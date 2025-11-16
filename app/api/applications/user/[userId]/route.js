/**
 * Get User Applications API Route
 *
 * - Reads applications from MongoDB
 * - Enriches with job details from jobs collection
 * 
 * NOTE: Auto-apply logic moved to /api/agent/[userId]/apply
 * This endpoint now ONLY fetches and returns applications
 */

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export async function GET(_request, { params }) {
  try {
    const { userId } = await params;
    const db = await getDb();

    const appsCol = db.collection('applications');
    const jobsCol = db.collection('jobs');

    // Fetch all applications for this user
    const userApplications = await appsCol
      .find({ userId })
      .sort({ appliedDate: -1 })
      .toArray();

    // Enrich with job details from jobs collection
    const enrichedApplications = await Promise.all(
      userApplications.map(async (app) => {
        let job = null;
        
        try {
          if (ObjectId.isValid(app.jobId)) {
            job = await jobsCol.findOne({ _id: new ObjectId(app.jobId) });
          }
        } catch (err) {
          console.error('Error fetching job:', err);
        }

        return {
          id: app._id.toString(),
          jobId: app.jobId,
          applicantId: app.userId,
          status: app.status,
          appliedDate: app.appliedDate,
          source: app.source ?? 'manual',
          coverLetter: app.coverLetter ?? '',
          job: job ? {
            id: job._id.toString(),
            title: job.title,
            company: job.company,
            companyLogo: job.companyLogo,
            location: job.location,
            employmentType: job.employmentType,
            salary: job.salary,
          } : null,
          notes: app.notes ?? [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: enrichedApplications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch applications',
      },
      { status: 500 },
    );
  }
}

