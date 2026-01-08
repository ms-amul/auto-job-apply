/**
 * Static Premium Background
 * - Optimized for performance (no animations)
 * - Premium blue and lime accents
 */

'use client';

export default function SidebarBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base gradient - clean */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-blue-50/50" />

            {/* Primary Blue Bubble - Top Right */}
            <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: 'var(--accent)' }}
            />

            {/* Accent Cyan Bubble - Center Left */}
            <div
                className="absolute top-1/3 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ background: 'var(--accent)' }}
            />

            {/* Secondary Dark Bubble - Bottom */}
            <div
                className="absolute bottom-20 -right-5 w-36 h-36 rounded-full blur-3xl opacity-20"
                style={{ background: 'var(--primary)' }}
            />

            {/* Primary Bubble - Bottom Left */}
            <div
                className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-15"
                style={{ background: 'var(--accent)' }}
            />
        </div>
    );
}
