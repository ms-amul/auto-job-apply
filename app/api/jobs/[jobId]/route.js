import { NextResponse } from 'next/server';
import mockData from '@/data/all-jobs.json';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL;

export async function GET(request, { params }) {
  const { jobId } = await params;
  const { searchParams } = new URL(request.url);
  const source_id = searchParams.get('source_id') || '1';
  const use_cache = searchParams.get('use_cache') ?? 'true';

  // If no AGENT_API_BASE_URL configured, use mock data
  if (!AGENT_API_BASE_URL) {
    const jobDetails = mockData.job_details[jobId];
    if (jobDetails) {
      return NextResponse.json(jobDetails);
    } else {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
  }

  try {
    const res = await fetch(
      `${AGENT_API_BASE_URL}/api/recommendations/${jobId}?source_id=${source_id}&use_cache=${use_cache}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`[API] Agent API error: ${res.status}`);
      const jobDetails = mockData.job_details[jobId];
      if (jobDetails) return NextResponse.json(jobDetails);
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('[API] Error fetching job details:', error);
    const jobDetails = mockData.job_details[jobId];
    if (jobDetails) return NextResponse.json(jobDetails);
    return NextResponse.json({ error: 'Internal API Error' }, { status: 500 });
  }
}
