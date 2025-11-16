'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Building2, 
  Users, Eye, CheckCircle, Globe, Award, Heart 
} from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

export default function JobDetailsPage({ params }) {
  const router = useRouter();
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
    setApplying(true);
    try {
      // Get user from localStorage
      const stored = localStorage.getItem('user');
      if (!stored) {
        toast.error('Please sign in to apply');
        router.push('/');
        return;
      }

      const user = JSON.parse(stored);

      const response = await fetch('/api/applications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          applicantId: user.id,
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
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Jobs</span>
      </button>

      {/* Job Header */}
      <GlassPanel>
        <div className="flex gap-6">
          {/* Company Logo */}
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-16 h-16 object-contain" />
              ) : (
                <Building2 className="w-10 h-10 text-slate-400" />
              )}
            </div>
          </div>

          {/* Job Title & Meta */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
            <p className="text-xl text-slate-600 mb-4">{job.company}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
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
                <span>Posted {getTimeAgo(job.postedDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{job.views} views</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
                {job.experienceLevel}
              </span>
              {job.visaSponsorship && (
                <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Visa Sponsorship
                </span>
              )}
              {job.isRemote && (
                <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                  Remote
                </span>
              )}
              {job.isHybrid && (
                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200">
                  Hybrid
                </span>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={handleApply}
              loading={applying}
              className="mb-2"
            >
              Apply Now
            </Button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-slate-600">
              <Heart className="w-4 h-4" />
              Save Job
            </button>
          </div>
        </div>
      </GlassPanel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Summary */}
          <GlassPanel>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Job Summary</h2>
            <p className="text-slate-700 leading-relaxed">{job.summary}</p>
          </GlassPanel>

          {/* About the Role */}
          <GlassPanel>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">About the Role</h2>
            <p className="text-slate-700 leading-relaxed">{job.aboutRole}</p>
          </GlassPanel>

          {/* Responsibilities */}
          <GlassPanel>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>

          {/* Requirements */}
          <GlassPanel>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>

          {/* About Company */}
          <GlassPanel>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">About {job.company}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{job.aboutCompany}</p>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-slate-900 mb-2">Our Culture</h3>
              <p className="text-slate-700 leading-relaxed">{job.culture}</p>
            </div>
          </GlassPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills Required */}
          <GlassPanel>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassPanel>

          {/* Benefits */}
          <GlassPanel>
            <h3 className="font-semibold text-slate-900 mb-4">Benefits & Perks</h3>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>

          {/* Job Details */}
          <GlassPanel>
            <h3 className="font-semibold text-slate-900 mb-4">Job Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500">Industry</span>
                <p className="font-medium text-slate-900">{job.industry}</p>
              </div>
              <div>
                <span className="text-slate-500">Employment Type</span>
                <p className="font-medium text-slate-900">{job.employmentType}</p>
              </div>
              <div>
                <span className="text-slate-500">Experience Level</span>
                <p className="font-medium text-slate-900">{job.experienceLevel}</p>
              </div>
              <div>
                <span className="text-slate-500">Location Type</span>
                <p className="font-medium text-slate-900 capitalize">{job.locationType}</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

