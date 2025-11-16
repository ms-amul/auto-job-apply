/**
 * Agent Stats API Route
 * 
 * Calculates real-time statistics for the AI agent
 * - Applications today, this week, total
 * - Success rate based on application statuses
 * 
 * MOCK IMPLEMENTATION - Ready for production
 * Future: Add more metrics like response rate, interview rate, etc.
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(_request, { params }) {
  try {
    const { userId } = await params;
    const db = await getDb();
    const appsCol = db.collection('applications');

    // Get date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);

    // Fetch applications with agent source
    const [todayCount, weekCount, totalCount, allApps] = await Promise.all([
      appsCol.countDocuments({
        userId,
        source: 'agent',
        appliedDate: { $gte: todayStart },
      }),
      appsCol.countDocuments({
        userId,
        source: 'agent',
        appliedDate: { $gte: weekStart },
      }),
      appsCol.countDocuments({
        userId,
        source: 'agent',
      }),
      appsCol.find({ userId, source: 'agent' }).toArray(),
    ]);

    // Calculate success rate (accepted / total * 100)
    const acceptedCount = allApps.filter(app => app.status === 'accepted').length;
    const successRate = totalCount > 0 
      ? `${Math.round((acceptedCount / totalCount) * 100)}%` 
      : '0%';

    return NextResponse.json({
      success: true,
      stats: {
        today: todayCount,
        thisWeek: weekCount,
        total: totalCount,
        successRate,
        accepted: acceptedCount,
        pending: allApps.filter(app => app.status === 'pending').length,
        interview: allApps.filter(app => app.status === 'interview').length,
        rejected: allApps.filter(app => app.status === 'rejected').length,
      },
    });
  } catch (error) {
    console.error('GET /api/agent/[userId]/stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 },
    );
  }
}

