
'use client';

import PageHeader from '@/components/dashboard/PageHeader';
import JobCard from '@/components/jobs/JobCard';
import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import JobGridSkeleton from '@/components/jobs/JobGridSkeleton';

export default function BrowseJobsPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, [session]);

    const fetchJobs = async () => {
        try {
            const candidateId = session?.user?.candidate_id || session?.user?.id || '';
            const res = await fetch(`/api/recommendations?candidate_id=${candidateId}`);
            const data = await res.json();
            if (data && data.recommendations) {
                setJobs(data.recommendations);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to load recommendations');
        } finally {
            setLoading(false);
        }
    };

    const handleJobClick = (job) => {
        router.push(`/dashboard/job/${job.requirement_id}?source_id=${job.source_id}`);
    };

    return (
        <div className="">
            {/* Decorative Background Elements */}
            <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none -z-10" />

            <div className="">

                {/* Premium Header */}
                <PageHeader
                    badge="AI Powered Matches"
                    badgeIcon={Sparkles}
                    title="Recommended"
                    highlight="Opportunities"
                    description="We've analyzed your profile and found these roles that perfectly match your skills and career goals."
                />

                {/* Job Grid */}
                {loading ? (
                    <JobGridSkeleton />
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No recommendations yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Complete your profile and upload your resume to receive personalized job recommendations.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 gap-y-8">
                        {jobs.map((job, idx) => (
                            <div key={job.requirement_id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fadeIn">
                                <JobCard
                                    job={job}
                                    onClick={() => handleJobClick(job)}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
