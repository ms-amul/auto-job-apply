/**
 * Get All Jobs API Route
 * 
 * TODO: Replace with Prisma database query
 * TODO: Add pagination
 * TODO: Add filtering and sorting
 * TODO: Add authentication check
 */

import { NextResponse } from 'next/server';
import jobs from '@/data/jobs.json';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const location = searchParams.get('location');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredJobs = jobs.jobs;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (type && type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    // Apply location filter
    if (location && location !== 'all') {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // TODO: In production, use Prisma:
    // const jobs = await prisma.job.findMany({
    //   where: {
    //     OR: [
    //       { title: { contains: search, mode: 'insensitive' } },
    //       { company: { contains: search, mode: 'insensitive' } },
    //     ],
    //     type: type !== 'all' ? type : undefined,
    //   },
    //   orderBy: { postedDate: 'desc' },
    //   take: 20,
    // });

    return NextResponse.json({
      success: true,
      data: filteredJobs,
      total: filteredJobs.length,
    });

  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch jobs' 
      },
      { status: 500 }
    );
  }
}

