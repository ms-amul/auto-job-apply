
import { NextResponse } from 'next/server';

const AGENT_API_BASE_URL = process.env.AGENT_API_BASE_URL;

export async function POST(request) {
    try {
        const body = await request.json();
        const { cand_id, requirement_id } = body;

        if (!cand_id || !requirement_id) {
            return NextResponse.json(
                { success: false, message: 'Missing candidate ID or requirement ID' },
                { status: 400 }
            );
        }

        // If no AGENT_API_BASE_URL configured, use mock response
        if (!AGENT_API_BASE_URL) {
            console.log('[API] AGENT_API_BASE_URL not set, using mock success response');
            await new Promise(resolve => setTimeout(resolve, 800));
            return NextResponse.json({
                success: true,
                message: 'Application submitted successfully (Mock)',
                cand_id,
                requirement_id,
                application_id: Math.floor(Math.random() * 100000)
            });
        }

        console.log(`[API] Manually applying candidate ${cand_id} to requirement ${requirement_id}`);

        const res = await fetch(`${AGENT_API_BASE_URL}/apply-job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cand_id, requirement_id }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`[API] Agent API error: ${res.status}`, errorData);
            return NextResponse.json(
                { success: false, message: errorData.message || 'Failed to submit application via Agent API' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('[API] Error in manual apply proxy:', error);

        // Check for connection/timeout errors
        const isConnectionError = error.code === 'ECONNREFUSED' ||
            error.name === 'TypeError' && error.message.includes('fetch');

        return NextResponse.json(
            {
                success: false,
                message: isConnectionError
                    ? 'The application service is temporarily unavailable. Please try again in a moment.'
                    : 'Internal server error while processing application'
            },
            { status: isConnectionError ? 503 : 500 }
        );
    }
}
