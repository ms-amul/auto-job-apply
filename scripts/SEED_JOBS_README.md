# Seed Jobs Documentation

This directory contains seed scripts to populate the MongoDB database with realistic job listings across multiple industries.

## 📁 File Structure

```
scripts/
├── seed-jobs.js              # Main seed script that combines all categories
├── seed-medical-jobs.js      # Medical & Healthcare jobs
├── seed-automotive-jobs.js   # Automotive & Transportation jobs
├── seed-finance-jobs.js      # Finance & Fintech jobs
├── seed-retail-jobs.js       # Retail & E-commerce jobs
├── seed-education-jobs.js    # Education & EdTech jobs
└── SEED_JOBS_README.md       # This file
```

## 🎯 Job Categories

### 1. Technology (General Tech)
- **File**: `seed-jobs.js` (main file)
- **Count**: 30 jobs
- **Companies**: Google, Meta, Microsoft, Apple, Netflix, SpaceX, Airbnb, LinkedIn, Salesforce, Oracle, Adobe, Zoom
- **Job Types**: Software Engineers, Full Stack Developers, DevOps, Data Engineers, ML Engineers, Product Managers, etc.

### 2. Medical & Healthcare
- **File**: `seed-medical-jobs.js`
- **Count**: 30 jobs
- **Companies**: Kaiser Permanente, Mayo Clinic, Cleveland Clinic, Johns Hopkins, UnitedHealth Group, CVS Health, Pfizer, Johnson & Johnson, Moderna, Teladoc Health
- **Job Types**: Healthcare Software Engineers, Clinical Systems Developers, Medical Data Analysts, EHR Integration Specialists, etc.
- **Special Focus**: HIPAA compliance, HL7/FHIR standards, healthcare IT

### 3. Automotive & Transportation
- **File**: `seed-automotive-jobs.js`
- **Count**: 30 jobs
- **Companies**: Tesla, Ford, General Motors, Toyota, BMW, Rivian, Lucid Motors, Waymo, Cruise, Uber
- **Job Types**: Automotive Software Engineers, Embedded Systems Engineers, ADAS Engineers, EV Platform Engineers, etc.
- **Special Focus**: Embedded systems, ISO 26262, CAN/LIN protocols, autonomous vehicles

### 4. Finance & Fintech
- **File**: `seed-finance-jobs.js`
- **Count**: 30 jobs
- **Companies**: Goldman Sachs, JPMorgan Chase, Stripe, Square, Coinbase, Robinhood, PayPal, Visa, Mastercard, Plaid
- **Job Types**: Fintech Engineers, Payment Systems Engineers, Blockchain Developers, Trading Platform Engineers, etc.
- **Special Focus**: Low-latency systems, PCI-DSS compliance, financial regulations

### 5. Retail & E-commerce
- **File**: `seed-retail-jobs.js`
- **Count**: 30 jobs
- **Companies**: Amazon, Shopify, Walmart, Target, eBay, Etsy, Instacart, DoorDash, Wayfair, Best Buy
- **Job Types**: E-commerce Platform Engineers, Marketplace Developers, Inventory Management Engineers, etc.
- **Special Focus**: High-traffic systems, payment processing, omnichannel retail

### 6. Education & EdTech
- **File**: `seed-education-jobs.js`
- **Count**: 30 jobs
- **Companies**: Coursera, Udemy, Khan Academy, Duolingo, Canvas, Chegg, Blackboard, Pearson, Age of Learning, Quizlet
- **Job Types**: EdTech Platform Engineers, LMS Developers, Learning Analytics Engineers, etc.
- **Special Focus**: Accessibility (WCAG), adaptive learning, gamification

## 🚀 Usage

### Prerequisites
1. MongoDB instance running (local or cloud)
2. Node.js installed
3. MongoDB connection string

### Setup
1. Update the MongoDB connection string in `seed-jobs.js`:
   ```javascript
   const uri = 'your-mongodb-connection-string-here';
   ```

2. Ensure database name is correct:
   ```javascript
   const dbName = 'jobvita';
   ```

### Running the Seed Script

To seed all 180 jobs across all categories:

```bash
node scripts/seed-jobs.js
```

This will:
1. Connect to MongoDB
2. Clear existing jobs in the database
3. Generate 180 jobs (30 per category)
4. Insert all jobs into the database
5. Create necessary indexes
6. Display summary statistics

### Expected Output

```
✅ Connected to MongoDB
✅ Cleared existing jobs

📦 Generating jobs by category...
  ✓ Generated 30 Technology jobs
  ✓ Generated 30 Medical & Healthcare jobs
  ✓ Generated 30 Automotive & Transportation jobs
  ✓ Generated 30 Finance & Fintech jobs
  ✓ Generated 30 Retail & E-commerce jobs
  ✓ Generated 30 Education & EdTech jobs

✅ Successfully inserted 180 total jobs
✅ Created indexes

📊 Jobs Summary by Category:
  Technology: 30 jobs
  Medical & Healthcare: 30 jobs
  Automotive & Transportation: 30 jobs
  Finance & Fintech: 30 jobs
  Retail & E-commerce: 30 jobs
  Education & EdTech: 30 jobs

📊 Top 15 Companies by Job Count:
  [Company names and counts...]

✅ Disconnected from MongoDB
```

