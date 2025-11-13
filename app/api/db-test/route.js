/**
 * Database Connection Test API Route
 * 
 * Test your PostgreSQL connection by visiting:
 * http://localhost:3000/api/db-test
 */

import { query, testConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic connection
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          details: connectionTest.error 
        },
        { status: 500 }
      );
    }

    // Test a simple query to list tables in public schema
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    return NextResponse.json({
      status: 'connected',
      message: 'PostgreSQL connection successful!',
      database: {
        timestamp: connectionTest.timestamp,
        version: connectionTest.version,
      },
      tables: tablesResult.rows.map(row => row.table_name),
      tableCount: tablesResult.rowCount,
    });

  } catch (error) {
    console.error('Database test failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Database query failed', 
        details: error.message,
        hint: 'Check your DATABASE_URL in .env.local'
      },
      { status: 500 }
    );
  }
}


