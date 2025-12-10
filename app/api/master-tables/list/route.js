/**
 * Master Tables List API
 * Returns all active options from master tables for dropdowns
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    let data = [];

    switch (type) {
      case 'gender':
        data = await prisma.gender_master.findMany({
          where: { is_active: true },
          select: {
            gender_id: true,
            gender_text: true,
          },
          orderBy: { gender_text: 'asc' },
        });
        break;
      
      case 'ethnicity':
        data = await prisma.ethnicity_master.findMany({
          where: { is_active: true },
          select: {
            ethnicity_id: true,
            ethnicity_text: true,
          },
          orderBy: { ethnicity_text: 'asc' },
        });
        break;
      
      case 'race':
        data = await prisma.race_master.findMany({
          where: { is_active: true },
          select: {
            race_id: true,
            race_text: true,
          },
          orderBy: { race_text: 'asc' },
        });
        break;
      
      case 'disability':
        data = await prisma.disability_master.findMany({
          where: { is_active: true },
          select: {
            disability_id: true,
            disability_text: true,
          },
          orderBy: { disability_text: 'asc' },
        });
        break;
      
      case 'veteran':
        data = await prisma.veteran_disclosure_master.findMany({
          where: { is_active: true },
          select: {
            veteran_disclosure_id: true,
            veteran_disclosure_text: true,
          },
          orderBy: { veteran_disclosure_text: 'asc' },
        });
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('GET /api/master-tables/list error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch master table data' },
      { status: 500 }
    );
  }
}