## 📊 Job Schema

Each job includes the following fields:

```javascript
{
  title: String,              // Job title
  company: String,            // Company name
  companyLogo: String,        // Company logo URL
  location: String,           // Job location
  locationType: String,       // 'remote', 'hybrid', or 'onsite'
  employmentType: String,     // 'Full-time', 'Contract', 'Part-time'
  experienceLevel: String,    // 'Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'
  
  // Description fields
  summary: String,            // Brief job summary
  aboutRole: String,          // Detailed role description
  responsibilities: [String], // Array of responsibilities
  aboutCompany: String,       // Company description
  culture: String,            // Company culture description
  
  requirements: [String],     // Array of requirements
  skills: [String],          // Array of required skills/technologies
  salary: {
    min: Number,             // Minimum salary
    max: Number,             // Maximum salary
    currency: String,        // 'USD'
    period: String,          // 'year'
  },
  benefits: [String],        // Array of benefits
  industry: String,          // Industry category
  category: String,          // Job category (Technology, Medical, etc.)
  
  applicants: Number,        // Number of applicants
  views: Number,            // Number of views
  postedDate: Date,         // When job was posted
  expiryDate: Date,         // When job expires
  status: String,           // 'active'
  isRemote: Boolean,        // Is it a remote job
  isHybrid: Boolean,        // Is it a hybrid job
  visaSponsorship: Boolean, // Offers visa sponsorship
  
  contactEmail: String,     // Contact email
  applicationUrl: String,   // Application URL
  
  createdAt: Date,         // Creation timestamp
  updatedAt: Date,         // Last update timestamp
}
```

## 🔍 Database Indexes

The following indexes are created for optimal query performance:

- **Text Index**: `title`, `summary`, `company` (for full-text search)
- **Single Field Indexes**:
  - `location`
  - `experienceLevel`
  - `skills`
  - `category`
  - `status`
- **Sorted Index**: `postedDate` (descending, for recent jobs first)

## 🎨 Customization

### Adjusting Job Count

To change the number of jobs per category, modify the count parameter in `seed-jobs.js`:

```javascript
const techJobs = generateTechJobs(50);        // 50 instead of 30
const medicalJobs = generateMedicalJobs(25);  // 25 instead of 30
// etc.
```

### Adding New Categories

1. Create a new seed file (e.g., `seed-gaming-jobs.js`)
2. Follow the structure of existing category files
3. Export a generator function
4. Import and call it in `seed-jobs.js`

Example structure:
```javascript
// seed-gaming-jobs.js
function generateGamingJobs(count = 30) {
  // Implementation
  return jobs;
}

module.exports = { generateGamingJobs };
```

Then in `seed-jobs.js`:
```javascript
const { generateGamingJobs } = require('./seed-gaming-jobs');

// In seedJobs function:
const gamingJobs = generateGamingJobs(30);
const allJobs = [...existingJobs, ...gamingJobs];
```

### Modifying Salary Ranges

Salary ranges are defined per experience level in each category file:

```javascript
function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 80000, max: 120000 },
    'Mid Level': { min: 120000, max: 160000 },
    'Senior': { min: 150000, max: 200000 },
    'Lead': { min: 180000, max: 250000 },
    'Principal': { min: 220000, max: 350000 },
  };
  return ranges[experienceLevel];
}
```

## 🌐 Pagination Support

The jobs API and frontend support pagination:

### API Parameters
- `limit`: Number of jobs per page (default: 20)
- `skip`: Number of jobs to skip
- `search`: Full-text search query
- `location`: Location filter
- `experienceLevel`: Experience level filter
- `remote`: Remote work filter ('remote', 'hybrid', 'onsite', 'all')

### Example API Call
```
GET /api/jobs?limit=20&skip=0&location=San Francisco&experienceLevel=Senior
```

### Frontend Features
- Server-side pagination
- Items per page selector (10, 20, 30, 50)
- Page navigation with numbers
- Debounced search (500ms)
- Smooth scrolling on page change

## 📝 Notes

- All jobs are set to `status: 'active'` by default
- Posted dates are randomized within the last 30 days
- Expiry dates are set to 30 days after posted date
- Visa sponsorship is randomly assigned (50% probability)
- Tech stacks and skills are randomly selected from predefined arrays
- All companies use Clearbit for logos (may fall back to placeholders)

## 🔧 Troubleshooting

### Connection Issues
If you encounter connection errors:
1. Verify MongoDB is running
2. Check your connection string
3. Ensure network access (IP whitelist for cloud MongoDB)
4. Verify database permissions

### Duplicate Key Errors
If you get duplicate key errors:
- The script already clears existing jobs before insertion
- If issues persist, manually drop the jobs collection

### Performance
- Seeding 180 jobs typically takes 2-5 seconds
- Index creation may take additional time on first run
- Subsequent seeds are faster due to existing indexes

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js MongoDB Driver](https://mongodb.github.io/node-mongodb-native/)
- [Job Board Best Practices](https://www.indeed.com/hire/c/info/job-posting-best-practices)

