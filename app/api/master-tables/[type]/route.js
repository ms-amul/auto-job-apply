/**
 * Master Tables Lookup API
 * Returns ID for a given text value from master tables
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const tableMap = {
  gender: { table: prisma.gender_master, textField: 'gender_text', idField: 'gender_id' },
  ethnicity: { table: prisma.ethnicity_master, textField: 'ethnicity_text', idField: 'ethnicity_id' },
  race: { table: prisma.race_master, textField: 'race_text', idField: 'race_id' },
};

export async function GET(request, { params }) {
  try {
    const { type } = await params;
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text parameter is required' },
        { status: 400 }
      );
    }

    const tableConfig = tableMap[type];
    if (!tableConfig) {
      return NextResponse.json(
        { success: false, error: 'Invalid table type' },
        { status: 400 }
      );
    }

    const record = await tableConfig.table.findFirst({
      where: {
        [tableConfig.textField]: {
          equals: text,
          mode: 'insensitive',
        },
      },
      select: {
        [tableConfig.idField]: true,
      },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id: record[tableConfig.idField],
      text: text,
    });
  } catch (error) {
    console.error(`GET /api/master-tables/[type] error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to lookup record' },
      { status: 500 }
    );
  }
}

