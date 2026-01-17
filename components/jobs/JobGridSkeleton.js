import React from 'react';

export default function JobGridSkeleton({ count = 4, className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[40vh]" }) {
    return (
        <div className={className}>
            {[...Array(count)].map((_, n) => (
                <div key={n} className="bg-white rounded-2xl p-6 h-64 animate-pulse border border-slate-100/50 shadow-sm">
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
                    <div className="mt-8 flex gap-3">
                        <div className="h-8 bg-slate-100 rounded-lg w-20"></div>
                        <div className="h-8 bg-slate-100 rounded-lg w-20"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
