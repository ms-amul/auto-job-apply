/**
 * Medical & Healthcare Jobs Seed Data
 */

const companies = [
  { name: 'Kaiser Permanente', logo: 'https://logo.clearbit.com/kaiserpermanente.org', industry: 'Healthcare' },
  { name: 'Mayo Clinic', logo: 'https://logo.clearbit.com/mayoclinic.org', industry: 'Healthcare' },
  { name: 'Cleveland Clinic', logo: 'https://logo.clearbit.com/clevelandclinic.org', industry: 'Healthcare' },
  { name: 'Johns Hopkins', logo: 'https://logo.clearbit.com/hopkinsmedicine.org', industry: 'Healthcare' },
  { name: 'UnitedHealth Group', logo: 'https://logo.clearbit.com/unitedhealthgroup.com', industry: 'Healthcare' },
  { name: 'CVS Health', logo: 'https://logo.clearbit.com/cvshealth.com', industry: 'Healthcare' },
  { name: 'Pfizer', logo: 'https://logo.clearbit.com/pfizer.com', industry: 'Pharmaceutical' },
  { name: 'Johnson & Johnson', logo: 'https://logo.clearbit.com/jnj.com', industry: 'Healthcare' },
  { name: 'Moderna', logo: 'https://logo.clearbit.com/modernatx.com', industry: 'Biotechnology' },
  { name: 'Teladoc Health', logo: 'https://logo.clearbit.com/teladochealth.com', industry: 'Telehealth' },
];

const jobTitles = [
  'Healthcare Software Engineer',
  'Medical Data Analyst',
  'Clinical Systems Developer',
  'Healthcare IT Specialist',
  'Medical Records Manager',
  'Healthcare Data Engineer',
  'Telehealth Platform Developer',
  'Medical Imaging Software Engineer',
  'EHR Integration Specialist',
  'Healthcare Product Manager',
  'Clinical Data Scientist',
  'Medical Device Software Engineer',
  'Healthcare Security Engineer',
  'Pharmacy Systems Developer',
  'Patient Portal Developer',
];

const locations = [
  'Boston, MA',
  'Rochester, MN',
  'Cleveland, OH',
  'Baltimore, MD',
  'San Francisco, CA',
  'Remote (US)',
  'Hybrid - Boston',
  'Hybrid - San Francisco',
  'New York, NY',
  'Chicago, IL',
];

const employmentTypes = ['Full-time', 'Contract', 'Part-time'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal'];

const techStacks = [
  ['HL7', 'FHIR', 'Epic', 'Cerner'],
  ['Python', 'Healthcare APIs', 'SQL', 'AWS'],
  ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
  ['React', 'Node.js', 'MongoDB', 'Azure Health'],
  ['C#', '.NET', 'MSSQL', 'Azure'],
  ['Vue.js', 'Express', 'MySQL', 'HIPAA Compliance'],
  ['Angular', 'NestJS', 'PostgreSQL', 'Redis'],
  ['Python', 'Django', 'TensorFlow', 'Medical Imaging'],
  ['React Native', 'Firebase', 'GraphQL'],
  ['Swift', 'iOS', 'HealthKit', 'ResearchKit'],
];

const benefits = [
  'Comprehensive Health Insurance',
  '401(k) with company match',
  'Generous PTO',
  'Remote work options',
  'Continuing Medical Education (CME) allowance',
  'Student loan repayment assistance',
  'Professional development budget',
  'Commuter benefits',
  'Parental leave',
  'Mental health support',
];

function generateJobDescription(title, company, stack) {
  return {
    summary: `Join ${company} as a ${title} and help revolutionize healthcare through innovative technology solutions. You'll work on critical systems that directly impact patient care and improve healthcare outcomes.`,
    
    aboutRole: `As a ${title} at ${company}, you'll be at the forefront of healthcare innovation, developing secure, compliant, and user-friendly solutions that healthcare professionals and patients rely on daily. You'll collaborate with clinical staff, product teams, and engineers to deliver high-quality healthcare technology.`,
    
    responsibilities: [
      'Design and develop healthcare software solutions ensuring HIPAA compliance',
      'Integrate with EHR systems (Epic, Cerner, etc.) and healthcare APIs',
      'Collaborate with clinical staff to understand healthcare workflows',
      'Implement secure data handling and patient privacy measures',
      'Participate in code reviews focusing on healthcare standards',
      'Maintain and improve existing healthcare applications',
      'Work with healthcare data standards (HL7, FHIR, DICOM)',
      'Ensure software meets FDA and regulatory requirements',
      'Debug and resolve issues in production healthcare systems',
      'Stay current with healthcare IT regulations and best practices',
    ],
    
    aboutCompany: `${company} is a leading healthcare organization committed to improving patient outcomes through innovative care delivery and cutting-edge technology. We combine world-class medical expertise with advanced technology to provide exceptional care.`,
    
    culture: 'We foster a culture of innovation, compassion, and continuous learning. Our team is diverse, collaborative, and dedicated to making a difference in healthcare. We believe in work-life balance and supporting our employees\' professional growth.',
    
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
    `${yearsMap[experienceLevel]} years of experience in healthcare software development`,
    `Knowledge of ${stack[0]} and ${stack[1]} standards`,
    `Experience with ${stack[2]} and healthcare platforms`,
    'Understanding of HIPAA and healthcare compliance requirements',
    'Bachelor\'s degree in Computer Science, Healthcare IT, or related field',
    'Strong understanding of healthcare data security and privacy',
    'Experience with healthcare interoperability standards',
    'Excellent problem-solving and analytical skills',
    'Strong communication skills with technical and clinical teams',
  ];
}

function generateSalaryRange(experienceLevel) {
  const ranges = {
    'Entry Level': { min: 85000, max: 125000 },
    'Mid Level': { min: 125000, max: 165000 },
    'Senior': { min: 155000, max: 210000 },
    'Lead': { min: 190000, max: 260000 },
    'Principal': { min: 230000, max: 360000 },
  };
  return ranges[experienceLevel];
}

function generateMedicalJobs(count = 30) {
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
      category: 'Medical & Healthcare',
      applicants: Math.floor(Math.random() * 150),
      views: Math.floor(Math.random() * 800) + 100,
      postedDate,
      expiryDate: new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
      isRemote: location.includes('Remote'),
      isHybrid: location.includes('Hybrid'),
      visaSponsorship: Math.random() > 0.5,
      
      // Contact info
      contactEmail: `careers@${company.name.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')}.com`,
      applicationUrl: `https://${company.name.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')}.com/careers`,
      
      createdAt: postedDate,
      updatedAt: now,
    };

    jobs.push(job);
  }

  return jobs;
}

module.exports = { generateMedicalJobs };

