'use client';

import { theme } from '@/utils/theme';

export default function PremiumCard({
    children,
    className = '',
    padding = 'p-5 md:p-6',
    glow = true,
    hover = true
}) {
    return (
        <div className={`relative group ${className}`}>
            {/* Decorative Glows */}
            {glow && (
                <>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
                </>
            )}

            {/* Main Glass Container */}
            <div
                className={`
          relative overflow-hidden rounded-[1.5rem] bg-white/60 backdrop-blur-3xl 
          border border-white/40 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)]
          ${hover ? 'hover:border-white/80 transition-all duration-300' : ''}
        `}
                style={{
                    WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                }}
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-50" />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                {/* Content */}
                <div className={`relative z-10 ${padding}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
