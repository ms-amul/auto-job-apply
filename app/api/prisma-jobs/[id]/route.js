/**
 * Individual Job API Route using Prisma
 * 
 * Endpoints:
 * - GET /api/prisma-jobs/[id] - Get a specific job
 * - PATCH /api/prisma-jobs/[id] - Update a job
 * - DELETE /api/prisma-jobs/[id] - Delete a job
 */

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/prisma-jobs/[id] - Get a specific job
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            appliedAt: 'desc',
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
    });

  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch job',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// PATCH /api/prisma-jobs/[id] - Update a job
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove undefined values (only update provided fields)
    const data = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.company !== undefined) data.company = body.company;
    if (body.description !== undefined) data.description = body.description;
    if (body.location !== undefined) data.location = body.location;
    if (body.salary !== undefined) data.salary = body.salary;
    if (body.url !== undefined) data.url = body.url;
    if (body.status !== undefined) data.status = body.status;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'No fields to update',
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });

  } catch (error) {
    console.error('Error updating job:', error);

    // Handle Prisma-specific errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update job',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/prisma-jobs/[id] - Delete a job
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const job = await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
      data: job,
    });

  } catch (error) {
    console.error('Error deleting job:', error);

    // Handle Prisma-specific errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Job not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete job',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

