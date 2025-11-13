/**
 * Jobs API Route using Prisma
 * 
 * Demonstrates CRUD operations with Prisma ORM
 * 
 * Endpoints:
 * - GET /api/prisma-jobs - Get all jobs (with optional search & pagination)
 * - POST /api/prisma-jobs - Create a new job
 */

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/prisma-jobs - Fetch jobs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { company: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Execute queries in parallel
    const [jobs, total] = await prisma.$transaction([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    // Check if it's a schema/table issue
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database schema not synced',
          hint: 'Run: npx prisma db pull (to sync from Supabase) or npx prisma db push (to create tables)',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch jobs',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/prisma-jobs - Create a new job
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, company, description, location, salary, url, userId } = body;

    // Validation
    if (!title || !company) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          required: ['title', 'company'],
        },
        { status: 400 }
      );
    }

    // Create job using Prisma
    const job = await prisma.job.create({
      data: {
        title,
        company,
        description,
        location,
        salary,
        url,
        userId,
      },
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
      message: 'Job created successfully',
      data: job,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);

    // Handle Prisma-specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Duplicate entry',
          details: 'A job with these details already exists',
        },
        { status: 409 }
      );
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid reference',
          details: 'The referenced user does not exist',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create job',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

