/**
 * Update Application Statuses API Route
 * 
 * Simulates application status progression over time
 * - Pending → Interview (after 2-5 minutes)
 * - Interview → Accepted/Rejected (after 3-7 minutes)
 * 
 * MOCK IMPLEMENTATION - For demo purposes
 * Future: Status updates will come from actual job board webhooks/APIs
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const db = await getDb();
    const appsCol = db.collection('applications');
    const now = new Date();

    // Find applications that need status updates
    const applications = await appsCol
      .find({ 
        userId,
        source: 'agent', // Only update agent applications for demo
      })
      .toArray();

    let updatedCount = 0;
    const updates = [];

    for (const app of applications) {
      const appliedDate = new Date(app.appliedDate);
      const minutesSinceApplied = Math.floor((now - appliedDate) / 1000 / 60);

      // Pending → Interview (after 2-5 minutes, 60% chance)
      if (app.status === 'pending' && minutesSinceApplied >= 2) {
        const shouldUpdate = Math.random() < 0.6; // 60% chance
        if (shouldUpdate) {
          updates.push({
            updateOne: {
              filter: { _id: app._id },
              update: { 
                $set: { 
                  status: 'interview',
                  updatedAt: now,
                }
              }
            }
          });
          updatedCount++;
        }
      }

      // Interview → Accepted/Rejected (after 3 minutes in interview, 40% accepted, 60% rejected)
      if (app.status === 'interview' && minutesSinceApplied >= 5) {
        const isAccepted = Math.random() < 0.4; // 40% acceptance rate
        updates.push({
          updateOne: {
            filter: { _id: app._id },
            update: { 
              $set: { 
                status: isAccepted ? 'accepted' : 'rejected',
                updatedAt: now,
              }
            }
          }
        });
        updatedCount++;
      }
    }

    // Perform bulk update
    if (updates.length > 0) {
      await appsCol.bulkWrite(updates);
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} application(s)`,
      updatedCount,
    });
  } catch (error) {
    console.error('Update statuses error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update statuses' },
      { status: 500 }
    );
  }
}

