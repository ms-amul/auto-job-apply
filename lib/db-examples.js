/**
 * Database Query Examples
 * 
 * Common patterns for working with PostgreSQL in Next.js
 * These examples work with any PostgreSQL database (Supabase, AWS RDS, etc.)
 */

import { query, getClient } from './db';

// ============================================
// EXAMPLE 1: Basic SELECT
// ============================================
export async function getAllJobs() {
  const result = await query('SELECT * FROM jobs ORDER BY created_at DESC');
  return result.rows;
}

export async function getJobById(id) {
  const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
  return result.rows[0];
}

// ============================================
// EXAMPLE 2: INSERT with RETURNING
// ============================================
export async function createJob(title, company, description) {
  const result = await query(
    `INSERT INTO jobs (title, company, description, created_at) 
     VALUES ($1, $2, $3, NOW()) 
     RETURNING *`,
    [title, company, description]
  );
  return result.rows[0];
}

// ============================================
// EXAMPLE 3: UPDATE
// ============================================
export async function updateJob(id, updates) {
  const { title, company, description } = updates;
  const result = await query(
    `UPDATE jobs 
     SET title = COALESCE($1, title),
         company = COALESCE($2, company),
         description = COALESCE($3, description),
         updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [title, company, description, id]
  );
  return result.rows[0];
}

// ============================================
// EXAMPLE 4: DELETE
// ============================================
export async function deleteJob(id) {
  const result = await query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

// ============================================
// EXAMPLE 5: Complex Query with JOINs
// ============================================
export async function getJobsWithApplications(userId) {
  const result = await query(
    `SELECT 
       j.id,
       j.title,
       j.company,
       j.description,
       j.created_at,
       COUNT(a.id) as application_count,
       MAX(a.applied_at) as last_applied
     FROM jobs j
     LEFT JOIN applications a ON j.id = a.job_id
     WHERE j.user_id = $1
     GROUP BY j.id
     ORDER BY j.created_at DESC`,
    [userId]
  );
  return result.rows;
}

// ============================================
// EXAMPLE 6: Transaction (Multiple Operations)
// ============================================
export async function createUserWithProfile(email, name, bio) {
  const client = await getClient();
  
  try {
    // Start transaction
    await client.query('BEGIN');
    
    // Create user
    const userResult = await client.query(
      'INSERT INTO users (email, created_at) VALUES ($1, NOW()) RETURNING *',
      [email]
    );
    const user = userResult.rows[0];
    
    // Create profile
    const profileResult = await client.query(
      'INSERT INTO profiles (user_id, name, bio) VALUES ($1, $2, $3) RETURNING *',
      [user.id, name, bio]
    );
    const profile = profileResult.rows[0];
    
    // Commit transaction
    await client.query('COMMIT');
    
    return { user, profile };
    
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // Always release the client back to the pool
    client.release();
  }
}

// ============================================
// EXAMPLE 7: Pagination
// ============================================
export async function getJobsPaginated(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  
  // Get total count
  const countResult = await query('SELECT COUNT(*) FROM jobs');
  const totalJobs = parseInt(countResult.rows[0].count);
  
  // Get paginated results
  const result = await query(
    `SELECT * FROM jobs 
     ORDER BY created_at DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  
  return {
    jobs: result.rows,
    pagination: {
      page,
      limit,
      total: totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
    },
  };
}

// ============================================
// EXAMPLE 8: Search with LIKE
// ============================================
export async function searchJobs(searchTerm) {
  const result = await query(
    `SELECT * FROM jobs 
     WHERE title ILIKE $1 
        OR company ILIKE $1 
        OR description ILIKE $1
     ORDER BY created_at DESC`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

// ============================================
// EXAMPLE 9: Bulk Insert
// ============================================
export async function bulkCreateJobs(jobs) {
  const client = await getClient();
  
  try {
    await client.query('BEGIN');
    
    const insertedJobs = [];
    
    for (const job of jobs) {
      const result = await client.query(
        `INSERT INTO jobs (title, company, description, created_at) 
         VALUES ($1, $2, $3, NOW()) 
         RETURNING *`,
        [job.title, job.company, job.description]
      );
      insertedJobs.push(result.rows[0]);
    }
    
    await client.query('COMMIT');
    return insertedJobs;
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// ============================================
// EXAMPLE 10: Using Raw SQL for Complex Queries
// ============================================
export async function getJobStatistics() {
  const result = await query(`
    SELECT 
      COUNT(*) as total_jobs,
      COUNT(DISTINCT company) as unique_companies,
      COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as jobs_last_week,
      COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as jobs_last_month
    FROM jobs
  `);
  return result.rows[0];
}


