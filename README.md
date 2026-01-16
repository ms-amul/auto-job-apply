# Auto Job Apply AI

A professional, AI-powered job application automation platform built with Next.js, Prisma, and Supabase.

## 🚀 Overview

Auto Job Apply AI streamlines the job hunt process by automatically matching candidates with relevant job opportunities and handling the application flow. It features a sophisticated AI Agent system that respects user preferences and daily limits.

> [!IMPORTANT]
> **Database Transition Phase**: This project is currently migrating from MongoDB to PostgreSQL (Supabase). 
> - **MongoDB** is currently used for job listings and application storage.
> - **PostgreSQL (via Prisma)** is used for user profiles, agent preferences, and core relational data.
> MongoDB will be phased out once the production schema is fully robust.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: 
  - [Supabase](https://supabase.com/) (PostgreSQL) - Primary Relational DB
  - [MongoDB Atlas](https://www.mongodb.com/atlas) - Transitional/Job Data
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Ant Design](https://ant.design/)
- **Animations**: [Framer Motion](https://www.framer-motion.dev/)

## ⚙️ Environment Setup

To run this project locally, you need to configure the following environment variables in a `.env.local` file.

### 1. Database Configuration

#### Supabase (PostgreSQL)
- **DATABASE_URL**: Connection pooling URL (Port 6543) for Next.js.
- **DIRECT_URL**: Direct connection URL (Port 5432) for migrations.

```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

#### MongoDB
- **MONGODB_URI**: Connection string for your MongoDB Atlas cluster or local instance.

```env
MONGODB_URI="mongodb+srv://[USER]:[PASS]@[CLUSTER].mongodb.net/jobvita?retryWrites=true&w=majority"
```

### 2. Authentication & API
- **NEXTAUTH_SECRET**: A random string (min 32 chars) for JWT encryption.
- **NEXTAUTH_URL**: `http://localhost:3000` (for development).
- **AGENT_API_BASE_URL**: Base URL for the external Agent API service.

```env
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
AGENT_API_BASE_URL="http://localhost:8000"
```

## 🤖 AI Agent Architecture

The AI Agent automates the application process through a set of internal API routes and external dependencies.

### Agent APIs
- **`GET /api/agent/[userId]`**: Fetches agent configuration and preferences.
- **`PUT /api/agent/[userId]`**: Updates agent settings (daily limits, keywords, status).
- **`POST /api/agent/[userId]/apply`**: Executes a single application cycle.
- **`GET /api/agent/[userId]/stats`**: Retrieves real-time application metrics.

### Dependencies & Logic
- **Prisma (PostgreSQL)**: Stores user-specific preferences (`auto_apply_agent_preferences`), keywords, and application limits.
- **MongoDB**: Currently used to query active job listings and check for pre-existing applications.
- **Adaptive Timing**: The agent maintains a 30-second interval between applications to mimic human behavior and avoid rate limits.
- **Keyword Matching**: Relevancy is calculated by matching user-defined keywords against job titles and skill requirements.

## 🏃 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Sync Database Schema**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to Supabase (if needed)
   npx prisma db push
   ```

3. **Seed Data (Optional)**:
   ```bash
   node scripts/seed-jobs.js
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

- `app/` - Next.js App Router (Pages, API Routes)
- `components/` - Shared UI components (AntD + Tailwind)
- `lib/` - Shared utilities (MongoDB, Prisma, Auth config)
- `prisma/` - Database schema and migrations
- `scripts/` - Database seeding and maintenance scripts
- `public/` - Static assets

## 📜 Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Creates an optimized production build.
- `npm run prisma:studio` - Visual interface for exploring the database.
- `node scripts/seed-jobs.js` - Populates MongoDB with sample job listings.

---
*Built with ❤️ for a faster job hunt.*
