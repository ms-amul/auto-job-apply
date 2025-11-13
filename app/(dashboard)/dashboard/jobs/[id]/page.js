/**
 * Job Detail Page
 * - Full job information
 * - Apply functionality
 * - Company info
 * - Uses ONLY mock data from /data directory
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Briefcase, MapPin, DollarSign, Clock, Building2, 
  Users, Eye, Calendar, Check, ArrowLeft 
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import jobDetailsData from '@/data/job-details.json';
import { theme } from '@/utils/theme';
import { design } from '@/utils/design';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    // Load job from mock data
    const jobId = params.id;
    const jobDetail = jobDetailsData.jobDetails[jobId];
    
    if (jobDetail) {
      setJob(jobDetail);
    }
    
    setLoading(false);
  }, [params.id]);

  const handleApply = async () => {
    setApplying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Application submitted successfully!');
    setApplying(false);
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Job not found</h2>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      {/* Header Card */}
      <Card className={design.card.neo}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: theme.getAccentGradient(135) }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{job.company}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location} • {job.locationType}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {job.salary}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Eye className="w-3 h-3" />
                {job.views} views
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                {job.applicants} applicants
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            onClick={handleApply}
            loading={applying}
            variant="primary"
            className="whitespace-nowrap"
          >
            Apply Now
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Description */}
          <Card className={design.card.flat}>
            <h2 className="text-base font-semibold mb-3">About the Role</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
          </Card>

          {/* Responsibilities */}
          <Card className={design.card.flat}>
            <h2 className="text-base font-semibold mb-3">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Requirements */}
          <Card className={design.card.flat}>
            <h2 className="text-base font-semibold mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Nice to Have */}
          {job.niceToHave && job.niceToHave.length > 0 && (
            <Card className={design.card.flat}>
              <h2 className="text-base font-semibold mb-3">Nice to Have</h2>
              <ul className="space-y-2">
                {job.niceToHave.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Benefits */}
          <Card className={design.card.flat}>
            <h2 className="text-base font-semibold mb-3">Benefits</h2>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <Badge key={index} variant="success" size="sm">
                  {benefit}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Company Info */}
          <Card className={design.card.flat}>
            <h3 className="text-base font-semibold mb-3">About Company</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Company Name</p>
                <p className="font-medium text-gray-900">{job.companyInfo.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Industry</p>
                <p className="font-medium text-gray-900">{job.companyInfo.industry}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Company Size</p>
                <p className="font-medium text-gray-900">{job.companyInfo.size}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Founded</p>
                <p className="font-medium text-gray-900">{job.companyInfo.founded}</p>
              </div>
              <p className="text-xs text-gray-600 pt-2">
                {job.companyInfo.description}
              </p>
            </div>
          </Card>

          {/* Deadline */}
          <Card className={design.card.flat}>
            <h3 className="text-base font-semibold mb-3">Application Deadline</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {new Date(job.closingDate).toLocaleDateString()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

