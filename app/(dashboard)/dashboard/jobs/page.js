'use client';

import PageHeader from '@/components/dashboard/PageHeader';
import JobCard from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { PageLoader } from '@/components/ui/Loader';
import Pagination from '@/components/ui/Pagination';
import {
  Briefcase
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  // Data State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);

  // Derived Filter Options State
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    jobTypes: [],
    minPay: 0,
    maxPay: 200
  });

  // Basic Filters
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Advanced Sidebar Filters
  const [sidebarFilters, setSidebarFilters] = useState({
    company: '',
    type: [], // Only keeping type as it's in the data
  });

  // Pay Rate Filter State
  const [payRange, setPayRange] = useState([0, 200]);

  // Pagination State
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClearAll = () => {
    setSearchTitle('');
    setSearchLocation('');
    setCategoryFilter('');
    setSidebarFilters({
      company: '',
      type: [],
    });
    setPayRange([
      Math.floor(filterOptions.minPay),
      Math.ceil(filterOptions.maxPay)
    ]);
    setCurrentPage(1); // Reset page on clear
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTitle, sidebarFilters, searchLocation, categoryFilter, payRange]);

  // Fetch jobs once on session change (or manual refresh)
  useEffect(() => {
    fetchJobs();
  }, [session]);

  const filteredJobs = React.useMemo(() => {
    return jobs.filter(job => {
      // 0. Job Title Filter
      const titleProp = (job.job_title || job.title || '').toLowerCase();
      if (searchTitle && !titleProp.includes(searchTitle.toLowerCase())) return false;

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

      // 4. Job Type Filter (Full Time, Contract, etc.)
      if (sidebarFilters.type?.length > 0) {
        const jobType = (job.job_type || job.type || job.employmentType || '').toLowerCase();
        const matches = sidebarFilters.type.some(t => {
          const tNorm = t.toLowerCase().replace(/\s/g, '');
          const jNorm = jobType.replace(/\s/g, '');
          return jNorm.includes(tNorm) || tNorm.includes(jNorm);
        });
        if (!matches) return false;
      }

      // 5. Pay Rate Filter
      const jobPay = parseFloat(job.pay_rate_to_candidate || 0);
      if (jobPay < payRange[0] || jobPay > payRange[1]) return false;

      return true;
    });
  }, [jobs, sidebarFilters, searchLocation, categoryFilter, payRange, searchTitle]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const candidateId = session?.user?.candidate_id || session?.user?.id || '3036';

      // Build query string
      const params = new URLSearchParams({
        candidate_id: candidateId,
      });

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();

      const jobsList = data.recommendations || data.job_list || [];
      setJobs(jobsList);
      setTotalJobs(data.total_count || jobsList.length);

      // Derive Filters from Data
      if (jobsList.length > 0) {
        // Categories
        const categories = [...new Set(jobsList.map(j => j.category).filter(Boolean))];

        // Job Types
        const jobTypes = [...new Set(jobsList.map(j => j.job_type).filter(Boolean))];

        // Pay Range
        const payRates = jobsList.map(j => parseFloat(j.pay_rate_to_candidate || 0));
        const minPay = Math.floor(Math.min(...payRates));
        const maxPay = Math.ceil(Math.max(...payRates));

        setFilterOptions({
          categories,
          jobTypes,
          minPay,
          maxPay
        });

        // Initialize pay range based on actual data
        setPayRange([minPay, maxPay]);
      }

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

  // Full Page Loader
  if (loading) {
    return <PageLoader text="Finding best matches for you..." />;
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        badge="Market Opportunities"
        badgeIcon={Briefcase}
        title={filteredJobs.length === totalJobs ? "Total" : "Found"}
        highlight={`${filteredJobs.length}+ Jobs`}
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
              title={searchTitle}
              setTitle={setSearchTitle}
              location={searchLocation}
              setLocation={setSearchLocation}
              category={categoryFilter}
              setCategory={setCategoryFilter}
              filters={sidebarFilters}
              setFilters={setSidebarFilters}
              payRange={payRange}
              setPayRange={setPayRange}
              onClearAll={handleClearAll}
              options={filterOptions} // Pass derived options
              counts={{
                total: totalJobs,
                // Dynamic counts could be added here if needed, but for now simple Total is enough as valid options are shown
              }}
            />
          </aside>

          {/* Main Job List */}
          <main className="flex-1">

            {/* Grid of JobCards */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Matches Found</h3>
                <p className="text-slate-400 text-sm mt-2">Try adjusting your filters to find more opportunities</p>
                <button
                  onClick={handleClearAll}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8">
                  {paginatedJobs.map((job, idx) => (
                    <div key={job.requirement_id || idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fadeIn">
                      <JobCard
                        job={job}
                        onClick={() => handleJobClick(job)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
