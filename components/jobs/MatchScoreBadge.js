
import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export const MatchScoreBadge = ({ score, size = "sm", className = "" }) => {
    if (!score) return null;

    const sizeClasses = size === "lg" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs";
    const iconSize = size === "lg" ? "w-4 h-4" : "w-3 h-3";

    return (
        <span className={`inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-100 ${sizeClasses} ${className}`}>
            <Sparkles className={`${iconSize} fill-emerald-700`} />
            {score}% Match
        </span>
    );
};
