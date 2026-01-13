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
import prisma from '@/lib/prisma';

export async function GET(_request, { params }) {
  try {
    const { userId } = await params;

    // 1. Fetch from Prisma (job_application_tracking) - This is the "Original Data"
    const prismaApplications = await prisma.job_application_tracking.findMany({
      where: {
        cand_id: parseInt(userId, 10)
      },
      include: {
        parsed_requirements: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const prismaDataMapped = prismaApplications.map((app) => ({
      id: `pg-${app.application_id}`,
      jobId: app.requirement_id,
      applicantId: app.cand_id.toString(),
      status: app.application_status,
      appliedDate: app.applied_at || app.created_at,
      source: app.applied_via_agent ? 'agent' : 'manual',
      coverLetter: app.cover_letter ?? '',
      job: app.parsed_requirements ? {
        id: app.parsed_requirements.requirement_id,
        title: app.parsed_requirements.client_job_title,
        company: app.parsed_requirements.client_name,
        companyLogo: null, // PostgreSQL schema doesn't seem to have logos yet
        location: app.parsed_requirements.address,
        employmentType: app.parsed_requirements.requirement_duration,
        salary: app.parsed_requirements.min_payrate ? app.parsed_requirements.min_payrate.toString() : null,
      } : null,
      notes: app.application_notes ? [{ text: app.application_notes, date: app.created_at }] : [],
    }));

    // TODO: remove after prod
    // 2. Fetch from MongoDB - This is the "Mock Data"
    const db = await getDb();
    const appsCol = db.collection('applications');
    const jobsCol = db.collection('jobs');

    const userApplications = await appsCol
      .find({ userId })
      .sort({ appliedDate: -1 })
      .toArray();

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
          appliedDate: app.applied_date,
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
      data: [...prismaDataMapped, ...enrichedApplications],
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

