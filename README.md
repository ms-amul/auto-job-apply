This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database Setup

This project uses PostgreSQL with Supabase. You have **two options**:

### Option 1: Prisma ORM (Recommended)
Type-safe, great developer experience with autocomplete.

```bash
# 1. Create .env.local with DATABASE_URL (from Supabase)
# 2. Install dependencies
npm install

# 3. Pull existing schema from Supabase
npx prisma db pull

# 4. Generate Prisma Client
npx prisma generate
```

**Quick test:** http://localhost:3000/api/prisma-test

📖 **Full guide:** [PRISMA_SETUP.md](./PRISMA_SETUP.md)

### Option 2: Raw SQL with `pg`
Maximum flexibility with direct SQL queries.

```bash
# 1. Create .env.local with DATABASE_URL (from Supabase)
# 2. Install dependencies
npm install
```

**Quick test:** http://localhost:3000/api/db-test

📖 **Full guide:** [SETUP_DATABASE.md](./SETUP_DATABASE.md)

### Comparison & Migration
- 📊 [Compare Both Approaches](./COMPARISON_PRISMA_VS_RAW_SQL.md)
- 🔄 [Hybrid Approach (Use Both)](./lib/db-hybrid.js)
- ✅ [Setup Complete Guide](./DATABASE_SETUP_COMPLETE.md)

Both approaches are **migration-friendly** - switch databases by just changing `DATABASE_URL`!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
