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

export async function POST(_request, { params }) {
  try {
    const { userId } = await params;
    const db = await getDb();

    const appsCol = db.collection('applications');
    const jobsCol = db.collection('jobs');
    const agentsCol = db.collection('agents');

    // Check agent status
    const agent = await agentsCol.findOne({ userId });

    if (!agent || agent.status !== 'running') {
      return NextResponse.json({
        success: false,
        message: 'Agent is not running',
      });
    }

    // Check today's application count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayCount = await appsCol.countDocuments({ 
      userId, 
      source: 'agent',
      appliedDate: { $gte: todayStart }
    });

    const dailyLimit = agent.dailyLimit || 10;

    // Check if daily limit reached
    if (todayCount >= dailyLimit) {
      return NextResponse.json({
        success: false,
        message: 'Daily limit reached',
        todayCount,
        dailyLimit,
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

    // Filter by keywords (match in title or skills)
    if (agent.keywords && agent.keywords.length > 0) {
      jobQuery.$or = [
        { title: { $in: agent.keywords.map(k => new RegExp(k, 'i')) } },
        { skills: { $in: agent.keywords.map(k => new RegExp(k, 'i')) } }
      ];
    }

    // Filter by remote preference
    if (agent.remoteOnly) {
      jobQuery.isRemote = true;
    }

    // Filter by salary range
    if (agent.minSalary) {
      jobQuery['salary.min'] = { $gte: parseInt(agent.minSalary) };
    }
    if (agent.maxSalary) {
      jobQuery['salary.max'] = { $lte: parseInt(agent.maxSalary) };
    }

    // Find ONE matching job
    const job = await jobsCol.findOne(jobQuery);

    if (!job) {
      return NextResponse.json({
        success: false,
        message: 'No matching jobs found',
      });
    }

    // Apply to the job
    const now = new Date();
    
    // All applications start as 'pending'
    // Status will be updated over time by /api/applications/update-statuses
    const application = {
      userId,
      jobId: job._id.toString(),
      status: 'pending', // All start as pending
      source: 'agent',
      coverLetter: `AI-generated application for ${job.title} at ${job.company}. Matched based on your preferences: ${agent.keywords?.join(', ')}.`,
      appliedDate: now,
      createdAt: now,
      updatedAt: now,
    };

    const result = await appsCol.insertOne(application);

    // MOCK: Update agent with timing information
    // Future: This will be handled by job queue/scheduler
    const nextApplicationTime = new Date(now.getTime() + 30000); // 30 seconds from now
    await agentsCol.updateOne(
      { userId },
      { 
        $set: { 
          lastApplicationTime: now,
          nextApplicationTime: nextApplicationTime,
        } 
      }
    );

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
      nextApplicationTime: nextApplicationTime.toISOString(), // Return next application time
    });
  } catch (error) {
    console.error('POST /api/agent/[userId]/apply error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to apply to job' },
      { status: 500 },
    );
  }
}

