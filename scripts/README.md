# Database Seeding Scripts

## Seed Jobs

This script populates your MongoDB database with 120 realistic job listings.

### How to Run:

1. **Install dependencies** (if not already installed):
```bash
npm install
```

2. **Run the seed script**:
```bash
node scripts/seed-jobs.js
```

### What it does:

- ✅ Clears existing jobs in the database
- ✅ Creates 120 realistic job listings with:
  - 20 top tech companies (Google, Meta, Amazon, etc.)
  - 20 different job titles (Senior Engineer, Product Manager, etc.)
  - Various locations (SF, NYC, Remote, etc.)
  - Realistic salaries based on experience level
  - Detailed job descriptions and requirements
  - Skills, benefits, and company info
- ✅ Creates database indexes for better query performance
- ✅ Prints a summary of inserted jobs

### Job Data Structure:

Each job includes:
- Title, company, logo
- Location (remote/hybrid/onsite)
- Employment type (full-time/contract/part-time)
- Experience level (Entry/Mid/Senior/Lead/Principal)
- Detailed description and requirements
- Skills/tech stack
- Salary range
- Benefits
- Visa sponsorship info
- Posted date and expiry date
- Applicant count and views

### Example Output:

```
Connected to MongoDB
Cleared existing jobs
✅ Successfully inserted 120 jobs
✅ Created indexes

📊 Jobs Summary:

Top 10 Companies by Job Count:
  Google: 6 jobs
  Meta: 6 jobs
  Amazon: 6 jobs
  ...
```

### Troubleshooting:

**Error: Cannot find module 'mongodb'**
- Run: `npm install mongodb`

**Connection Error**
- Check your MongoDB connection string in the script
- Ensure your IP is whitelisted in MongoDB Atlas

**Jobs not showing in app**
- Make sure your Next.js app is using the same database
- Check the database name matches (`jobvita`)
- Restart your Next.js dev server after seeding

