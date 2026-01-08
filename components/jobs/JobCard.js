'use client';

import React from 'react';
import { Building2, ChevronRight, Heart, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { MatchScoreBadge } from './MatchScoreBadge';

const JobCard = ({ job, onClick }) => {
    // Normalize job data to handle both "recommendations API" (snake_case) and "jobs API" (camelCase)
    const title = job.job_title || job.title;
    const loc = job.location || job.locationType || '';
    const score = job.match_score || null;

    // Handle company name - recommendations API uses client_name
    const comp = job.client_name || job.company || job.client || '';

    // Handle job type
    const jobType = job.job_type || job.type || job.employmentType || '';

    // Handle remote option
    const remoteOption = job.remote_option || '';

    // Handle pay rate - recommendations API uses pay_rate_to_candidate
    let payRate = null;
    if (job.pay_rate_to_candidate) {
        payRate = `$${parseFloat(job.pay_rate_to_candidate).toFixed(2)}/hr`;
    } else if (job.salary_range) {
        payRate = job.salary_range;
    } else if (job.salary) {
        payRate = `$${(job.salary.min / 1000).toFixed(0)}k - $${(job.salary.max / 1000).toFixed(0)}k`;
    }

    // Handle created date
    const getPostedDate = (dateStr) => {
        if (!dateStr) return null;
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // If difference is very small (less than 24 hours), it might show as 0 or 1.
            // We can check equality of dates or just use threshold
            if (diffDays <= 1) return 'New';
            if (diffDays < 7) return `${diffDays}d ago`;
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        } catch (e) { return null; }
    };

    // Check both created_date (recommendations) and datePosted (jobs)
    const postedAt = getPostedDate(job.created_date || job.datePosted);

    const badgeText = score ? "Recommended" : (job.experienceLevel || jobType || "New");

    return (
        <div
            onClick={onClick}
            className="neu-card group relative p-4 md:p-6 cursor-pointer overflow-hidden"
        >
            {/* Accent Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Header Section */}
            <div className="flex justify-between items-start gap-4 mb-5">
                <div className="flex gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        <Building2 className="w-6 h-6 md:w-7 md:h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 break-all">
                            {title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {comp && <span className="text-sm text-slate-700 font-semibold">{comp}</span>}
                            {comp && score && <span className="text-slate-300">•</span>}
                            <MatchScoreBadge score={score} />
                        </div>
                    </div>
                </div>
                <button
                    className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Heart className="w-5 h-5" />
                </button>
            </div>

            {/* Meta Detailed Info - Premium Glass Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
                {/* Location Pill */}
                {loc && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[150px]">{loc}</span>
                    </div>
                )}

                {/* Pay Rate Pill (Glassy Emerald) */}
                {payRate && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50/80 text-emerald-700 border border-emerald-100/50 hover:bg-emerald-100/80 backdrop-blur-sm transition-colors">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{payRate}</span>
                    </div>
                )}

                {/* Job Type Pill (Glassy Blue) */}
                {jobType && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50/50 text-blue-700 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{jobType}</span>
                    </div>
                )}

                {/* Remote Option Pill (Glassy Purple) */}
                {remoteOption && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50/50 text-purple-700 border border-purple-100/50 hover:bg-purple-50 transition-colors">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>{remoteOption}</span>
                    </div>
                )}

                {/* Posted Date Pill (Simple Grey) */}
                {postedAt && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-slate-500 border border-gray-100">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{postedAt}</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
                    <span className="px-2.5 py-1 bg-slate-100 text-xs text-slate-600 rounded-lg font-medium border border-slate-200">
                        {badgeText}
                    </span>
                </div>

                <button className="text-sm font-semibold text-blue-600 group-hover:underline flex items-center gap-1 group/btn transition-all">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
