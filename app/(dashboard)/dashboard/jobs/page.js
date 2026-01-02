'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, DollarSign, Clock, Building2, Filter, ChevronLeft, ChevronRight, X, SlidersHorizontal, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import JobCard from '@/components/jobs/JobCard';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

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
  const [showFilters, setShowFilters] = useState(true);
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
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto pb-16 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-1">
            Browse Jobs
          </h1>
          <p className="text-slate-600 text-xs md:text-sm">
            Discover <span className="font-semibold text-blue-600">{totalJobs.toLocaleString()}</span> opportunities from top companies
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-sm font-medium text-slate-700 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          style={{
            boxShadow: activeFiltersCount > 0 ? '0 0 20px rgba(59, 130, 246, 0.3)' : undefined,
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">{showFilters ? 'Hide' : 'Show'} Filters</span>
          <span className="sm:hidden">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-semibold shadow-lg">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Premium Search Bar */}
      <div className="relative">
        <div
          className={`relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isSearchFocused
            ? 'border-blue-500/50 shadow-md'
            : 'border-gray-200/80 shadow-sm hover:shadow-md'
            }`}
          style={{
            boxShadow: isSearchFocused
              ? `0 4px 16px ${theme.accentPrimary}15`
              : '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Subtle focus glow */}
          {isSearchFocused && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}05, ${theme.accentSecondary}05)`,
              }}
            />
          )}

          <div className="relative flex items-center">
            <Search
              className={`absolute left-4 w-5 h-5 transition-colors duration-200 z-10 ${searchTerm || isSearchFocused ? 'text-blue-600' : 'text-slate-400'
                }`}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-12 py-4 bg-transparent border-0 focus:outline-none text-sm md:text-base text-slate-900 placeholder:text-slate-400 relative z-10"
            />
            {/* Loading indicator */}
            {searchLoading && (
              <div className="absolute right-4 z-10">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            )}
            {/* Clear button */}
            {searchTerm && !searchLoading && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 z-10 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
              >
                <X className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700" />
              </button>
            )}
          </div>

          {/* Bottom border accent on focus */}
          {isSearchFocused && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-200"
              style={{
                background: theme.getAccentGradient(90),
              }}
            />
          )}
        </div>
      </div>

      {/* Filters - Collapsible - Premium */}
      {showFilters && (
        <div
          className="bg-white border border-gray-100/80 rounded-xl p-4 md:p-6 relative overflow-hidden transition-all duration-200"
          style={{
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Subtle accent border */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: theme.getAccentGradient(90),
              opacity: 0.3
            }}
          />

          <div className="space-y-5">
            {/* Category Pills - Enhanced */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = (cat === 'All Categories' && !categoryFilter) || categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(setCategoryFilter)(cat === 'All Categories' ? '' : cat)}
                      className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${isActive
                        ? 'text-white shadow-md'
                        : 'bg-gray-50 text-slate-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                        }`}
                      style={isActive ? {
                        background: theme.getAccentGradient(135),
                        boxShadow: `0 2px 8px ${theme.accentPrimary}30`
                      } : {}}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Filters Grid - Premium Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {/* Location */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="City or Remote"
                    value={locationFilter}
                    onChange={(e) => handleFilterChange(setLocationFilter)(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Experience</label>
                <select
                  value={experienceFilter}
                  onChange={(e) => handleFilterChange(setExperienceFilter)(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Principal">Principal</option>
                </select>
              </div>

              {/* Remote Type */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Work Type</label>
                <select
                  value={remoteFilter}
                  onChange={(e) => handleFilterChange(setRemoteFilter)(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              {/* Employment Type */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Employment</label>
                <select
                  value={employmentTypeFilter}
                  onChange={(e) => handleFilterChange(setEmploymentTypeFilter)(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              {/* Minimum Salary */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Min Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="number"
                    placeholder="e.g. 100000"
                    value={salaryMinFilter}
                    onChange={(e) => handleFilterChange(setSalaryMinFilter)(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Visa Sponsorship */}
              <div className="group">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Visa Sponsorship</label>
                <select
                  value={visaSponsorshipFilter}
                  onChange={(e) => handleFilterChange(setVisaSponsorshipFilter)(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
            </div>

            {/* Clear Filters - Premium */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs md:text-sm text-slate-600 font-medium">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold mr-2">
                    {activeFiltersCount}
                  </span>
                  {activeFiltersCount === 1 ? 'filter' : 'filters'} active
                </span>
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Count and Items Per Page - Premium */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-gray-100/80">
        <div className="text-xs md:text-sm text-slate-600 font-medium">
          {loading && jobs.length === 0 ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span>Loading jobs...</span>
            </span>
          ) : (
            <>
              Showing <span className="font-bold text-slate-900">{startIndex}-{endIndex}</span> of{' '}
              <span className="font-bold" style={{ color: theme.accentPrimary }}>{totalJobs}</span> jobs
              {searchLoading && jobs.length > 0 && (
                <span className="ml-2 flex items-center gap-1.5 text-blue-600">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-xs">Updating...</span>
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-slate-600 font-medium hidden sm:inline">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm font-medium bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Jobs List - Always visible, loading only affects content */}
      <div className="relative">
        {/* Subtle loading overlay when searching with existing results */}
        {searchLoading && jobs.length > 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-sm text-slate-700 font-medium">Updating results...</span>
            </div>
          </div>
        )}

        {loading && jobs.length === 0 ? (
          <div className="flex items-center justify-center py-16 bg-white rounded-xl border border-gray-100">
            <Loader size="md" text="Loading jobs..." />
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onClick={() => {
                  if (typeof router !== 'undefined' && router.push) {
                    router.push(`/dashboard/jobs/${job._id}`);
                  } else {
                    console.error('Router is missing', router);
                    // Fallback using window location if router fails (last resort)
                    window.location.href = `/dashboard/jobs/${job._id}`;
                  }
                }}
              />
            ))}

            {jobs.length === 0 && !loading && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-slate-600 font-medium">No jobs found matching your criteria</p>
                <p className="text-sm text-slate-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls - Premium */}
      {totalPages > 1 && (
        <div
          className="mt-6 md:mt-8 bg-white rounded-2xl border border-gray-100 p-2 md:p-6"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-slate-700 hover:shadow-md transform hover:scale-105 active:scale-95'
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-sm font-semibold text-slate-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="text-slate-400 px-1">...</span>
                  )}
                </>
              )}

              {/* Page numbers around current page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  return page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage - 2 ||
                    page === currentPage + 1 ||
                    page === currentPage + 2;
                })
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${currentPage === page
                      ? 'text-white shadow-md'
                      : 'text-slate-700 hover:bg-gray-100'
                      }`}
                    style={currentPage === page ? {
                      background: theme.getAccentGradient(135),
                      boxShadow: `0 2px 8px ${theme.accentPrimary}30`
                    } : {}}
                  >
                    {page}
                  </button>
                ))}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="text-slate-400 px-1">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-sm font-semibold text-slate-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-slate-700 hover:shadow-md transform hover:scale-105 active:scale-95'
                }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center mt-4 text-xs md:text-sm text-slate-600 font-medium">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
            <span className="font-bold text-blue-600">{totalPages}</span>
          </div>
        </div>
      )}
    </div>
  );
}


