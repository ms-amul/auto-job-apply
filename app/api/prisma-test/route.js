/**
 * Prisma Connection Test API Route
 * 
 * Test your Prisma setup by visiting:
 * http://localhost:3000/api/prisma-test
 */

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection by querying database version
    const result = await prisma.$queryRaw`SELECT version()`;
    
    // Get all table names using Prisma
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    // Test a simple query on each model (will fail if tables don't exist yet)
    let modelCounts = {};
    try {
      modelCounts = {
        users: await prisma.user.count(),
        jobs: await prisma.job.count(),
        applications: await prisma.application.count(),
      };
    } catch (error) {
      modelCounts = {
        note: 'Run "npx prisma db push" or "npx prisma db pull" to sync your schema',
        error: error.message,
      };
    }

    return NextResponse.json({
      status: 'connected',
      message: 'Prisma is working! ✅',
      database: {
        version: result[0].version,
      },
      tables: tables.map(t => t.table_name),
      tableCount: tables.length,
      modelCounts,
      tips: [
        'Run "npx prisma db pull" to generate Prisma schema from your existing Supabase tables',
        'Run "npx prisma generate" to update Prisma Client',
        'Run "npx prisma studio" to open a GUI for your database',
      ],
    });

  } catch (error) {
    console.error('Prisma test failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Prisma connection failed', 
        details: error.message,
        hint: 'Make sure DATABASE_URL is set in .env.local and run "npm install"',
      },
      { status: 500 }
    );
  }
}

