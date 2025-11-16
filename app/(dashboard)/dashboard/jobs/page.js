'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, DollarSign, Clock, Building2, Filter } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('all');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error('Failed to load jobs');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = !experienceFilter || job.experienceLevel === experienceFilter;
    const matchesRemote = 
      remoteFilter === 'all' ||
      (remoteFilter === 'remote' && job.isRemote) ||
      (remoteFilter === 'hybrid' && job.isHybrid) ||
      (remoteFilter === 'onsite' && !job.isRemote && !job.isHybrid);

    return matchesSearch && matchesLocation && matchesExperience && matchesRemote;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Jobs</h1>
        <p className="text-slate-600">Discover {jobs.length} opportunities from top companies</p>
      </div>

      {/* Filters */}
      <GlassPanel>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Experience Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
              <option value="Principal">Principal</option>
            </select>

            <select
              value={remoteFilter}
              onChange={(e) => setRemoteFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>

            <Button
              variant="secondary"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setExperienceFilter('');
                setRemoteFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </GlassPanel>

      {/* Results Count */}
      <div className="text-sm text-slate-600">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const router = useRouter();
  
  const formatSalary = (salary) => {
    if (!salary) return null;
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
  };

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <GlassPanel 
      hover 
      className="cursor-pointer" 
      onClick={() => router.push(`/dashboard/jobs/${job._id}`)}
    >
      <div className="flex gap-6">
        {/* Company Logo */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-12 h-12 object-contain" />
            ) : (
              <Building2 className="w-8 h-8 text-slate-400" />
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{job.title}</h3>
              <p className="text-sm text-slate-600">{job.company}</p>
            </div>
            <Button 
              variant="primary" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/jobs/${job._id}`);
              }}
            >
              View Details
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>{job.employmentType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(job.postedDate)}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {job.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-200">
              {job.experienceLevel}
            </span>
            {job.visaSponsorship && (
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium border border-purple-200">
                Visa Sponsorship
              </span>
            )}
            {job.isRemote && (
              <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs font-medium border border-sky-200">
                Remote
              </span>
            )}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
