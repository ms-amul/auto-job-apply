'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Briefcase
} from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import PageHeader from '@/components/dashboard/PageHeader';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  // Data State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);

  // Basic Filters
  const [searchLocation, setSearchLocation] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Advanced Sidebar Filters
  const [sidebarFilters, setSidebarFilters] = useState({
    company: '',
    industry: [],
    type: [],
    type: [],
    experience: []
  });

  // Pay Rate Filter State
  const [payRange, setPayRange] = useState([0, 200]);

  const handleClearAll = () => {
    setSearchLocation('');
    setCategoryFilter('');
    setSidebarFilters({
      company: '',
      industry: [],
      type: [],
      experience: []
    });
    setPayRange([0, 200]);
  };

  // Fetch jobs once on session change (or manual refresh)
  useEffect(() => {
    fetchJobs();
  }, [session]);

  // TODO: Move these filters to API level for better performance with large datasets
  const filteredJobs = React.useMemo(() => {
    return jobs.filter(job => {
      // 1. Company Filter (client_name, company, client)
      const comp = (job.client_name || job.company || job.client || '').toLowerCase();
      if (sidebarFilters.company && !comp.includes(sidebarFilters.company.toLowerCase())) return false;

      // 2. Location Filter
      const loc = (job.location || job.locationType || '').toLowerCase();
      if (searchLocation && !loc.includes(searchLocation.toLowerCase())) return false;

      // 3. Category Filter
      if (categoryFilter) {
        const jobCat = (job.category || '').toLowerCase();
        if (jobCat !== categoryFilter.toLowerCase()) return false;
      }

      // 4. Industry Filter
      if (sidebarFilters.industry?.length > 0) {
        const jobInd = (job.industry || '').toLowerCase();
        const matches = sidebarFilters.industry.some(ind => jobInd.includes(ind.toLowerCase()));
        if (!matches) return false;
      }

      // 5. Job Type Filter (Full Time, Contract, etc.)
      if (sidebarFilters.type?.length > 0) {
        const jobType = (job.job_type || job.type || job.employmentType || '').toLowerCase();
        const matches = sidebarFilters.type.some(t => {
          const tNorm = t.toLowerCase().replace(/\s/g, '');
          const jNorm = jobType.replace(/\s/g, '');
          return jNorm.includes(tNorm) || tNorm.includes(jNorm);
        });
        if (!matches) return false;
      }

      // 6. Experience Filter
      if (sidebarFilters.experience?.length > 0) {
        const jobExp = (job.experienceLevel || '').toLowerCase();
        const matches = sidebarFilters.experience.some(exp => jobExp.includes(exp.toLowerCase()));
        if (!matches) return false;
      }

      // 7. Pay Rate Filter
      const jobPay = parseFloat(job.pay_rate_to_candidate || 0);
      if (jobPay < payRange[0] || jobPay > payRange[1]) return false;

      return true;
    });
  }, [jobs, sidebarFilters, searchLocation, categoryFilter, payRange]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const candidateId = session?.user?.candidate_id || session?.user?.id || '3036';

      // Build query string
      const params = new URLSearchParams({
        candidate_id: candidateId,
      });

      // API currently handles base recommendations; filtering is done in UI
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      
      
      const jobsList = data.job_list || [];
      setJobs(jobsList);
      setTotalJobs(data.total_count || jobsList.length);

    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };
  const handleJobClick = (job) => {
    router.push(`/dashboard/browse-jobs/${job.requirement_id}?source_id=${job.source_id}`);
};
  return (
    <div className="min-h-screen">
      <PageHeader
        badge="Market Opportunities"
        badgeIcon={Briefcase}
        title={filteredJobs.length === totalJobs ? "Total" : "Found"}
        highlight={`${filteredJobs.length} Jobs`}
        description={
          filteredJobs.length === totalJobs
            ? "Find Jobs, Employment & career Opportunities across the top industries world wide."
            : `Showing results matching your current filters out of ${totalJobs} available opportunities.`
        }
      />


      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <JobFilters
              location={searchLocation}
              setLocation={setSearchLocation}
              category={categoryFilter}
              setCategory={setCategoryFilter}
              filters={sidebarFilters}
              setFilters={setSidebarFilters}
              payRange={payRange}
              setPayRange={setPayRange}
              onClearAll={handleClearAll}
              counts={{
                total: totalJobs,
                software: jobs.filter(j => (j.industry || j.category || '').toLowerCase().includes('software')).length || Math.floor(totalJobs * 0.4),
                finance: jobs.filter(j => (j.industry || j.category || '').toLowerCase().includes('finance')).length || Math.floor(totalJobs * 0.2),
                management: jobs.filter(j => (j.industry || j.category || '').toLowerCase().includes('management')).length || Math.floor(totalJobs * 0.15),
                advertising: jobs.filter(j => (j.industry || j.category || '').toLowerCase().includes('advertising')).length || Math.floor(totalJobs * 0.1),
                fulltime: jobs.filter(j => (j.job_type || '').toLowerCase().includes('full')).length || Math.floor(totalJobs * 0.6),
                parttime: jobs.filter(j => (j.job_type || '').toLowerCase().includes('part')).length || Math.floor(totalJobs * 0.2),
                contract: jobs.filter(j => (j.job_type || '').toLowerCase().includes('contract')).length || Math.floor(totalJobs * 0.15)
              }}
            />
          </aside>

          {/* Main Job List */}
          <main className="flex-1">

            {/* Grid of JobCards - Sticking to existing JobCard component */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-64 bg-slate-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Matches Found</h3>
                <p className="text-slate-400 text-sm mt-2">Try adjusting your filters to find more opportunities</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {filteredJobs.map((job, idx) => (
                  <div key={job.requirement_id || idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fadeIn">
                    <JobCard
                      job={job}
                      onClick={() => handleJobClick(job)}
                    />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
