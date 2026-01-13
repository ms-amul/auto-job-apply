'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Bookmark,
    Building2,
    ChevronLeft,
    Clock,
    DollarSign,
    Loader2,
    MapPin,
    MousePointer2,
    Share2,
    Shield,
    Sparkles
} from 'lucide-react';

export default function JobDetails({ job, applying, handleApply, onBack }) {
    const formatPayRate = (rate) => {
        if (!rate && rate !== 0) return null;
        return `$${parseFloat(rate).toFixed(2)}`;
    };

    if (!job) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-12 bg-slate-50/50 font-sans"
        >
            {/* Classy sticky header */}
            <header className="sticky top-0 z-5 bg-white/90 backdrop-blur-2xl border-b border-slate-200/40 transition-all duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-primary font-bold transition-all group px-2 py-1 rounded-lg hover:bg-slate-50 text-xs"
                    >
                        <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>Return</span>
                    </button>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="neu-icon-btn w-7 h-7 text-slate-400 hover:text-primary flex items-center justify-center transition-all bg-white border border-slate-200 shadow-sm"
                        >
                            <Share2 className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="neu-icon-btn w-7 h-7 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all bg-white border border-slate-200 shadow-sm"
                        >
                            <Bookmark className="w-3 h-3" />
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Compact Dark Hero Section with Mesh & Radiance */}
            <div className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-br from-slate-900 to-purple-950 rounded-b-xl">
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-6 text-left">
                            {/* Head Section with Radiant Pills */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-wrap items-center gap-2"
                                >
                                    {job.job_type && (
                                        <div className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[9px] font-bold tracking-wider uppercase backdrop-blur-md ring-1 ring-blue-400/10">
                                            {job.job_type}
                                        </div>
                                    )}
                                    {job.remote_option && (
                                        <div className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[9px] font-bold tracking-wider uppercase backdrop-blur-md ring-1 ring-cyan-400/10">
                                            {job.remote_option}
                                        </div>
                                    )}
                                    {job.department && (
                                        <div className="px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-400/20 text-purple-300 text-[9px] font-bold tracking-wider uppercase backdrop-blur-md ring-1 ring-purple-400/10">
                                            {job.department}
                                        </div>
                                    )}
                                </motion.div>

                                <div className="space-y-6">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-tight"
                                    >
                                        {job.job_title}
                                    </motion.h1>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-400 pt-2"
                                    >
                                        <div className="flex items-center gap-3 py-0.5 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-all shadow-inner">
                                                <Building2 className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Employer</span>
                                                <span className="text-base font-bold group-hover:text-white transition-colors leading-tight">{job.client_name}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 py-0.5 transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-all shadow-inner">
                                                <MapPin className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Location</span>
                                                <span className="text-base font-bold group-hover:text-white transition-colors leading-tight">{job.location}</span>
                                            </div>
                                        </div>

                                        {job.pay_rate_to_candidate && (
                                            <div className="flex items-center gap-3 py-0.5 transition-all group">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-all shadow-inner">
                                                    <DollarSign className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Comp</span>
                                                    <span className="text-base font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors leading-tight">
                                                        {formatPayRate(job.pay_rate_to_candidate)}
                                                        <span className="text-xs font-medium text-slate-500 ml-0.5">/hr</span>
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Compact Submission Card with Glowing Corners */}
                        <div className="w-full lg:w-64 shrink-0 mt-4 lg:-mt-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="relative group"
                            >
                                {/* Lil Glow Corners */}
                                <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-blue-500/50 rounded-tl-xl transition-all group-hover:w-6 group-hover:h-6 group-hover:border-blue-400"></div>
                                <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-blue-500/50 rounded-tr-xl transition-all group-hover:w-6 group-hover:h-6 group-hover:border-blue-400"></div>
                                <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-blue-500/50 rounded-bl-xl transition-all group-hover:w-6 group-hover:h-6 group-hover:border-blue-400"></div>
                                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-blue-500/50 rounded-br-xl transition-all group-hover:w-6 group-hover:h-6 group-hover:border-blue-400"></div>

                                <div className="bg-slate-900/10 backdrop-blur-3xl border border-white/5 p-1 rounded-xl shadow-2xl overflow-hidden">
                                    <div className="bg-slate-900/80 rounded-[0.7rem] p-5 space-y-5 relative">
                                        {/* Background radiance for card */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="space-y-1.5 text-left relative z-10">
                                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[7px] font-bold uppercase tracking-widest rounded-md">
                                                <MousePointer2 className="w-2 h-2" />
                                                Direct Submit
                                            </div>
                                            <h3 className="text-sm font-bold text-white tracking-tight">Apply Now</h3>
                                            <p className="text-[10px] text-slate-400 leading-normal">
                                                Send your application directly to {job.client_name || 'the employer'}.
                                            </p>
                                        </div>

                                        <div className="space-y-2 relative z-10">
                                            <motion.button
                                                onClick={handleApply}
                                                disabled={applying}
                                                whileHover={{ y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-blue-600 text-white font-bold text-sm py-2.5 rounded-lg transition-all relative overflow-hidden group/btn shadow-lg shadow-blue-900/20 disabled:opacity-50"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {applying ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <>
                                                            Submit Application
                                                            <motion.div
                                                                animate={{ x: [0, 3, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                            >
                                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ y: -1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-white/5 border border-white/10 text-slate-400 font-bold text-[10px] py-2 rounded-lg transition-all flex items-center justify-center gap-2 group/save"
                                            >
                                                <Bookmark className="w-3 h-3 group-hover/save:scale-110 group-hover/save:text-white transition-all" />
                                                Save For Later
                                            </motion.button>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 relative z-30">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Main Description Area */}
                    <div className="flex-1 space-y-5">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50"
                        >
                            {job.job_description && (
                                <section className="space-y-4">
                                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                        <div className="w-1.5 h-5 bg-primary rounded-full bg-cyan-900 shadow-[0_2px_8px_rgba(13,54,143,0.15)]"></div>
                                        Job Specification
                                    </h3>
                                    <div
                                        className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed font-medium
                                                   [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-5 [&>li]:mb-1.5"
                                        dangerouslySetInnerHTML={{ __html: job.job_description }}
                                    />
                                </section>
                            )}
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="bg-white p-5 rounded-xl border border-slate-200/50 shadow-sm space-y-3 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900">Professional Growth</h4>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Excellent career trajectory in a high-performing team.
                                </p>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="bg-white p-5 rounded-xl border border-slate-200/50 shadow-sm space-y-3 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900">Work Culture</h4>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Inclusive and stable environment focused on excellence.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="lg:w-64 space-y-5">
                        {/* Compact Sidebar Cards - Premium Selection Timeline */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-xl p-5 border border-slate-200/50 shadow-sm space-y-5 overflow-hidden relative"
                        >
                            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                Hiring Journey
                            </h4>

                            <div className="space-y-6 relative">
                                {/* Vertical Progress Line with Animation */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-100">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "40%" }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="w-full bg-gradient-to-b from-blue-500 to-cyan-400"
                                    />
                                </div>

                                {/* Step 1: Submission */}
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    className="relative pl-7 group transition-all"
                                >
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-900 leading-none">Application Submitted</p>
                                    <p className="text-[10px] text-slate-400 mt-1 leading-tight mb-4">Initial data synchronization</p>
                                </motion.div>

                                {/* Step 2: Verification (Current/Active) */}
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    className="relative pl-7 group transition-all"
                                >
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center z-10 shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[11px] font-bold text-blue-600 leading-none">Candidacy Verification</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                                            </span>
                                            <p className="text-[10px] text-slate-500 leading-tight">In-progress review</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Step 3: Interaction */}
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    className="relative pl-7 group transition-all opacity-40"
                                >
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-500 leading-none">Employer Engagement</p>
                                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">Interviews & technical fit</p>
                                </motion.div>

                                {/* Step 4: Finalization */}
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    className="relative pl-7 group transition-all opacity-40"
                                >
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-500 leading-none">Selection Status</p>
                                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">Decision & offer finalization</p>
                                </motion.div>
                            </div>

                            {/* Decorative Sparkle */}
                            <div className="absolute -bottom-2 -right-2 opacity-10 blur-sm pointer-events-none">
                                <Sparkles className="w-12 h-12 text-blue-500" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
