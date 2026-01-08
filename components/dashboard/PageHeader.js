'use client';

import { Sparkles } from 'lucide-react';

import { theme } from '@/utils/theme';

export default function PageHeader({
    title,
    highlight,
    description,
    badge,
    badgeIcon: Icon,
    badgeClassName = "bg-[var(--primary)]/10 text-[var(--primary)]",
    children
}) {
    // Gradient matching the global theme
    const gradient = "from-[var(--primary)] to-[var(--secondary)]";
    return (
        <div className="mb-6 md:mb-10 animate-fadeIn">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    {(badge || Icon) && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${badgeClassName}`}>
                            {Icon && <Icon className="w-3 h-3" />}
                            {badge}
                        </div>
                    )}

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {title} {highlight && <span className={`text-transparent bg-clip-text bg-gradient-to-br ${gradient}`}>{highlight}</span>}
                    </h1>

                    {description && (
                        <p className="text-slate-500 mt-1 max-w-2xl leading-relaxed text-sm font-medium">
                            {description}
                        </p>
                    )}
                </div>

                {children && (
                    <div className="flex flex-wrap items-center gap-3">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
