/**
 * Jobs API Route Example
 * 
 * Demonstrates CRUD operations using standard PostgreSQL
 * 
 * Endpoints:
 * - GET /api/jobs - Get all jobs (with optional search)
 * - POST /api/jobs - Create a new job
 */

import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/jobs - Fetch all jobs or search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let result;
    let countResult;

    if (search) {
      // Search jobs
      result = await query(
        `SELECT * FROM jobs 
         WHERE title ILIKE $1 
            OR company ILIKE $1 
            OR description ILIKE $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [`%${search}%`, limit, offset]
      );

      countResult = await query(
        `SELECT COUNT(*) FROM jobs 
         WHERE title ILIKE $1 
            OR company ILIKE $1 
            OR description ILIKE $1`,
        [`%${search}%`]
      );
    } else {
      // Get all jobs
      result = await query(
        'SELECT * FROM jobs ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      countResult = await query('SELECT COUNT(*) FROM jobs');
    }

    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch jobs',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, company, description, location, salary } = body;

    // Validation
    if (!title || !company) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          required: ['title', 'company']
        },
        { status: 400 }
      );
    }

    // Insert job
    const result = await query(
      `INSERT INTO jobs (title, company, description, location, salary, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
       RETURNING *`,
      [title, company, description, location, salary]
    );

    return NextResponse.json({
      success: true,
      message: 'Job created successfully',
      data: result.rows[0],
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create job',
        details: error.message 
      },
      { status: 500 }
    );
  }
}


