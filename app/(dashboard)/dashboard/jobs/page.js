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
    experience: []
  });

  useEffect(() => {
    fetchJobs();
  }, [session, categoryFilter, sidebarFilters, searchLocation]); // Fetch when filters change

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const candidateId = session?.user?.candidate_id || session?.user?.id || '3036';

      // Build query string
      const params = new URLSearchParams({
        candidate_id: candidateId,
      });

      // TODO: Implement backend support for these filters
      /*
      if (sidebarFilters.company) params.append('company', sidebarFilters.company);
      if (searchLocation) params.append('location', searchLocation);
      if (categoryFilter) params.append('category', categoryFilter);
      if (sidebarFilters.industry.length) params.append('industries', sidebarFilters.industry.join(','));
      if (sidebarFilters.type.length) params.append('types', sidebarFilters.type.join(','));
      if (sidebarFilters.experience.length) params.append('experience', sidebarFilters.experience.join(','));
      */

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();

      const jobsList = data.recommendations || data.jobs || [];
      setJobs(jobsList);
      setTotalJobs(data.total_count || jobsList.length);

    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <PageHeader
        badge="Market Opportunities"
        badgeIcon={Briefcase}
        title="Total"
        highlight={`${totalJobs.toLocaleString()}+ Jobs`}
        description="Find Jobs, Employment & career Opportunities across the top industries world wide."
      />


      <div className="max-w-7xl mx-auto px-4 relative z-20">
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
              counts={{
                total: totalJobs,
                software: Math.floor(totalJobs * 0.4),
                finance: Math.floor(totalJobs * 0.2),
                management: Math.floor(totalJobs * 0.15),
                advertising: Math.floor(totalJobs * 0.1),
                fulltime: Math.floor(totalJobs * 0.6),
                parttime: Math.floor(totalJobs * 0.2),
                contract: Math.floor(totalJobs * 0.15)
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
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Matches Found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {jobs.map((job, idx) => (
                  <div key={job.requirement_id || idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fadeIn">
                    <JobCard
                      job={job}
                      onClick={() => router.push(`/dashboard/browse-jobs/${job.requirement_id}?source_id=${job.source_id || 1}`)}
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
