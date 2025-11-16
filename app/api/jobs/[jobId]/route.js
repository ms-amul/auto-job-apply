import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export async function GET(_request, { params }) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 },
      );
    }

    const db = await getDb();
    const jobsCollection = db.collection('jobs');

    // Validate ObjectId format
    if (!ObjectId.isValid(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID format' },
        { status: 400 },
      );
    }

    // Fetch complete job details
    const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 },
      );
    }

    // Increment view count
    await jobsCollection.updateOne(
      { _id: new ObjectId(jobId) },
      { $inc: { views: 1 } },
    );

    return NextResponse.json({
      success: true,
      job: {
        ...job,
        _id: job._id.toString(),
      },
    });
  } catch (error) {
    console.error('GET /api/jobs/[jobId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job details' },
      { status: 500 },
    );
  }
}

