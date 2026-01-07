'use client';

import React from 'react';
import { Building2, ChevronRight, Heart, MapPin, Briefcase } from 'lucide-react';
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

    const badgeText = score ? "Recommended" : (job.experienceLevel || jobType || "New");

    return (
        <div
            onClick={onClick}
            className="group relative bg-white rounded-2xl p-6 transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer overflow-hidden"
            style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Accent Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        <Building2 className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            {comp && <span className="text-sm text-slate-600 font-medium">{comp}</span>}
                            {comp && score && <span className="text-slate-300">•</span>}
                            <MatchScoreBadge score={score} />
                        </div>
                    </div>
                </div>
                <button
                    className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Heart className="w-5 h-5" />
                </button>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-5">
                {loc && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{loc}</span>
                    </div>
                )}
                {jobType && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span>{jobType}</span>
                    </div>
                )}
                {remoteOption && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>{remoteOption}</span>
                    </div>
                )}
                {payRate && (
                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                        <span>{payRate}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
                    <span className="px-2 py-1 bg-blue-50 text-xs text-blue-600 rounded-md font-medium border border-blue-100">{badgeText}</span>
                </div>

                <button className="text-sm font-semibold text-blue-600 group-hover:underline flex items-center gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
