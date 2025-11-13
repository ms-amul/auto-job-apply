/**
 * Individual Job API Route Example
 * 
 * Endpoints:
 * - GET /api/jobs/[id] - Get a specific job
 * - PUT /api/jobs/[id] - Update a job
 * - DELETE /api/jobs/[id] - Delete a job
 */

import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/jobs/[id] - Get a specific job
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch job',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update a job
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, company, description, location, salary } = body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (company !== undefined) {
      updates.push(`company = $${paramCount++}`);
      values.push(company);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (location !== undefined) {
      updates.push(`location = $${paramCount++}`);
      values.push(location);
    }
    if (salary !== undefined) {
      updates.push(`salary = $${paramCount++}`);
      values.push(salary);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'No fields to update' 
        },
        { status: 400 }
      );
    }

    // Add updated_at
    updates.push('updated_at = NOW()');

    // Add id to values
    values.push(id);

    const result = await query(
      `UPDATE jobs 
       SET ${updates.join(', ')} 
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job updated successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update job',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const result = await query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete job',
        details: error.message 
      },
      { status: 500 }
    );
  }
}


