/**
 * Seed Jobs Script
 * Populates MongoDB with 100+ realistic job listings
 * 
 * Run with: node scripts/seed-jobs.js
 */

const { MongoClient } = require('mongodb');

const uri = '';
const dbName = 'jobvita';

// Job templates with realistic data
const companies = [
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com', industry: 'Technology' },
  { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com', industry: 'Technology' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', industry: 'E-commerce' },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', industry: 'Technology' },
  { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', industry: 'Technology' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', industry: 'Entertainment' },
  { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', industry: 'Automotive' },
  { name: 'SpaceX', logo: 'https://logo.clearbit.com/spacex.com', industry: 'Aerospace' },
  { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', industry: 'Fintech' },
  { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com', industry: 'Travel' },
  { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com', industry: 'Transportation' },
  { name: 'LinkedIn', logo: 'https://logo.clearbit.com/linkedin.com', industry: 'Social Media' },
  { name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com', industry: 'SaaS' },
  { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com', industry: 'Enterprise Software' },
  { name: 'Adobe', logo: 'https://tse3.mm.bing.net/th/id/OIP.oGUoxYV6DNGtGTdzVNXI5wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', industry: 'Creative Software' },
  { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com', industry: 'E-commerce' },
  { name: 'Square', logo: 'https://logo.clearbit.com/squareup.com', industry: 'Fintech' },
  { name: 'Coinbase', logo: 'https://logo.clearbit.com/coinbase.com', industry: 'Cryptocurrency' },
  { name: 'Robinhood', logo: 'https://logo.clearbit.com/robinhood.com', industry: 'Fintech' },
  { name: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us', industry: 'Communication' },
];

const jobTitles = [
  'Senior Software Engineer',
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'DevOps Engineer',
  'Data Engineer',
  'Machine Learning Engineer',
  'Product Manager',
  'Engineering Manager',
  'Staff Software Engineer',
  'Principal Engineer',
  'Solutions Architect',
  'Cloud Architect',
  'Security Engineer',
  'QA Engineer',
  'Mobile Developer (iOS)',
  'Mobile Developer (Android)',
  'UI/UX Designer',
  'Product Designer',
  'Data Scientist',
];

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Los Angeles, CA',
  'Chicago, IL',
  'Denver, CO',
  'Portland, OR',
  'Atlanta, GA',
  'Remote (US)',
  'Remote (Global)',
  'Hybrid - San Francisco',
  'Hybrid - New York',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['React', 'Node.js', 'TypeScript', 'AWS'],
  ['Python', 'Django', 'PostgreSQL', 'Docker'],
  ['Java', 'Spring Boot', 'Kubernetes', 'GCP'],
  ['Vue.js', 'Express', 'MongoDB', 'Azure'],
  ['Angular', 'NestJS', 'MySQL', 'Redis'],
  ['React Native', 'Firebase', 'GraphQL'],
  ['Swift', 'iOS', 'Xcode', 'SwiftUI'],
  ['Kotlin', 'Android', 'Jetpack Compose'],
  ['Go', 'Microservices', 'Kafka', 'Elasticsearch'],
  ['Rust', 'WebAssembly', 'Actix'],
];

const benefits = [
  'Health, Dental, Vision Insurance',
  '401(k) with company match',
  'Unlimited PTO',
  'Remote work options',
  'Stock options/RSUs',
  'Learning & Development budget',
  'Gym membership',
  'Commuter benefits',
  'Parental leave',
  'Mental health support',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `We are looking for a talented ${title} to join our ${company} team. You will be responsible for designing, developing, and maintaining high-quality software solutions that power our platform.`,
    
    aboutRole: `As a ${title} at ${company}, you'll work closely with cross-functional teams including product managers, designers, and other engineers to deliver exceptional user experiences. You'll have the opportunity to work on challenging problems at scale and make a real impact on millions of users.`,
    
    responsibilities: [
      'Design and implement scalable, maintainable software solutions',
      'Collaborate with team members on architecture and technical decisions',
      'Write clean, well-tested code following best practices',
      'Participate in code reviews and mentor junior engineers',
      'Contribute to technical documentation and knowledge sharing',
      'Stay up-to-date with emerging technologies and industry trends',
      'Work with product teams to understand requirements and deliver solutions',
      'Optimize application performance and scalability',
      'Debug and resolve technical issues in production',
      'Participate in on-call rotation for critical systems',
    ],
    
    aboutCompany: `${company} is a leading technology company that's transforming the way people work and live. We're committed to building innovative products that solve real problems and make a positive impact on the world. Join us in building the future!`,
    
    culture: 'We foster a culture of innovation, collaboration, and continuous learning. Our team is diverse, inclusive, and passionate about what we do. We believe in work-life balance and provide the tools and support you need to succeed.',
    
    techStack: stack,
  };
}

function generateRequirements(experienceLevel, stack) {
  const yearsMap = {
    'Entry Level': '0-2',
    'Mid Level': '3-5',
    'Senior': '5-8',
    'Lead': '8-12',
    'Principal': '12+',
  };

  return [
    `${yearsMap[experienceLevel]} years of professional software development experience`,
    `Strong proficiency in ${stack[0]} and ${stack[1]}`,
    `Experience with ${stack[2]} and cloud platforms`,
    'Bachelor\'s degree in Computer Science or equivalent experience',
    'Strong understanding of software design patterns and principles',
    'Experience with agile development methodologies',
    'Excellent problem-solving and debugging skills',
    'Strong written and verbal communication skills',
  ];
}

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

async function seedJobs() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const jobsCollection = db.collection('jobs');

    // Clear existing jobs
    await jobsCollection.deleteMany({});
    console.log('Cleared existing jobs');

    const jobs = [];
    const now = new Date();

    // Generate 120 jobs
    for (let i = 0; i < 120; i++) {
      const company = companies[i % companies.length];
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const employmentType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
      const experienceLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
      const stack = techStacks[Math.floor(Math.random() * techStacks.length)];
      const salaryRange = generateSalaryRange(experienceLevel);
      
      // Random date within last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const postedDate = new Date(now);
      postedDate.setDate(postedDate.getDate() - daysAgo);

      const description = generateJobDescription(title, company.name, stack);
      
      const job = {
        title,
        company: company.name,
        companyLogo: company.logo,
        location,
        locationType: location.includes('Remote') ? 'remote' : location.includes('Hybrid') ? 'hybrid' : 'onsite',
        employmentType,
        experienceLevel,
        
        // Detailed description fields
        summary: description.summary,
        aboutRole: description.aboutRole,
        responsibilities: description.responsibilities,
        aboutCompany: description.aboutCompany,
        culture: description.culture,
        
        requirements: generateRequirements(experienceLevel, stack),
        skills: stack,
        salary: {
          min: salaryRange.min,
          max: salaryRange.max,
          currency: 'USD',
          period: 'year',
        },
        benefits: benefits.slice(0, Math.floor(Math.random() * 5) + 5),
        industry: company.industry,
        applicants: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 1000) + 100,
        postedDate,
        expiryDate: new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from posted
        status: 'active',
        isRemote: location.includes('Remote'),
        isHybrid: location.includes('Hybrid'),
        visaSponsorship: Math.random() > 0.5,
        
        // Contact info
        contactEmail: `careers@${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
        applicationUrl: `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com/careers`,
        
        createdAt: postedDate,
        updatedAt: now,
      };

      jobs.push(job);
    }

    // Insert all jobs
    const result = await jobsCollection.insertMany(jobs);
    console.log(`✅ Successfully inserted ${result.insertedCount} jobs`);

    // Create indexes for better query performance
    await jobsCollection.createIndex({ title: 'text', description: 'text', company: 'text' });
    await jobsCollection.createIndex({ location: 1 });
    await jobsCollection.createIndex({ experienceLevel: 1 });
    await jobsCollection.createIndex({ skills: 1 });
    await jobsCollection.createIndex({ postedDate: -1 });
    await jobsCollection.createIndex({ status: 1 });
    console.log('✅ Created indexes');

    // Print summary
    console.log('\n📊 Jobs Summary:');
    const summary = await jobsCollection.aggregate([
      {
        $group: {
          _id: '$company',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]).toArray();

    console.log('\nTop 10 Companies by Job Count:');
    summary.forEach((item) => {
      console.log(`  ${item._id}: ${item.count} jobs`);
    });

  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the seed script
seedJobs();

