/**
 * Hybrid Database Approach
 * 
 * Use Prisma for most queries, Raw SQL when needed
 * Best of both worlds! 🎉
 */

import prisma from './prisma';

// ============================================
// Example: Use Prisma + Raw SQL Together
// ============================================

/**
 * Get job analytics using raw SQL for complex aggregations
 */
export async function getJobAnalytics(userId, days = 30) {
  // Complex analytics with raw SQL
  const analytics = await prisma.$queryRaw`
    WITH daily_stats AS (
      SELECT 
        date_trunc('day', created_at) as day,
        COUNT(*) as jobs_created,
        COUNT(DISTINCT company) as unique_companies
      FROM jobs
      WHERE user_id = ${userId}
        AND created_at > NOW() - INTERVAL '${days} days'
      GROUP BY day
    )
    SELECT 
      day,
      jobs_created,
      unique_companies,
      SUM(jobs_created) OVER (ORDER BY day) as cumulative_jobs
    FROM daily_stats
    ORDER BY day DESC
  `;

  // Get user info with Prisma (cleaner for relations)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          jobs: true,
          applications: true,
        },
      },
    },
  });

  return {
    user,
    analytics,
  };
}

/**
 * Search with complex scoring using raw SQL,
 * then enrich with Prisma
 */
export async function searchJobsWithRelevance(searchTerm) {
  // Use raw SQL for complex full-text search with scoring
  const jobIds = await prisma.$queryRaw`
    SELECT 
      id,
      ts_rank(
        to_tsvector('english', title || ' ' || company || ' ' || COALESCE(description, '')),
        plainto_tsquery('english', ${searchTerm})
      ) as relevance
    FROM jobs
    WHERE to_tsvector('english', title || ' ' || company || ' ' || COALESCE(description, ''))
          @@ plainto_tsquery('english', ${searchTerm})
    ORDER BY relevance DESC
    LIMIT 20
  `;

  // Use Prisma to fetch full job details with relations
  const jobs = await prisma.job.findMany({
    where: {
      id: {
        in: jobIds.map(j => j.id),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: { applications: true },
      },
    },
  });

  // Merge relevance scores
  return jobs.map(job => ({
    ...job,
    relevance: jobIds.find(j => j.id === job.id)?.relevance || 0,
  }));
}

/**
 * Bulk operations: Use raw SQL for performance,
 * Prisma for validation
 */
export async function bulkImportJobs(jobsData) {
  // Validate first job with Prisma (ensures schema compatibility)
  if (jobsData.length > 0) {
    const testJob = jobsData[0];
    await prisma.job.create({
      data: testJob,
    });
  }

  // Use raw SQL for bulk insert (faster for large datasets)
  const values = jobsData.slice(1).map((job, idx) => {
    const offset = idx * 4;
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
  }).join(', ');

  const params = jobsData.slice(1).flatMap(job => [
    job.title,
    job.company,
    job.description,
    job.userId,
  ]);

  if (params.length > 0) {
    await prisma.$executeRaw`
      INSERT INTO jobs (title, company, description, user_id, created_at, updated_at)
      VALUES ${values}
    `;
  }

  return { imported: jobsData.length };
}

/**
 * Get dashboard data efficiently
 * Mix of Prisma and raw SQL for optimal performance
 */
export async function getDashboardData(userId) {
  // Use Prisma's transaction for consistency
  const [user, recentJobs, stats, trends] = await prisma.$transaction([
    // Simple queries with Prisma
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            jobs: true,
            applications: true,
          },
        },
      },
    }),

    // Recent jobs with Prisma (clean syntax)
    prisma.job.findMany({
      where: { userId },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    }),

    // Complex aggregations with raw SQL
    prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_jobs,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_jobs,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as jobs_this_week,
        COUNT(DISTINCT company) as unique_companies
      FROM jobs
      WHERE user_id = ${userId}
    `,

    // Trends with raw SQL (window functions)
    prisma.$queryRaw`
      SELECT 
        date_trunc('week', created_at) as week,
        COUNT(*) as jobs,
        LAG(COUNT(*)) OVER (ORDER BY date_trunc('week', created_at)) as previous_week
      FROM jobs
      WHERE user_id = ${userId}
        AND created_at > NOW() - INTERVAL '12 weeks'
      GROUP BY week
      ORDER BY week DESC
      LIMIT 12
    `,
  ]);

  return {
    user,
    recentJobs,
    stats: stats[0],
    trends,
  };
}

/**
 * Geo-location search using PostGIS with raw SQL,
 * results fetched with Prisma
 */
export async function searchJobsByLocation(lat, lon, radiusMiles = 50) {
  // Use raw SQL for PostGIS functions
  const nearbyJobIds = await prisma.$queryRaw`
    SELECT 
      id,
      ST_Distance(
        ST_MakePoint(longitude, latitude)::geography,
        ST_MakePoint(${lon}, ${lat})::geography
      ) / 1609.34 as distance_miles
    FROM jobs
    WHERE ST_DWithin(
      ST_MakePoint(longitude, latitude)::geography,
      ST_MakePoint(${lon}, ${lat})::geography,
      ${radiusMiles * 1609.34}
    )
    ORDER BY distance_miles
  `;

  // Fetch full details with Prisma
  const jobs = await prisma.job.findMany({
    where: {
      id: {
        in: nearbyJobIds.map(j => j.id),
      },
    },
    include: {
      user: true,
    },
  });

  // Add distance to results
  return jobs.map(job => ({
    ...job,
    distance: nearbyJobIds.find(j => j.id === job.id)?.distance_miles,
  }));
}

/**
 * Export data with raw SQL for performance,
 * using Prisma for type safety
 */
export async function exportUserData(userId) {
  // Verify user exists with Prisma
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Use raw SQL for efficient export
  const data = await prisma.$queryRaw`
    SELECT 
      j.id,
      j.title,
      j.company,
      j.created_at,
      COUNT(a.id) as application_count,
      json_agg(
        json_build_object(
          'id', a.id,
          'status', a.status,
          'applied_at', a.applied_at
        )
      ) as applications
    FROM jobs j
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE j.user_id = ${userId}
    GROUP BY j.id
    ORDER BY j.created_at DESC
  `;

  return {
    user,
    data,
    exportedAt: new Date(),
  };
}

/**
 * Health check combining both approaches
 */
export async function healthCheck() {
  try {
    // Test Prisma
    const prismaTest = await prisma.user.count();

    // Test raw SQL
    const rawSqlTest = await prisma.$queryRaw`SELECT NOW() as timestamp`;

    return {
      status: 'healthy',
      prisma: {
        working: true,
        userCount: prismaTest,
      },
      rawSql: {
        working: true,
        timestamp: rawSqlTest[0].timestamp,
      },
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
    };
  }
}

