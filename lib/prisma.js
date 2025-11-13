/**
 * Prisma Client Singleton
 * 
 * This ensures we don't create multiple Prisma Client instances
 * in development (due to Next.js hot reloading)
 * 
 * Works with ANY PostgreSQL database - just change DATABASE_URL
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;


