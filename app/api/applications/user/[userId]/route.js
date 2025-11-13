/**
 * Get User Applications API Route
 * 
 * TODO: Replace with Prisma database query
 * TODO: Add authentication check
 * TODO: Verify user can only see their own applications
 */

import { NextResponse } from 'next/server';
import applications from '@/data/applications.json';
import jobs from '@/data/jobs.json';

export async function GET(request, { params }) {
  try {
    const { userId } = await params;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get user's applications
    const userApplications = applications.applications.filter(
      app => app.applicantId === userId
    );

    // Enrich with job details
    const enrichedApplications = userApplications.map(app => {
      const job = jobs.jobs.find(j => j.id === app.jobId);
      return {
        ...app,
        job: job || null,
      };
    });

    // TODO: In production, use Prisma with joins:
    // const applications = await prisma.application.findMany({
    //   where: { applicantId: userId },
    //   include: {
    //     job: {
    //       include: {
    //         company: true,
    //       }
    //     }
    //   },
    //   orderBy: { appliedDate: 'desc' },
    // });

    return NextResponse.json({
      success: true,
      data: enrichedApplications,
    });

  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch applications' 
      },
      { status: 500 }
    );
  }
}

