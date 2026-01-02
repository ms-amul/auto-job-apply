
import { NextResponse } from 'next/server';
import mockData from '@/data/mock-recommendations.json';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL || 'http://localhost:8000';

export async function GET(request, { params }) {
    const { requirement_id } = await params;
    const { searchParams } = new URL(request.url);
    const source_id = searchParams.get('source_id');
    const use_cache = searchParams.get('use_cache') ?? 'true';

    try {
        // Attempt to call the external Agent API
        /*
        const res = await fetch(`${AGENT_API_BASE_URL}/api/recommendations/${requirement_id}?source_id=${source_id}&use_cache=${use_cache}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) {
            throw new Error(`External API error: ${res.statusText}`);
        }
        const data = await res.json();
        return NextResponse.json(data);
        */

        // Mock response
        console.log(`[API] Fetching details for requirement: ${requirement_id}, Source: ${source_id}`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const jobDetails = mockData.job_details[requirement_id];

        if (jobDetails) {
            return NextResponse.json(jobDetails);
        } else {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error fetching job details:', error);
        return NextResponse.json({ error: 'Internal API Error' }, { status: 500 });
    }
}
