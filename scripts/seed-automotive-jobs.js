/**
 * Automotive & Transportation Jobs Seed Data
 */

const companies = [
  { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', industry: 'Automotive' },
  { name: 'Ford', logo: 'https://logo.clearbit.com/ford.com', industry: 'Automotive' },
  { name: 'General Motors', logo: 'https://logo.clearbit.com/gm.com', industry: 'Automotive' },
  { name: 'Toyota', logo: 'https://logo.clearbit.com/toyota.com', industry: 'Automotive' },
  { name: 'BMW', logo: 'https://logo.clearbit.com/bmw.com', industry: 'Automotive' },
  { name: 'Rivian', logo: 'https://logo.clearbit.com/rivian.com', industry: 'Electric Vehicles' },
  { name: 'Lucid Motors', logo: 'https://logo.clearbit.com/lucidmotors.com', industry: 'Electric Vehicles' },
  { name: 'Waymo', logo: 'https://logo.clearbit.com/waymo.com', industry: 'Autonomous Vehicles' },
  { name: 'Cruise', logo: 'https://logo.clearbit.com/getcruise.com', industry: 'Autonomous Vehicles' },
  { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com', industry: 'Transportation' },
];

const jobTitles = [
  'Automotive Software Engineer',
  'Embedded Systems Engineer',
  'Vehicle Systems Developer',
  'Autonomous Vehicle Engineer',
  'Battery Management Software Engineer',
  'ADAS Software Engineer',
  'Vehicle IoT Engineer',
  'Automotive Test Engineer',
  'Infotainment Systems Developer',
  'EV Charging Platform Engineer',
  'Vehicle Connectivity Engineer',
  'Automotive Cybersecurity Engineer',
  'CANbus Software Engineer',
  'Fleet Management Platform Developer',
  'Automotive DevOps Engineer',
];

const locations = [
  'Fremont, CA',
  'Detroit, MI',
  'Austin, TX',
  'Palo Alto, CA',
  'Mountain View, CA',
  'Remote (US)',
  'Hybrid - Detroit',
  'Hybrid - San Francisco',
  'Phoenix, AZ',
  'Seattle, WA',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['C++', 'Embedded Systems', 'AUTOSAR', 'CAN/LIN'],
  ['Python', 'ROS', 'Computer Vision', 'TensorFlow'],
  ['C', 'Real-time OS', 'MISRA C', 'ISO 26262'],
  ['Rust', 'Embedded Linux', 'Automotive Ethernet', 'SOME/IP'],
  ['Java', 'Android Automotive', 'Kotlin', 'MQTT'],
  ['Python', 'Machine Learning', 'Sensor Fusion', 'OpenCV'],
  ['C++', 'Qt', 'QNX', 'Yocto'],
  ['Go', 'Kubernetes', 'Docker', 'IoT Protocols'],
  ['JavaScript', 'React Native', 'BLE', 'WebRTC'],
  ['C#', '.NET', 'Azure IoT', 'SignalR'],
];

const benefits = [
  'Health, Dental, Vision Insurance',
  '401(k) with company match',
  'Generous PTO',
  'Remote work options',
  'Stock options/RSUs',
  'Employee vehicle discount',
  'Professional development budget',
  'Relocation assistance',
  'Parental leave',
  'On-site charging stations',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `Join ${company} as a ${title} and be part of the automotive revolution. Work on cutting-edge vehicle technology that's shaping the future of transportation and sustainable mobility.`,
    
    aboutRole: `As a ${title} at ${company}, you'll develop innovative automotive software solutions, from embedded systems to autonomous driving features. You'll work with cross-functional teams including hardware engineers, designers, and product managers to deliver next-generation vehicle technology.`,
    
    responsibilities: [
      'Design and implement automotive software systems',
      'Develop embedded software for vehicle control systems',
      'Work with automotive communication protocols (CAN, LIN, Ethernet)',
      'Collaborate with hardware teams on system integration',
      'Ensure compliance with automotive safety standards (ISO 26262, ASPICE)',
      'Implement and optimize real-time software systems',
      'Participate in vehicle testing and validation',
      'Debug complex issues in automotive electronic systems',
      'Contribute to continuous improvement of development processes',
      'Stay current with automotive industry trends and technologies',
    ],
    
    aboutCompany: `${company} is a leader in automotive innovation, committed to creating sustainable, intelligent, and safe vehicles. We're transforming the automotive industry through cutting-edge technology and forward-thinking engineering.`,
    
    culture: 'We foster a culture of innovation, collaboration, and excellence. Our diverse team is passionate about revolutionizing transportation and creating a sustainable future. We value work-life balance and invest in our employees\' growth.',
    
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
    `${yearsMap[experienceLevel]} years of automotive software development experience`,
    `Strong proficiency in ${stack[0]} and ${stack[1]}`,
    `Experience with ${stack[2]} and automotive platforms`,
    'Knowledge of automotive safety standards (ISO 26262, Functional Safety)',
    'Bachelor\'s or Master\'s degree in Electrical/Computer Engineering or Computer Science',
    'Understanding of automotive communication protocols',
    'Experience with embedded systems and real-time programming',
    'Strong problem-solving and analytical skills',
    'Excellent teamwork and communication abilities',
  ];
}

function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 90000, max: 130000 },
    'Mid Level': { min: 130000, max: 175000 },
    'Senior': { min: 165000, max: 220000 },
    'Lead': { min: 200000, max: 270000 },
    'Principal': { min: 240000, max: 380000 },
  };
  return ranges[experienceLevel];
}

function generateAutomotiveJobs(count = 30) {
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
      category: 'Automotive & Transportation',
      applicants: Math.floor(Math.random() * 180),
      views: Math.floor(Math.random() * 900) + 100,
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

module.exports = { generateAutomotiveJobs };

