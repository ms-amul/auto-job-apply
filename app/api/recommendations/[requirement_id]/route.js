
import { NextResponse } from 'next/server';
import mockData from '@/data/mock-recommendations.json';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL;

export async function GET(request, { params }) {
    const { requirement_id } = await params;
    const { searchParams } = new URL(request.url);
    const source_id = searchParams.get('source_id');
    const use_cache = searchParams.get('use_cache') ?? 'true';

    // If no AGENT_API_BASE_URL configured, use mock data
    if (!AGENT_API_BASE_URL) {
        console.log(`[API] AGENT_API_BASE_URL not set, using mock data for requirement: ${requirement_id}`);
        await new Promise(resolve => setTimeout(resolve, 300));

        const jobDetails = mockData.job_details[requirement_id];
        if (jobDetails) {
            return NextResponse.json(jobDetails);
        } else {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
    }

    try {
        console.log(`[API] Fetching details for requirement: ${requirement_id}, Source: ${source_id}`);

        const res = await fetch(
            `${AGENT_API_BASE_URL}/api/recommendations/${requirement_id}?source_id=${source_id}&use_cache=${use_cache}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            console.error(`[API] Agent API error: ${res.status} ${res.statusText}`);
            // Try fallback to mock data
            const jobDetails = mockData.job_details[requirement_id];
            if (jobDetails) {
                return NextResponse.json(jobDetails);
            }
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('[API] Error fetching job details:', error);
        // Fallback to mock data on error
        const jobDetails = mockData.job_details[requirement_id];
        if (jobDetails) {
            return NextResponse.json(jobDetails);
        }
        return NextResponse.json({ error: 'Internal API Error' }, { status: 500 });
    }
}
