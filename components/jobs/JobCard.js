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
    const postedAt = getPostedDate(job.created_at || job.datePosted);

    const badgeText = score ? "Recommended" : (job.experienceLevel || jobType || "New");

    return (
        <div
            onClick={onClick}
            className="neu-card group relative p-4 md:p-6 cursor-pointer overflow-hidden"
        >

            {/* Header Section */}
            <div className="flex justify-between items-start gap-4 mb-5">
                <div className="flex gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 neu-icon neu-liquid-fill">
                        <Building2 className="relative w-6 h-6 md:w-7 md:h-7 text-blue-500 group-hover:text-white transition-colors duration-300 z-10" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1 break-all">
                            {title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {comp && <span className="text-sm text-slate-600 font-medium">{comp}</span>}
                            {comp && score && <span className="text-slate-400">•</span>}
                            <MatchScoreBadge score={score} />
                        </div>
                    </div>
                </div>
                <button
                    className="w-10 h-10 neu-icon-btn text-slate-400 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Heart className="w-5 h-5" />
                </button>
            </div>

            {/* Meta Detailed Info - Neumorphic Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Location Pill */}
                {loc && (
                    <div className="neu-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span className="truncate max-w-[150px]">{loc}</span>
                    </div>
                )}

                {/* Pay Rate Pill */}
                {payRate && (
                    <div className="neu-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">{payRate}</span>
                    </div>
                )}

                {/* Remote Option Pill */}
                {remoteOption && (
                    <div className="neu-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span className="text-purple-700">{remoteOption}</span>
                    </div>
                )}

                {/* Posted Date Pill */}
                {postedAt && (
                    <div className="neu-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-cyan-700" />
                        <span className="text-cyan-700">{postedAt}</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                    <span className="neu-badge px-3 py-1 text-xs text-slate-500 uppercase tracking-wider">
                        {badgeText}
                    </span>
                </div>

                <div className="neu-btn px-4 py-2 text-sm flex items-center gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default JobCard;
