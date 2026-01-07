
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    Briefcase, MapPin, DollarSign, Clock, Calendar,
    ChevronLeft, Share2, Bookmark, Building2, Trophy,
    Target, Zap, Globe, Loader2
} from 'lucide-react';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';

export default function JobDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const { requirement_id } = params;
    const source_id = searchParams.get('source_id');

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (requirement_id && source_id) {
            fetchJobDetails();
        }
    }, [requirement_id, source_id]);

    const fetchJobDetails = async () => {
        try {
            const res = await fetch(`/api/recommendations/${requirement_id}?source_id=${source_id}`);

            if (!res.ok) throw new Error("Failed to fetch job details");

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setJob(data);
        } catch (err) {
            console.error(err);
            setError("Job not found or unavailable.");
        } finally {
            setTimeout(() => setLoading(false), 400);
        }
    };

    const handleApply = async () => {
        if (!session?.user) {
            toast.error('Please sign in to apply');
            router.push('/');
            return;
        }

        setApplying(true);
        try {
            const candidateId = session.user.candidate_id || session.user.id;

            const response = await fetch('/api/apply-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cand_id: parseInt(candidateId),
                    requirement_id: parseInt(requirement_id),
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Application submitted successfully!');
                router.push('/dashboard/applications');
            } else {
                toast.error(data.message || 'Failed to submit application');
            }
        } catch (error) {
            console.error('Error applying:', error);
            toast.error('Failed to submit application');
        } finally {
            setApplying(false);
        }
    };

    const formatPayRate = (rate) => {
        if (!rate && rate !== 0) return null;
        return `$${parseFloat(rate).toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <Loader size="lg" text="Loading opportunity..." />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Unavailable</h2>
                    <p className="text-slate-500 mb-6">{error || "This job is no longer available."}</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Jobs
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden pb-12 pt-12 md:pb-24 md:pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative max-w-5xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-6 md:items-start">
                        {/* Logo */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center shrink-0">
                            <Building2 className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{job.job_title}</h1>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-300 text-sm md:text-base mb-8">
                                {job.client_name && (
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-blue-400" />
                                        <span>{job.client_name}</span>
                                    </div>
                                )}
                                {job.location && (
                                    <>
                                        <span className="hidden md:inline w-1 h-1 bg-slate-600 rounded-full"></span>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-purple-400" />
                                            <span>{job.location}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Quick Stats Banner */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
                                {job.pay_rate_to_candidate && (
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Pay Rate</p>
                                        <p className="text-white font-bold flex items-center gap-1">
                                            <DollarSign className="w-4 h-4 text-green-400" />
                                            {formatPayRate(job.pay_rate_to_candidate)}/hr
                                        </p>
                                    </div>
                                )}
                                {job.job_type && (
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Job Type</p>
                                        <p className="text-white font-bold flex items-center gap-1">
                                            <Briefcase className="w-4 h-4 text-blue-400" />
                                            {job.job_type}
                                        </p>
                                    </div>
                                )}
                                {job.remote_option && (
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Work Type</p>
                                        <p className="text-white font-bold flex items-center gap-1">
                                            <Globe className="w-4 h-4 text-orange-400" />
                                            {job.remote_option}
                                        </p>
                                    </div>
                                )}
                                {job.department && (
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Department</p>
                                        <p className="text-white font-bold flex items-center gap-1">
                                            <Target className="w-4 h-4 text-purple-400" />
                                            {job.department}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Column */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">

                        {job.job_description && (
                            <section className="mb-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                    Role Description
                                </h3>
                                <div
                                    className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed marker:text-blue-500"
                                    dangerouslySetInnerHTML={{ __html: job.job_description }}
                                />
                            </section>
                        )}

                        {job.category && (
                            <section>
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                                    Category
                                </h3>
                                <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">
                                    {job.category}
                                </span>
                            </section>
                        )}

                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:w-80 space-y-6">

                        {/* Apply Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4">Interested?</h3>
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all relative overflow-hidden group mb-3 disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {applying ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Applying...
                                        </>
                                    ) : (
                                        <>
                                            Apply Now <ChevronLeft className="w-5 h-5 rotate-180" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                            <button className="w-full bg-white border-2 border-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-colors">
                                Save for Later
                            </button>

                            <div className="mt-6 pt-6 border-t border-gray-50 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Target className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-slate-900">Your Fit</p>
                                        <p className="text-slate-500">Excellent match</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-slate-900">Response Rate</p>
                                        <p className="text-slate-500">Very High</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
