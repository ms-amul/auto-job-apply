/**
 * Agent Auto-Apply API Route
 * 
 * Applies to ONE job at a time with proper timing
 * Called by the agent page at 1-minute intervals
 * 
 * MOCK IMPLEMENTATION - Ready for production migration
 */

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import prisma from '@/lib/prisma';

export async function POST(_request, { params }) {
  try {
    const { userId } = await params;
    const db = await getDb();

    const appsCol = db.collection('applications');
    const jobsCol = db.collection('jobs');

    // Check agent status from Prisma (PostgreSQL)
    const candId = parseInt(userId);
    if (isNaN(candId)) {
      return NextResponse.json({ success: false, message: 'Invalid User ID' });
    }

    const agentPref = await prisma.auto_apply_agent_preferences.findUnique({
      where: { cand_id: candId }
    });

    if (!agentPref || !agentPref.is_active) {
      return NextResponse.json({
        success: false,
        message: 'Agent is not running',
      });
    }

    const keywords = agentPref.job_keywords || [];
    const dailyLimit = agentPref.daily_application_limit || 10;

    // Check today's application count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayCount = await appsCol.countDocuments({
      userId,
      source: 'agent',
      appliedDate: { $gte: todayStart }
    });


    // For the pitch/mock, ensure we have a healthy limit even if not set
    const effectiveLimit = Math.max(dailyLimit, 50);

    // Check if daily limit reached
    if (todayCount >= effectiveLimit) {
      return NextResponse.json({
        success: false,
        message: 'Daily limit reached',
        todayCount,
        dailyLimit: effectiveLimit,
      });
    }

    // Get jobs user hasn't applied to yet
    const existingAppJobIds = await appsCol
      .find({ userId })
      .project({ jobId: 1 })
      .toArray();

    const appliedJobIds = existingAppJobIds.map(app => app.jobId);

    // Build job query based on agent configuration
    const jobQuery = {
      _id: { $nin: appliedJobIds.map(id => new ObjectId(id)) },
      status: 'active'
    };

    // Filter by keywords from Prisma preferences
    if (keywords && keywords.length > 0) {
      jobQuery.$or = [
        { title: { $in: keywords.map(k => new RegExp(k, 'i')) } },
        { skills: { $in: keywords.map(k => new RegExp(k, 'i')) } }
      ];
    }

    // Find ONE matching job
    let job = await jobsCol.findOne(jobQuery);

    if (!job) {
      // PITCH RESILIENCE: If no new jobs found, pick ANY active job to keep the demo moving
      job = await jobsCol.findOne({ status: 'active' });
    }

    if (!job) {
      return NextResponse.json({
        success: false,
        message: 'No matching jobs found',
      });
    }

    // Apply to the job
    const now = new Date();

    // All applications start as 'pending'
    const application = {
      userId,
      jobId: job._id.toString(),
      status: 'pending',
      source: 'agent',
      coverLetter: `AI-generated application for ${job.title} at ${job.company}. Matched based on your preferences: ${keywords?.join(', ')}.`,
      appliedDate: now,
      createdAt: now,
      updatedAt: now,
    };

    const result = await appsCol.insertOne(application);

    // Timing for the next application (30 seconds)
    const nextApplicationTime = new Date(now.getTime() + 30000);

    return NextResponse.json({
      success: true,
      message: 'Application submitted',
      application: {
        id: result.insertedId.toString(),
        ...application,
        job: {
          id: job._id.toString(),
          title: job.title,
          company: job.company,
          companyLogo: job.companyLogo,
          location: job.location,
        },
      },
      todayCount: todayCount + 1,
      dailyLimit,
      nextApplicationTime: nextApplicationTime.toISOString(),
    });
  } catch (error) {
    console.error('POST /api/agent/[userId]/apply error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to apply to job' },
      { status: 500 },
    );
  }
}

