/**
 * Education & EdTech Jobs Seed Data
 */

const companies = [
  { name: 'Coursera', logo: 'https://logo.clearbit.com/coursera.org', industry: 'EdTech' },
  { name: 'Udemy', logo: 'https://logo.clearbit.com/udemy.com', industry: 'EdTech' },
  { name: 'Khan Academy', logo: 'https://logo.clearbit.com/khanacademy.org', industry: 'Education' },
  { name: 'Duolingo', logo: 'https://logo.clearbit.com/duolingo.com', industry: 'Language Learning' },
  { name: 'Canvas', logo: 'https://logo.clearbit.com/instructure.com', industry: 'LMS' },
  { name: 'Chegg', logo: 'https://logo.clearbit.com/chegg.com', industry: 'Education' },
  { name: 'Blackboard', logo: 'https://logo.clearbit.com/blackboard.com', industry: 'LMS' },
  { name: 'Pearson', logo: 'https://logo.clearbit.com/pearson.com', industry: 'Education Publishing' },
  { name: 'Age of Learning', logo: 'https://logo.clearbit.com/ageoflearning.com', industry: 'K-12 EdTech' },
  { name: 'Quizlet', logo: 'https://logo.clearbit.com/quizlet.com', industry: 'EdTech' },
];

const jobTitles = [
  'EdTech Platform Engineer',
  'Learning Management System Developer',
  'Education Content Platform Engineer',
  'Student Assessment Platform Developer',
  'Online Learning Platform Engineer',
  'Education Data Analyst',
  'Learning Analytics Engineer',
  'Educational Mobile App Developer',
  'Adaptive Learning Engineer',
  'Education Product Manager',
  'Virtual Classroom Platform Developer',
  'Gamification Engineer',
  'Education AI/ML Engineer',
  'Course Delivery Platform Engineer',
  'Student Information System Developer',
];

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Boston, MA',
  'Austin, TX',
  'Seattle, WA',
  'Remote (US)',
  'Remote (Global)',
  'Hybrid - San Francisco',
  'Hybrid - Boston',
  'Chicago, IL',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  ['Python', 'Django', 'MySQL', 'Docker'],
  ['Vue.js', 'Express', 'MongoDB', 'Azure'],
  ['Ruby', 'Rails', 'PostgreSQL', 'Heroku'],
  ['TypeScript', 'Next.js', 'GraphQL', 'Vercel'],
  ['Swift', 'iOS', 'Firebase', 'CloudKit'],
  ['Kotlin', 'Android', 'Room', 'Retrofit'],
  ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
  ['React Native', 'Redux', 'Firebase', 'WebRTC'],
  ['Angular', 'NestJS', 'PostgreSQL', 'Redis'],
];

const benefits = [
  'Health, Dental, Vision Insurance',
  '401(k) with company match',
  'Unlimited PTO',
  'Remote work flexibility',
  'Stock options/RSUs',
  'Free courses and learning resources',
  'Professional development budget',
  'Student loan assistance',
  'Parental leave',
  'Home office stipend',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `Join ${company} as a ${title} and help transform education through technology. Build innovative learning platforms that empower millions of students and educators worldwide to achieve their educational goals.`,
    
    aboutRole: `As a ${title} at ${company}, you'll design and develop cutting-edge educational technology solutions that make learning accessible, engaging, and effective. You'll work with educators, instructional designers, and engineers to create products that have a meaningful impact on learners of all ages.`,
    
    responsibilities: [
      'Design and build scalable educational platform features',
      'Develop interactive learning experiences and assessment tools',
      'Implement adaptive learning algorithms and personalization',
      'Create engaging gamification and progress tracking systems',
      'Build video streaming and live classroom capabilities',
      'Ensure platform accessibility (WCAG compliance)',
      'Integrate with LMS systems and educational tools',
      'Implement learning analytics and reporting features',
      'Optimize platform performance and user experience',
      'Stay current with educational technology trends and pedagogy',
    ],
    
    aboutCompany: `${company} is a leading educational technology company on a mission to democratize education and make quality learning accessible to everyone. We combine innovative technology with proven pedagogical approaches to create transformative learning experiences.`,
    
    culture: 'We foster a culture of curiosity, collaboration, and impact. Our team is passionate about education and committed to making a difference in learners\' lives. We value diversity, continuous learning, and work-life balance.',
    
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
    `${yearsMap[experienceLevel]} years of software development experience`,
    `Strong proficiency in ${stack[0]} and ${stack[1]}`,
    `Experience with ${stack[2]} and cloud platforms`,
    'Passion for education and improving learning outcomes',
    'Bachelor\'s degree in Computer Science or equivalent experience',
    'Experience building user-facing applications',
    'Understanding of web accessibility standards (WCAG)',
    'Strong UX/UI sensibility and attention to detail',
    'Excellent communication and collaboration skills',
  ];
}

function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 80000, max: 120000 },
    'Mid Level': { min: 120000, max: 160000 },
    'Senior': { min: 150000, max: 200000 },
    'Lead': { min: 180000, max: 250000 },
    'Principal': { min: 220000, max: 340000 },
  };
  return ranges[experienceLevel];
}

function generateEducationJobs(count = 30) {
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
      category: 'Education & EdTech',
      applicants: Math.floor(Math.random() * 120),
      views: Math.floor(Math.random() * 700) + 100,
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

module.exports = { generateEducationJobs };

