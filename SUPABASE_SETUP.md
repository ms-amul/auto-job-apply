# Supabase + Prisma Setup Guide

This project uses **Supabase PostgreSQL** with **Prisma ORM**.

## Quick Setup

### 1. Get Your Supabase Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** > **Database**
4. Find the **Connection string** section
5. Copy the connection string (use **Connection pooling** mode for Next.js)

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Connection Pooling (Recommended for Next.js)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"

# Direct Connection (For migrations)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
```

Replace:
- `[YOUR-PASSWORD]` with your database password
- `[PROJECT-REF]` with your project reference ID

### 3. Pull Schema from Supabase (REQUIRED - Tables Already Exist)

Since your tables already exist in Supabase, pull the schema:

```bash
npm run prisma:pull
```

Or:

```bash
npx prisma db pull
```

This will automatically generate all models in `prisma/schema.prisma` from your existing Supabase tables.

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

Or it will run automatically after `npm install` (via postinstall script).

### 5. Push Schema to Supabase (If Creating New Tables)

If you need to create new tables from the schema:

```bash
npm run prisma:push
```

⚠️ **Warning**: This will modify your database schema. Use with caution in production.

### 6. Open Prisma Studio (Optional)

View and edit your data visually:

```bash
npm run prisma:studio
```

## Database Tables

The schema includes these tables:

- **users** - User accounts and profiles
- **agents** - AI agent configurations
- **jobs** - Job listings
- **applications** - Job applications

## Using Prisma in Your Code

```javascript
import { prisma } from '@/lib/prisma';

// Example: Get user
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: { agent: true, applications: true }
});

// Example: Create agent config
const agent = await prisma.agent.upsert({
  where: { userId: 'user-id' },
  update: { dailyLimit: 15, status: 'running' },
  create: {
    userId: 'user-id',
    dailyLimit: 15,
    status: 'running',
    keywords: ['software engineer', 'react'],
  }
});
```

## Migration Workflow

1. **Modify** `prisma/schema.prisma`
2. **Create migration**: `npx prisma migrate dev --name your_migration_name`
3. **Apply migration**: `npx prisma migrate deploy` (production)

## Troubleshooting

### Connection Issues

- Make sure your IP is allowed in Supabase (Settings > Database > Connection Pooling)
- Check that your password doesn't contain special characters that need URL encoding
- Verify the project reference ID is correct

### Schema Sync Issues

- Use `prisma db pull` to sync from Supabase
- Use `prisma db push` to push changes (development only)
- Use migrations for production changes

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)

