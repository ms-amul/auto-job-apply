
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Sparkles } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

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
        router.push(`/dashboard/browse-jobs/${job.requirement_id}?source_id=${job.source_id}`);
    };

    return (
        <div className="">
            {/* Decorative Background Elements */}
            <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none -z-10" />

            <div className="py-4">

                {/* Premium Header */}
                <div className="mb-10 animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                                <Sparkles className="w-3 h-3" />
                                AI Powered Matches
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Opportunities</span>
                            </h1>
                            <p className="text-lg text-slate-500 mt-3 max-w-2xl leading-relaxed">
                                We've analyzed your profile and found these roles that perfectly match your skills and career goals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[40vh]">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-white rounded-2xl p-6 h-64 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-slate-100 rounded-xl"></div>
                                    <div className="flex-1 space-y-3 pt-2">
                                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-3">
                                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
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
