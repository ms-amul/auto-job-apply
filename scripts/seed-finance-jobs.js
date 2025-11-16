/**
 * Finance & Fintech Jobs Seed Data
 */

const companies = [
  { name: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com', industry: 'Investment Banking' },
  { name: 'JPMorgan Chase', logo: 'https://logo.clearbit.com/jpmorganchase.com', industry: 'Banking' },
  { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', industry: 'Fintech' },
  { name: 'Square', logo: 'https://logo.clearbit.com/squareup.com', industry: 'Fintech' },
  { name: 'Coinbase', logo: 'https://logo.clearbit.com/coinbase.com', industry: 'Cryptocurrency' },
  { name: 'Robinhood', logo: 'https://logo.clearbit.com/robinhood.com', industry: 'Fintech' },
  { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com', industry: 'Payments' },
  { name: 'Visa', logo: 'https://logo.clearbit.com/visa.com', industry: 'Payments' },
  { name: 'Mastercard', logo: 'https://logo.clearbit.com/mastercard.com', industry: 'Payments' },
  { name: 'Plaid', logo: 'https://logo.clearbit.com/plaid.com', industry: 'Fintech' },
];

const jobTitles = [
  'Fintech Software Engineer',
  'Payment Systems Engineer',
  'Blockchain Developer',
  'Trading Platform Engineer',
  'Financial Data Engineer',
  'Risk Management Software Engineer',
  'Banking API Developer',
  'Fraud Detection Engineer',
  'Quantitative Developer',
  'Cryptocurrency Platform Engineer',
  'Wealth Management Platform Developer',
  'Financial Security Engineer',
  'Credit Scoring Platform Engineer',
  'Investment Platform Developer',
  'RegTech Engineer',
];

const locations = [
  'New York, NY',
  'San Francisco, CA',
  'Chicago, IL',
  'Boston, MA',
  'London, UK',
  'Remote (US)',
  'Hybrid - New York',
  'Hybrid - San Francisco',
  'Charlotte, NC',
  'Austin, TX',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL'],
  ['Python', 'Django', 'Pandas', 'AWS'],
  ['C++', 'Low Latency', 'FIX Protocol', 'Linux'],
  ['Go', 'Microservices', 'Redis', 'MongoDB'],
  ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat'],
  ['Rust', 'Blockchain', 'Cryptography', 'Tokio'],
  ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
  ['Python', 'Machine Learning', 'Scikit-learn', 'TensorFlow'],
  ['React', 'TypeScript', 'GraphQL', 'AWS'],
  ['Scala', 'Akka', 'Apache Spark', 'Cassandra'],
];

const benefits = [
  'Comprehensive Health Insurance',
  '401(k) with generous company match',
  'Annual bonus and performance incentives',
  'Stock options/RSUs',
  'Unlimited PTO',
  'Remote work flexibility',
  'Professional certifications (CFA, FRM, etc.)',
  'Learning & Development budget',
  'Commuter benefits',
  'Mental health and wellness programs',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `Join ${company} as a ${title} and build the future of financial technology. Work on mission-critical systems that process billions of dollars in transactions and serve millions of users worldwide.`,
    
    aboutRole: `As a ${title} at ${company}, you'll develop secure, scalable, and high-performance financial systems. You'll work with cutting-edge technologies to solve complex problems in payments, trading, risk management, and financial services. This role offers the opportunity to make a real impact on how people and businesses manage money.`,
    
    responsibilities: [
      'Design and implement secure financial software systems',
      'Build and maintain high-performance trading or payment platforms',
      'Ensure compliance with financial regulations (PCI-DSS, SOC 2, etc.)',
      'Implement fraud detection and risk management systems',
      'Optimize system performance for low-latency operations',
      'Collaborate with quantitative analysts and traders',
      'Participate in on-call rotation for critical financial systems',
      'Write comprehensive tests and documentation',
      'Conduct code reviews focusing on security and reliability',
      'Stay current with fintech trends and regulatory requirements',
    ],
    
    aboutCompany: `${company} is a leading financial technology company transforming how people interact with money. We combine innovative technology with deep financial expertise to deliver exceptional products and services to millions of customers worldwide.`,
    
    culture: 'We foster a culture of excellence, innovation, and integrity. Our team is diverse, collaborative, and committed to building world-class financial products. We value work-life balance and invest heavily in employee development and growth.',
    
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
    `${yearsMap[experienceLevel]} years of software engineering experience in finance or fintech`,
    `Strong proficiency in ${stack[0]} and ${stack[1]}`,
    `Experience with ${stack[2]} and financial systems`,
    'Understanding of financial regulations and compliance requirements',
    'Bachelor\'s or Master\'s degree in Computer Science, Finance, or related field',
    'Experience with high-performance, low-latency systems',
    'Strong understanding of security best practices',
    'Experience with distributed systems and microservices',
    'Excellent problem-solving and analytical skills',
  ];
}

function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 100000, max: 140000 },
    'Mid Level': { min: 140000, max: 190000 },
    'Senior': { min: 180000, max: 240000 },
    'Lead': { min: 220000, max: 300000 },
    'Principal': { min: 270000, max: 420000 },
  };
  return ranges[experienceLevel];
}

function generateFinanceJobs(count = 30) {
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
      category: 'Finance & Fintech',
      applicants: Math.floor(Math.random() * 220),
      views: Math.floor(Math.random() * 1200) + 200,
      postedDate,
      expiryDate: new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
      isRemote: location.includes('Remote'),
      isHybrid: location.includes('Hybrid'),
      visaSponsorship: Math.random() > 0.6,
      
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

module.exports = { generateFinanceJobs };

