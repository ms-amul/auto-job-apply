
import React from 'react';

export const JobTags = ({ tags, limit, className = "flex flex-wrap gap-2" }) => {
    if (!tags || tags.length === 0) return null;

    const displayTags = limit ? tags.slice(0, limit) : tags;

    return (
        <div className={className}>
            {displayTags.map((tag, index) => (
                <span
                    key={index}
                    className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium whitespace-nowrap"
                >
                    {tag}
                </span>
            ))}
            {limit && tags.length > limit && (
                <span className="px-2 py-1 text-xs text-slate-400 font-medium">
                    +{tags.length - limit} more
                </span>
            )}
        </div>
    );
};
