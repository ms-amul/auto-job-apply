This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database Setup

This project uses **MongoDB** (MongoDB Atlas or local MongoDB) for data storage.

### Quick Setup

1. **Create `.env.local` file** in the project root:
```env
MONGODB_URI=your-mongodb-connection-string-here
```

2. **Get MongoDB Connection String:**
   - **MongoDB Atlas (Cloud):**
     - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     - Create a cluster (free tier available)
     - Click "Connect" → "Connect your application"
     - Copy the connection string
     - Replace `<password>` with your database password
     - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   
   - **Local MongoDB:**
     - If running MongoDB locally: `mongodb://localhost:27017`
     - Database name: `jobvita` (default)

3. **Install dependencies:**
```bash
npm install
```

4. **Seed the database (optional):**
```bash
# Seed with 180+ realistic jobs across multiple industries
node scripts/seed-jobs.js
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Collections

The app uses the following MongoDB collections:
- `users` - User accounts (applicants and recruiters)
- `jobs` - Job listings
- `applications` - Job applications
- `agents` - Auto-apply agent configurations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `node scripts/seed-jobs.js` - Seed database with sample jobs

## Project Structure

- `app/` - Next.js app router (pages and API routes)
- `components/` - React components
- `data/` - Mock JSON data (fallback for demo accounts)
- `lib/mongodb.js` - MongoDB connection client
- `lib/prisma.js` - Prisma client (for future PostgreSQL migration)
- `scripts/` - Database seeding scripts
- `prisma/` - Prisma schema (for future use)

## Features

- ✅ User authentication (sign in/sign up)
- ✅ Job listings with advanced filtering
- ✅ Application management
- ✅ Auto-apply agent system
- ✅ Dashboard for applicants and recruiters
- ✅ Profile management
- ✅ Analytics and statistics

## Migration Notes

This project currently uses MongoDB for temporary storage. The codebase includes:
- Prisma schema (ready for PostgreSQL migration)
- Hybrid database utilities in `lib/db-hybrid.js`
- Both MongoDB and Prisma clients available

See `MOCK_DATA_SUMMARY.txt` for details on migrating from mock data to database.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to add your `MONGODB_URI` environment variable in Vercel's project settings.
