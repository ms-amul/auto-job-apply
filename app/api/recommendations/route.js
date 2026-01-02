
import { NextResponse } from 'next/server';
import mockData from '@/data/mock-recommendations.json';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL || 'http://localhost:8000';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const candidate_id = searchParams.get('candidate_id');
    const use_cache = searchParams.get('use_cache') ?? 'true';

    try {
        // Attempt to call the external Agent API
        // In a real scenario, you would uncomment this:
        /*
        const res = await fetch(`${AGENT_API_BASE_URL}/api/recommendations?candidate_id=${candidate_id}&use_cache=${use_cache}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 60 } // Optional caching
        });
    
        if (!res.ok) {
           throw new Error(`External API error: ${res.statusText}`);
        }
        const data = await res.json();
        return NextResponse.json(data);
        */

        // For now, return mock data
        console.log(`[API] Fetching recommendations for candidate: ${candidate_id || 'mock'}, Using cache: ${use_cache}`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json(mockData.recommendations_list);

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Fallback to mock data or error response
        return NextResponse.json(mockData.recommendations_list, { status: 200 }); // Graceful fallback
    }
}
