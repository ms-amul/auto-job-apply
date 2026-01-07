
import { NextResponse } from 'next/server';
import mockData from '@/data/mock-recommendations.json';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const candidate_id = searchParams.get('candidate_id');
  const use_cache = searchParams.get('use_cache') ?? 'true';

  // If no AGENT_API_BASE_URL configured, use mock data
  if (!AGENT_API_BASE_URL) {
    console.log('[API] AGENT_API_BASE_URL not set, using mock data');
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json(mockData.recommendations_list);
  }

  try {
    console.log(`[API] Fetching recommendations for candidate: ${candidate_id}`);

    const res = await fetch(
      `${AGENT_API_BASE_URL}/api/recommendations?candidate_id=${candidate_id}&use_cache=${use_cache}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`[API] Agent API error: ${res.status} ${res.statusText}`);
      // Fallback to mock data on error
      return NextResponse.json(mockData.recommendations_list);
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('[API] Error fetching recommendations:', error);
    // Fallback to mock data on error
    return NextResponse.json(mockData.recommendations_list);
  }
}
