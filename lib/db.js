/**
 * PostgreSQL Database Connection
 * 
 * This uses the standard 'pg' library to connect to PostgreSQL.
 * Works with Supabase, AWS RDS, Railway, or any PostgreSQL database.
 * 
 * To migrate to a different PostgreSQL provider:
 * 1. Update DATABASE_URL in .env.local
 * 2. No code changes needed!
 */

import { Pool } from 'pg';

let pool;

/**
 * Get or create a PostgreSQL connection pool
 * Using a singleton pattern to reuse connections in serverless environment
 */
export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Recommended settings for serverless (Next.js API routes)
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // Timeout if connection takes > 2 seconds
      // Enable SSL for Supabase (and most cloud PostgreSQL providers)
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
      process.exit(-1);
    });
  }

  return pool;
}

/**
 * Execute a query with automatic connection management
 * 
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters (for parameterized queries)
 * @returns {Promise} Query result
 * 
 * @example
 * // Simple query
 * const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
 * 
 * @example
 * // Insert with RETURNING
 * const result = await query(
 *   'INSERT INTO jobs (title, company) VALUES ($1, $2) RETURNING *',
 *   ['Software Engineer', 'Acme Corp']
 * );
 */
export async function query(text, params) {
  const pool = getPool();
  const start = Date.now();
  
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Log query performance (optional, remove in production if needed)
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text, duration, rows: result.rowCount });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a client from the pool for transaction support
 * Remember to call client.release() when done!
 * 
 * @example
 * const client = await getClient();
 * try {
 *   await client.query('BEGIN');
 *   await client.query('INSERT INTO users (name) VALUES ($1)', ['John']);
 *   await client.query('INSERT INTO profiles (user_id) VALUES ($1)', [userId]);
 *   await client.query('COMMIT');
 * } catch (e) {
 *   await client.query('ROLLBACK');
 *   throw e;
 * } finally {
 *   client.release();
 * }
 */
export async function getClient() {
  const pool = getPool();
  return await pool.connect();
}

/**
 * Gracefully close all database connections
 * Call this when shutting down your application
 */
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/**
 * Test database connection
 * Useful for health checks
 */
export async function testConnection() {
  try {
    const result = await query('SELECT NOW() as now, version() as version');
    return {
      success: true,
      timestamp: result.rows[0].now,
      version: result.rows[0].version,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}


