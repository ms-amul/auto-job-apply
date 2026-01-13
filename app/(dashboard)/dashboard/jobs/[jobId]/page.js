'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';
import JobDetails from '@/components/jobs/JobDetails';

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

      /* 
         NOTE: We use /api/applications/create which expect jobId and applicantId.
         We map requirement_id to jobId for consistency with the API expects.
      */
      const response = await fetch('/api/applications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.requirement_id || job._id,
          applicantId: userId,
          coverLetter: `I am interested in the ${job.job_title} position at ${job.client_name}.`,
          status: 'APPLIED'
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
        <Loader size="lg" text="Bringing you the best job details..." />
      </div>
    );
  }

  return (
    <JobDetails
      job={job}
      applying={applying}
      handleApply={handleApply}
      onBack={() => router.back()}
    />
  );
}

