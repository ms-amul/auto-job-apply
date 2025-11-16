/**
 * Retail & E-commerce Jobs Seed Data
 */

const companies = [
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', industry: 'E-commerce' },
  { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com', industry: 'E-commerce Platform' },
  { name: 'Walmart', logo: 'https://logo.clearbit.com/walmart.com', industry: 'Retail' },
  { name: 'Target', logo: 'https://logo.clearbit.com/target.com', industry: 'Retail' },
  { name: 'eBay', logo: 'https://logo.clearbit.com/ebay.com', industry: 'E-commerce' },
  { name: 'Etsy', logo: 'https://logo.clearbit.com/etsy.com', industry: 'E-commerce' },
  { name: 'Instacart', logo: 'https://logo.clearbit.com/instacart.com', industry: 'Grocery Delivery' },
  { name: 'DoorDash', logo: 'https://logo.clearbit.com/doordash.com', industry: 'Food Delivery' },
  { name: 'Wayfair', logo: 'https://logo.clearbit.com/wayfair.com', industry: 'E-commerce' },
  { name: 'Best Buy', logo: 'https://logo.clearbit.com/bestbuy.com', industry: 'Retail' },
];

const jobTitles = [
  'E-commerce Platform Engineer',
  'Retail Systems Developer',
  'Inventory Management Engineer',
  'Shopping Cart Platform Developer',
  'Marketplace Platform Engineer',
  'Fulfillment Systems Engineer',
  'Retail Analytics Engineer',
  'Point of Sale Systems Developer',
  'Supply Chain Software Engineer',
  'Product Catalog Engineer',
  'Recommendation Engine Engineer',
  'Omnichannel Platform Developer',
  'Pricing Engine Developer',
  'Customer Experience Platform Engineer',
  'Retail Mobile App Developer',
];

const locations = [
  'Seattle, WA',
  'San Francisco, CA',
  'New York, NY',
  'Minneapolis, MN',
  'Austin, TX',
  'Remote (US)',
  'Hybrid - Seattle',
  'Hybrid - San Francisco',
  'Bentonville, AR',
  'Boston, MA',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['React', 'Node.js', 'MongoDB', 'AWS'],
  ['Java', 'Spring Boot', 'Elasticsearch', 'Kubernetes'],
  ['Python', 'Django', 'PostgreSQL', 'Redis'],
  ['Vue.js', 'Express', 'MySQL', 'Docker'],
  ['Ruby', 'Rails', 'PostgreSQL', 'Sidekiq'],
  ['Go', 'Microservices', 'GraphQL', 'GCP'],
  ['TypeScript', 'Next.js', 'Prisma', 'Vercel'],
  ['PHP', 'Laravel', 'MySQL', 'Redis'],
  ['React Native', 'Firebase', 'Stripe', 'OneSignal'],
  ['Angular', 'NestJS', 'MongoDB', 'Azure'],
];

const benefits = [
  'Health, Dental, Vision Insurance',
  '401(k) with company match',
  'Generous employee discount',
  'Unlimited PTO',
  'Stock options/RSUs',
  'Remote work options',
  'Professional development budget',
  'Gym membership',
  'Parental leave',
  'Mental health support',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `Join ${company} as a ${title} and help shape the future of retail and e-commerce. Build scalable systems that serve millions of customers and process billions in transactions annually.`,
    
    aboutRole: `As a ${title} at ${company}, you'll work on critical e-commerce platforms and retail systems that power seamless shopping experiences. You'll collaborate with product managers, designers, and engineers to build innovative solutions that delight customers and drive business growth.`,
    
    responsibilities: [
      'Design and build scalable e-commerce platform features',
      'Develop high-performance APIs for web and mobile applications',
      'Implement search, recommendation, and personalization systems',
      'Optimize checkout flow and payment processing',
      'Build inventory management and fulfillment systems',
      'Ensure platform reliability and performance during peak traffic',
      'Integrate with third-party services (payments, shipping, etc.)',
      'Implement A/B testing and analytics frameworks',
      'Participate in on-call rotation for production systems',
      'Stay current with e-commerce trends and best practices',
    ],
    
    aboutCompany: `${company} is a leading retail and e-commerce company committed to providing exceptional customer experiences. We leverage cutting-edge technology to connect customers with products they love and deliver seamless shopping experiences across all channels.`,
    
    culture: 'We foster a culture of customer obsession, innovation, and operational excellence. Our diverse team is passionate about retail technology and committed to continuous improvement. We value work-life balance and invest in employee growth.',
    
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
    `${yearsMap[experienceLevel]} years of software development experience in e-commerce or retail`,
    `Strong proficiency in ${stack[0]} and ${stack[1]}`,
    `Experience with ${stack[2]} and cloud platforms`,
    'Understanding of e-commerce best practices and patterns',
    'Bachelor\'s degree in Computer Science or equivalent experience',
    'Experience with high-traffic, customer-facing applications',
    'Knowledge of payment processing and PCI compliance',
    'Strong understanding of scalability and performance optimization',
    'Excellent problem-solving and communication skills',
  ];
}

function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 85000, max: 125000 },
    'Mid Level': { min: 125000, max: 170000 },
    'Senior': { min: 160000, max: 210000 },
    'Lead': { min: 195000, max: 270000 },
    'Principal': { min: 235000, max: 370000 },
  };
  return ranges[experienceLevel];
}

function generateRetailJobs(count = 30) {
  const jobs = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
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
      category: 'Retail & E-commerce',
      applicants: Math.floor(Math.random() * 200),
      views: Math.floor(Math.random() * 1000) + 150,
      postedDate,
      expiryDate: new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000),
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

  return jobs;
}

module.exports = { generateRetailJobs };

