import { NextResponse } from 'next/server';

/**
 * Resume Upload API Route
 * 
 * 1. Accepts resume file and candidate_id
 * 2. Calls /resume-intake/process-resume API from agent service
 * 3. Returns success/error response
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const candidateId = formData.get('candidate_id');

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Resume file is required' },
        { status: 400 },
      );
    }

    if (!candidateId) {
      return NextResponse.json(
        { success: false, error: 'Candidate ID is required' },
        { status: 400 },
      );
    }

    // Validate candidate_id is a number
    const candId = parseInt(candidateId, 10);
    if (isNaN(candId) || candId <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const fileName = file.name || '';
    const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      return NextResponse.json(
        { success: false, error: 'Please upload a PDF, DOCX, or TXT file' },
        { status: 400 },
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 },
      );
    }

    // Get agent API base URL from environment
    const agentApiBaseUrl = process.env.AGENT_API_BASE_URL;
    if (!agentApiBaseUrl) {
      console.error('AGENT_API_BASE_URL environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 },
      );
    }

    // Prepare form data for agent API
    const agentFormData = new FormData();
    agentFormData.append('file', file);
    
    // Call resume-intake/process-resume API
    try {
      const processResumeUrl = `${agentApiBaseUrl}/resume-intake/process-resume?candidate_id=${candId}`;
      const processRes = await fetch(processResumeUrl, {
        method: 'POST',
        body: agentFormData,
      });

      if (!processRes.ok) {
        const errorData = await processRes.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || errorData.detail || 'Failed to process resume',
          },
          { status: processRes.status },
        );
      }

      const processResult = await processRes.json();

      return NextResponse.json({
        success: true,
        message: 'Resume processed successfully',
        data: processResult,
      });
    } catch (error) {
      console.error('Error calling process-resume API:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to connect to resume processing service' },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload resume' },
      { status: 500 },
    );
  }
}

