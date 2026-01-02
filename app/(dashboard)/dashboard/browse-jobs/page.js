
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Sparkles } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import Loader from '@/components/ui/Loader';
import { theme } from '@/utils/theme';

// --- Premium Job Details Modal with Glassmorphism ---



export default function BrowseJobsPage() {
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            // Small delay for loading aesthetic
            await new Promise(resolve => setTimeout(resolve, 800));
            const res = await fetch('/api/recommendations');
            const data = await res.json();
            if (data && data.recommendations) {
                setJobs(data.recommendations);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
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

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

                {/* Premium Header */}
                <div className="mb-10 animate-fade-in-up">
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

                {/* Categories / Tags Filter */}
                <div className="flex gap-3 overflow-x-auto pb-6 mb-2 no-scrollbar">
                    {['All Matches', 'Most Relevant', 'Newest', 'Remote', '> $100k', 'Easy Apply'].map((tag, i) => (
                        <button
                            key={tag}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${i === 0
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                : 'bg-white text-slate-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 gap-y-8">
                        {jobs.map((job, idx) => (
                            <div key={job.requirement_id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
                                <JobCard
                                    job={job}
                                    onClick={() => handleJobClick(job)}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <style jsx global>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

