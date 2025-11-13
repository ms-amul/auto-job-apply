/**
 * Jobs Page - Premium Glassy UI
 * - Clean spacing and layout
 * - Mobile-first responsive
 * - Glassy card design
 * - Professional and powerful
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Filter,
  Plus,
  Building2,
  Calendar,
  TrendingUp,
  ArrowRight,
  Users
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { SectionLoader } from '@/components/ui/Loader';
import jobsData from '@/data/jobs.json';
import recruiterData from '@/data/recruiter-data.json';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.role === 'recruiter') {
        setJobs(recruiterData.recruiterJobs);
      } else {
        setJobs(jobsData.jobs);
      }
    }
    setLoading(false);
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <SectionLoader />;

  if (user?.role === 'recruiter') {
    return <RecruiterJobsView jobs={filteredJobs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  }

  return <ApplicantJobsView jobs={filteredJobs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
}

// ============================================
// APPLICANT VIEW - Glassy & Modern
// ============================================
function ApplicantJobsView({ jobs, searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Find Your Dream Job
          </h1>
          <p className="text-base text-gray-600 mt-2">
            {jobs.length} {jobs.length === 1 ? 'opportunity' : 'opportunities'} available
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
            />
          </div>
          
          {/* Filter Button */}
          <Button 
            variant="outline" 
            className="px-6 py-3.5 flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={() => toast('Advanced filters coming soon!')}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-5">
        {jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <div className="max-w-md mx-auto">
              <div 
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${theme.accentPrimary}15` }}
              >
                <Briefcase className="w-10 h-10" style={{ color: theme.accentPrimary }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
              <p className="text-base text-gray-600">
                Try adjusting your search criteria or check back later for new opportunities
              </p>
            </div>
          </div>
        ) : (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

// ============================================
// RECRUITER VIEW - Professional Dashboard
// ============================================
function RecruiterJobsView({ jobs, searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Manage Job Postings
          </h1>
          <p className="text-base text-gray-600 mt-2">
            {jobs.length} active {jobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>
        
        {/* Post Job Button */}
        <Link href="/dashboard/post-job" className="w-full sm:w-auto">
          <Button 
            variant="primary" 
            className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your job postings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {jobs.length === 0 ? (
          <div className="col-span-full bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <div className="max-w-md mx-auto">
              <div 
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${theme.accentPrimary}15` }}
              >
                <Briefcase className="w-10 h-10" style={{ color: theme.accentPrimary }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs posted yet</h3>
              <p className="text-base text-gray-600 mb-6">
                Start by posting your first job to attract top talent
              </p>
              <Link href="/dashboard/post-job">
                <Button variant="primary" className="px-8 py-3">
                  Post Your First Job
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          jobs.map(job => <RecruiterJobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

// ============================================
// JOB CARD - Applicant View (Glassy & Premium)
// ============================================
function JobCard({ job }) {
  return (
    <Link href={`/dashboard/jobs/${job.id}`}>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Company Logo + Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Logo */}
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-md"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            
            {/* Job Details */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Title */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1.5">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{job.company}</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <InfoChip icon={MapPin} text={job.location} />
                <InfoChip icon={Clock} text={job.type} />
                {job.salary && <InfoChip icon={DollarSign} text={job.salary} />}
                <InfoChip icon={Calendar} text={job.postedDate} />
              </div>

              {/* Tags */}
              {(job.type || job.featured) && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    {job.type}
                  </span>
                  {job.featured && (
                    <span className="px-3 py-1.5 bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Featured
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center">
            <Button 
              variant="outline" 
              className="px-5 py-2.5 flex items-center gap-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============================================
// JOB CARD - Recruiter View (Compact & Clean)
// ============================================
function RecruiterJobCard({ job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`px-3 py-1.5 rounded-xl text-sm font-medium shrink-0 ${
            job.status === 'Active' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-gray-50 text-gray-700 border border-gray-200'
          }`}>
            {job.status}
          </span>
        </div>

        {/* Job Info */}
        <div className="space-y-2.5">
          <InfoChip icon={MapPin} text={job.location} />
          <InfoChip icon={Clock} text={job.type} />
          <InfoChip icon={Calendar} text={`Posted ${job.postedDate}`} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/60"></div>

        {/* Footer - Applicants & Actions */}
        <div className="flex items-center justify-between gap-4">
          {/* Applicant Count */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentPrimary}10` }}
            >
              <Users className="w-6 h-6" style={{ color: theme.accentPrimary }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{job.applicantsCount}</p>
              <p className="text-sm text-gray-600">Applicants</p>
            </div>
          </div>
          
          {/* View Button */}
          <Link href={`/dashboard/jobs/${job.id}`}>
            <Button 
              variant="outline" 
              className="px-5 py-2.5 flex items-center gap-2"
            >
              <span>View</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INFO CHIP - Reusable Component
// ============================================
function InfoChip({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon className="w-4 h-4 shrink-0 text-gray-500" />
      <span className="font-medium">{text}</span>
    </div>
  );
}
