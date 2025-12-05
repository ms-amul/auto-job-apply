import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// Get agent configuration for user
export async function GET(_request, { params }) {
  try {
    const { userId } = await params;
    const db = await getDb();
    const agents = db.collection('agents');

    const config = await agents.findOne({ userId });

    return NextResponse.json({
      success: true,
      agent: config ?? null,
    });
  } catch (error) {
    console.error('GET /api/agent/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load agent config' },
      { status: 500 },
    );
  }
}

// Save / update agent configuration
export async function PUT(request, { params }) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const db = await getDb();
    const agents = db.collection('agents');

    const now = new Date();

    const agentDoc = {
      userId,
      status: body.status ?? 'paused', // 'paused' | 'running'
      dailyLimit: body.dailyLimit ?? 10, // Default 10 applications per day
      keywords: body.keywords ?? [],
      emailNotifications: body.emailNotifications !== undefined ? body.emailNotifications : true,
      smsNotifications: body.smsNotifications ?? false,
      applyRecentFirst: body.applyRecentFirst !== undefined ? body.applyRecentFirst : true,
      lastApplicationTime: body.lastApplicationTime ?? null, // MOCK: Track last application timestamp
      nextApplicationTime: body.nextApplicationTime ?? null, // MOCK: Track when next application should happen
      updatedAt: now,
    };

    await agents.updateOne(
      { userId },
      { $set: agentDoc, $setOnInsert: { createdAt: now } },
      { upsert: true },
    );

    return NextResponse.json({
      success: true,
      agent: agentDoc,
    });
  } catch (error) {
    console.error('PUT /api/agent/[userId] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save agent config' },
      { status: 500 },
    );
  }
}


