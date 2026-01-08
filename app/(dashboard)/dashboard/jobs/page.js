'use client';

import PageHeader from '@/components/dashboard/PageHeader';
import JobCard from '@/components/jobs/JobCard';
import Loader from '@/components/ui/Loader';
import { theme } from '@/utils/theme';
import { ChevronLeft, ChevronRight, DollarSign, Loader2, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [salaryMinFilter, setSalaryMinFilter] = useState('');
  const [visaSponsorshipFilter, setVisaSponsorshipFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Categories for filter
  const categories = [
    'All Categories',
    'Technology',
    'Medical & Healthcare',
    'Automotive & Transportation',
    'Finance & Fintech',
    'Retail & E-commerce',
    'Education & EdTech',
  ];

  // Debounce search term - smoother with no flashing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load jobs when debounced search term changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      loadJobs();
    }
  }, [debouncedSearchTerm]);

  // Load jobs when other filters change
  useEffect(() => {
    loadJobs();
  }, [currentPage, itemsPerPage, experienceFilter, remoteFilter, categoryFilter, employmentTypeFilter, visaSponsorshipFilter, locationFilter, salaryMinFilter]);

  const loadJobs = async () => {
    // Only show full loading on initial load or page change
    const isInitialLoad = jobs.length === 0 && currentPage === 1;
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setSearchLoading(true);
    }

    try {
      // Build query parameters
      const params = new URLSearchParams({
        limit: itemsPerPage.toString(),
        skip: ((currentPage - 1) * itemsPerPage).toString(),
      });

      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (locationFilter) params.append('location', locationFilter);
      if (experienceFilter) params.append('experienceLevel', experienceFilter);
      if (remoteFilter !== 'all') params.append('remote', remoteFilter);
      if (categoryFilter && categoryFilter !== 'All Categories') params.append('category', categoryFilter);
      if (employmentTypeFilter) params.append('employmentType', employmentTypeFilter);
      if (salaryMinFilter) params.append('salaryMin', salaryMinFilter);
      if (visaSponsorshipFilter !== 'all') params.append('visaSponsorship', visaSponsorshipFilter);

      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setJobs(data.jobs);
        setTotalJobs(data.total);
        setTotalPages(data.totalPages);
      } else {
        toast.error('Failed to load jobs');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setExperienceFilter('');
    setRemoteFilter('all');
    setCategoryFilter('');
    setEmploymentTypeFilter('');
    setSalaryMinFilter('');
    setVisaSponsorshipFilter('all');
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    searchTerm,
    locationFilter,
    experienceFilter,
    remoteFilter !== 'all' && remoteFilter,
    categoryFilter,
    employmentTypeFilter,
    salaryMinFilter,
    visaSponsorshipFilter !== 'all' && visaSponsorshipFilter,
  ].filter(Boolean).length;

  // Reset to page 1 when filters change - smooth transition
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalJobs);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <PageHeader
        title="Browse"
        highlight="Jobs"
        description={
          <span>
            Discover <span className="font-semibold text-blue-600">{totalJobs.toLocaleString()}</span> opportunities from top companies
          </span>
        }
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`group flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${showFilters ? 'neu-pressed text-blue-600' : 'neu-btn text-slate-700 hover:text-blue-600'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">{showFilters ? 'Hide' : 'Show'} Filters</span>
          <span className="sm:hidden">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs font-bold shadow-sm">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </PageHeader>

      {/* Premium Neumorphic Search Bar */}
      <div className="relative">
        <div className={`neu-card flex items-center transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-blue-100' : ''}`}>

          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10 ${isSearchFocused ? 'text-blue-600' : 'text-slate-400'}`} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="neu-input w-full pl-12 pr-12 py-3.5 bg-transparent text-sm md:text-base placeholder:text-slate-400 focus:outline-none border-none shadow-inner"
              style={{ boxShadow: 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff' }}
            />

            {/* Loading indicator */}
            {searchLoading && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            )}

            {/* Clear button */}
            {searchTerm && !searchLoading && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters - Neumorphic Panel */}
      {showFilters && (
        <div className="neu-card p-6 md:p-8 animate-fadeIn">
          <div className="space-y-6">
            {/* Category Pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
                Category
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const isActive = (cat === 'All Categories' && !categoryFilter) || categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(setCategoryFilter)(cat === 'All Categories' ? '' : cat)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${isActive
                        ? 'neu-pressed text-blue-700 bg-blue-50/50'
                        : 'neu-btn text-slate-600 hover:text-blue-600'
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {/* Location */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                  <input
                    type="text"
                    placeholder="City or Remote"
                    value={locationFilter}
                    onChange={(e) => handleFilterChange(setLocationFilter)(e.target.value)}
                    className="neu-input w-full pl-10 pr-4 py-3 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Experience</label>
                <div className="relative">
                  <select
                    value={experienceFilter}
                    onChange={(e) => handleFilterChange(setExperienceFilter)(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Levels</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Principal">Principal</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Remote Type */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Work Type</label>
                <div className="relative">
                  <select
                    value={remoteFilter}
                    onChange={(e) => handleFilterChange(setRemoteFilter)(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Employment Type */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Employment</label>
                <div className="relative">
                  <select
                    value={employmentTypeFilter}
                    onChange={(e) => handleFilterChange(setEmploymentTypeFilter)(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Minimum Salary */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Min Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
                  <input
                    type="number"
                    placeholder="e.g. 100000"
                    value={salaryMinFilter}
                    onChange={(e) => handleFilterChange(setSalaryMinFilter)(e.target.value)}
                    className="neu-input w-full pl-10 pr-4 py-3 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Visa Sponsorship */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 ml-1">Visa Sponsorship</label>
                <div className="relative">
                  <select
                    value={visaSponsorshipFilter}
                    onChange={(e) => handleFilterChange(setVisaSponsorshipFilter)(e.target.value)}
                    className="neu-input w-full px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-sm text-slate-500 font-medium">
                  {activeFiltersCount} filters active
                </span>
                <button
                  onClick={clearAllFilters}
                  className="neu-btn px-6 py-2 text-xs md:text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Count and Items Per Page - Neumorphic Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-sm text-slate-600 pl-2">
          {loading && jobs.length === 0 ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span>Finding matches...</span>
            </span>
          ) : (
            <>
              Showing <span className="font-bold text-slate-900">{startIndex}-{endIndex}</span> of{' '}
              <span className="text-blue-600 font-bold">{totalJobs}</span> jobs
              {searchLoading && jobs.length > 0 && (
                <span className="ml-3 inline-flex items-center gap-1.5 text-blue-500 text-xs font-medium">
                  <Loader2 className="w-3 h-3 animate-spin" /> Updating...
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Per page</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="neu-btn px-4 py-2 text-sm font-semibold text-slate-700 cursor-pointer appearance-none text-center min-w-[80px]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="relative min-h-[400px]">
        {searchLoading && jobs.length > 0 && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 rounded-3xl" />
        )}

        {loading && jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size="lg" text="Curating jobs for you..." />
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onClick={() => {
                  if (typeof router !== 'undefined' && router.push) {
                    router.push(`/dashboard/jobs/${job._id}`);
                  } else {
                    window.location.href = `/dashboard/jobs/${job._id}`;
                  }
                }}
              />
            ))}

            {jobs.length === 0 && !loading && (
              <div className="neu-pressed p-12 text-center rounded-3xl">
                <div className="neu-icon w-16 h-16 mx-auto mb-4 text-slate-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">No matches found</h3>
                <p className="text-slate-500">Try adjusting your search terms or filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 neu-btn px-6 py-2 text-sm font-bold text-blue-600"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls - Neumorphic */}
      {totalPages > 1 && (
        <div className="neu-card mt-8 p-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`neu-btn px-6 py-3 flex items-center gap-2 text-sm font-bold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-slate-700 hover:text-blue-600'}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 px-2 max-w-full">
            {/* Pagination Logic for buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
              })
              .map((page, index, array) => {
                // Add ellipsis logic if needed, but for simplicity here rendering the filtered list
                // Ideally logic to insert '...'
                const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;

                return (
                  <div key={page} className="flex items-center">
                    {showEllipsisBefore && <span className="px-2 text-slate-400">...</span>}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${currentPage === page
                        ? 'neu-pressed text-blue-600 border border-blue-100 shadow-inner'
                        : 'neu-btn text-slate-600 hover:text-blue-600'
                        }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`neu-btn px-6 py-3 flex items-center gap-2 text-sm font-bold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-slate-700 hover:text-blue-600'}`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}


