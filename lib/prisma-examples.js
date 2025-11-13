/**
 * Prisma Query Examples
 * 
 * Common patterns for working with Prisma
 * These work with ANY PostgreSQL database (Supabase, AWS RDS, etc.)
 */

import prisma from './prisma';

// ============================================
// EXAMPLE 1: Basic CRUD Operations
// ============================================

// CREATE - Insert a new record
export async function createJob(data) {
  return await prisma.job.create({
    data: {
      title: data.title,
      company: data.company,
      description: data.description,
      location: data.location,
      salary: data.salary,
      url: data.url,
      userId: data.userId,
    },
  });
}

// READ - Get all records
export async function getAllJobs() {
  return await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true, // Include related user data
    },
  });
}

// READ - Get one record by ID
export async function getJobById(id) {
  return await prisma.job.findUnique({
    where: { id },
    include: {
      user: true,
      applications: true,
    },
  });
}

// UPDATE - Update a record
export async function updateJob(id, data) {
  return await prisma.job.update({
    where: { id },
    data: {
      title: data.title,
      company: data.company,
      description: data.description,
      location: data.location,
      salary: data.salary,
    },
  });
}

// DELETE - Delete a record
export async function deleteJob(id) {
  return await prisma.job.delete({
    where: { id },
  });
}

// ============================================
// EXAMPLE 2: Advanced Queries
// ============================================

// Search with filtering
export async function searchJobs(searchTerm) {
  return await prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { company: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Pagination
export async function getJobsPaginated(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [jobs, total] = await prisma.$transaction([
    prisma.job.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
    prisma.job.count(),
  ]);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// ============================================
// EXAMPLE 3: Relations and Joins
// ============================================

// Get jobs with applications count
export async function getJobsWithStats() {
  return await prisma.job.findMany({
    include: {
      _count: {
        select: { applications: true },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

// Get user with all their jobs and applications
export async function getUserWithJobsAndApplications(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      jobs: {
        orderBy: { createdAt: 'desc' },
      },
      applications: {
        include: {
          job: true,
        },
        orderBy: { appliedAt: 'desc' },
      },
    },
  });
}

// ============================================
// EXAMPLE 4: Transactions
// ============================================

// Create user with profile in a transaction
export async function createUserWithProfile(email, name, bio) {
  return await prisma.$transaction(async (tx) => {
    // Create user
    const user = await tx.user.create({
      data: {
        email,
        name,
      },
    });

    // Create profile (if you have a Profile model)
    // const profile = await tx.profile.create({
    //   data: {
    //     userId: user.id,
    //     bio,
    //   },
    // });

    return user;
  });
}

// Bulk operations in transaction
export async function bulkCreateJobs(jobs) {
  return await prisma.$transaction(
    jobs.map((job) =>
      prisma.job.create({
        data: job,
      })
    )
  );
}

// ============================================
// EXAMPLE 5: Aggregations
// ============================================

// Get statistics
export async function getJobStatistics() {
  const [total, byStatus, recentCount] = await prisma.$transaction([
    // Total jobs
    prisma.job.count(),
    
    // Jobs by status
    prisma.job.groupBy({
      by: ['status'],
      _count: true,
    }),
    
    // Jobs in last 7 days
    prisma.job.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  return {
    total,
    byStatus,
    recentCount,
  };
}

// ============================================
// EXAMPLE 6: Raw SQL (when needed)
// ============================================

// You can still use raw SQL for complex queries
export async function getJobsWithRawSQL(searchTerm) {
  return await prisma.$queryRaw`
    SELECT j.*, u.name as user_name, COUNT(a.id) as application_count
    FROM jobs j
    LEFT JOIN users u ON j.user_id = u.id
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE j.title ILIKE ${`%${searchTerm}%`}
    GROUP BY j.id, u.name
    ORDER BY j.created_at DESC
  `;
}

// ============================================
// EXAMPLE 7: Upsert (Update or Insert)
// ============================================

export async function upsertUser(email, name) {
  return await prisma.user.upsert({
    where: { email },
    update: { name },
    create: { email, name },
  });
}

// ============================================
// EXAMPLE 8: Soft Delete Pattern
// ============================================

// If you have a deletedAt field in your schema
export async function softDeleteJob(id) {
  return await prisma.job.update({
    where: { id },
    data: {
      status: 'deleted',
      // deletedAt: new Date(), // if you have this field
    },
  });
}

// Get only active jobs (not soft deleted)
export async function getActiveJobs() {
  return await prisma.job.findMany({
    where: {
      status: { not: 'deleted' },
      // OR: { deletedAt: null }
    },
  });
}

// ============================================
// EXAMPLE 9: Nested Creates
// ============================================

// Create job with application in one query
export async function createJobWithApplication(jobData, applicationData) {
  return await prisma.job.create({
    data: {
      ...jobData,
      applications: {
        create: applicationData,
      },
    },
    include: {
      applications: true,
    },
  });
}

// ============================================
// EXAMPLE 10: Batch Operations
// ============================================

// Update many records at once
export async function updateJobStatus(ids, status) {
  return await prisma.job.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      status,
    },
  });
}

// Delete many records
export async function deleteOldJobs(daysOld = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  return await prisma.job.deleteMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
      status: 'archived',
    },
  });
}

