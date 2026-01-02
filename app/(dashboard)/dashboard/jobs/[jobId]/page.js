'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Building2,
  Users, Eye, CheckCircle, Globe, Award, Heart
} from 'lucide-react';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import { JobTags } from '@/components/jobs/JobTags';

export default function JobDetailsPage({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setJobId(resolvedParams.jobId);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (jobId) {
      loadJobDetails();
    }
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();

      if (data.success) {
        setJob(data.job);
      } else {
        toast.error('Failed to load job details');
        router.push('/dashboard/jobs');
      }
    } catch (error) {
      console.error('Error loading job:', error);
      toast.error('Failed to load job details');
      router.push('/dashboard/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (status === 'unauthenticated' || !session?.user) {
      toast.error('Please sign in to apply');
      router.push('/');
      return;
    }

    setApplying(true);
    try {
      const userId = session.user.id || session.user.candidate_id?.toString();

      const response = await fetch('/api/applications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          applicantId: userId,
          coverLetter: `I am interested in the ${job.title} position at ${job.company}.`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Application submitted successfully!');
        router.push('/dashboard/applications');
      } else {
        toast.error(data.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying:', error);
      toast.error('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading job details..." />
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const formatSalary = (salary) => {
    if (!salary) return null;
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k / ${salary.period}`;
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
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto pb-16 px-4 md:px-6">
      {/* Back Button - Premium */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Jobs</span>
      </button>

      {/* Job Header - Premium */}
      <div
        className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 relative overflow-hidden"
        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
      >
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Company Logo */}
          <div className="shrink-0">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shadow-md"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
            >
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              ) : (
                <Building2 className="w-10 h-10 md:w-12 md:h-12 text-slate-400" />
              )}
            </div>
          </div>

          {/* Job Title & Meta */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
              {job.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-semibold mb-4">{job.company}</p>

            {/* Meta Info - Clean Pills with Glow */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
              {/* Location Pill */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">{job.location}</span>
              </div>

              {/* Employment Type Pill */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(147, 51, 234, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">{job.employmentType}</span>
              </div>

              {/* Salary Pill - Special Green Glow */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.1)';
                }}
              >
                <DollarSign className="w-4 h-4 text-green-500 group-hover:text-green-600 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-bold text-green-700 whitespace-nowrap">{formatSalary(job.salary)}</span>
              </div>

              {/* Posted Time Pill */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(249, 115, 22, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <Clock className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">{getTimeAgo(job.postedDate)}</span>
              </div>

              {/* Applicants Pill */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <Users className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">{job.applicants} applicants</span>
              </div>

              {/* Views Pill */}
              <div
                className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-pink-300 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(236, 72, 153, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <Eye className="w-4 h-4 text-slate-400 group-hover:text-pink-500 transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">{job.views} views</span>
              </div>
            </div>

            {/* Badges - Enhanced */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-xl text-xs md:text-sm font-semibold border border-emerald-200 shadow-sm">
                {job.experienceLevel}
              </span>
              {job.visaSponsorship && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl text-xs md:text-sm font-semibold border border-purple-200 shadow-sm">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Visa Sponsorship
                </span>
              )}
              {job.isRemote && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-sky-50 to-sky-100 text-sky-700 rounded-xl text-xs md:text-sm font-semibold border border-sky-200 shadow-sm">
                  Remote
                </span>
              )}
              {job.isHybrid && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 rounded-xl text-xs md:text-sm font-semibold border border-indigo-200 shadow-sm">
                  Hybrid
                </span>
              )}
            </div>
          </div>

          {/* Apply Buttons - Mobile Optimized */}
          <div className="w-full md:w-auto md:shrink-0 flex flex-col gap-2">
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-sm md:text-base hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 text-sm md:text-base text-slate-700 font-medium shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95">
              <Heart className="w-4 h-4" />
              Save Job
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Job Summary - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 pl-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Job Summary
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed pl-4">{job.summary}</p>
          </div>

          {/* About the Role - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 pl-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              About the Role
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed pl-4">{job.aboutRole}</p>
          </div>

          {/* Responsibilities - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-green-500"></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 pl-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Key Responsibilities
            </h2>
            <ul className="space-y-3 pl-4">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500"></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 pl-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Requirements
            </h2>
            <ul className="space-y-3 pl-4">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About Company - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500"></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 pl-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              About {job.company}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4 pl-4">{job.aboutCompany}</p>
            <div className="pt-4 border-t border-gray-200 pl-4">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                Our Culture
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{job.culture}</p>
            </div>
          </div>
        </div>

        {/* Sidebar - Premium */}
        <div className="space-y-4 md:space-y-6">
          {/* Skills Required - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden sticky top-4"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base md:text-lg">
              <Award className="w-5 h-5 text-blue-600" />
              Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              <JobTags tags={job.skills} className="flex flex-wrap gap-2" />
            </div>
          </div>

          {/* Benefits - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
            <h3 className="font-bold text-slate-900 mb-4 text-base md:text-lg">Benefits & Perks</h3>
            <ul className="space-y-2.5">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Details - Premium */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <h3 className="font-bold text-slate-900 mb-4 text-base md:text-lg">Job Details</h3>
            <div className="space-y-4 text-xs md:text-sm">
              <div className="pb-3 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Industry</span>
                <p className="font-semibold text-slate-900 mt-1">{job.industry}</p>
              </div>
              <div className="pb-3 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Employment Type</span>
                <p className="font-semibold text-slate-900 mt-1">{job.employmentType}</p>
              </div>
              <div className="pb-3 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Experience Level</span>
                <p className="font-semibold text-slate-900 mt-1">{job.experienceLevel}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Location Type</span>
                <p className="font-semibold text-slate-900 mt-1 capitalize">{job.locationType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

