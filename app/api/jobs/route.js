import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const experienceLevel = searchParams.get('experienceLevel');
    const remote = searchParams.get('remote');
    const category = searchParams.get('category');
    const employmentType = searchParams.get('employmentType');
    const salaryMin = searchParams.get('salaryMin');
    const visaSponsorship = searchParams.get('visaSponsorship');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    const db = await getDb();
    const jobsCollection = db.collection('jobs');

    // Build query
    const query = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    if (remote === 'remote') {
      query.isRemote = true;
    } else if (remote === 'hybrid') {
      query.isHybrid = true;
    } else if (remote === 'onsite') {
      query.isRemote = false;
      query.isHybrid = false;
    }

    if (category) {
      query.category = category;
    }

    if (employmentType) {
      query.employmentType = employmentType;
    }

    if (salaryMin) {
      query['salary.min'] = { $gte: parseInt(salaryMin) };
    }

    if (visaSponsorship === 'true') {
      query.visaSponsorship = true;
    } else if (visaSponsorship === 'false') {
      query.visaSponsorship = false;
    }

    // Fetch jobs with only necessary fields for list view
    const jobs = await jobsCollection
      .find(query)
      .project({
        title: 1,
        company: 1,
        companyLogo: 1,
        location: 1,
        locationType: 1,
        employmentType: 1,
        experienceLevel: 1,
        summary: 1,
        skills: 1,
        salary: 1,
        isRemote: 1,
        isHybrid: 1,
        visaSponsorship: 1,
        postedDate: 1,
        applicants: 1,
        category: 1,
        industry: 1,
      })
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const total = await jobsCollection.countDocuments(query);

    return NextResponse.json({
      success: true,
      jobs: jobs.map(job => ({
        ...job,
        _id: job._id.toString(),
      })),
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 },
    );
  }
}

