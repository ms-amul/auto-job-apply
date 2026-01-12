'use client';

import { theme } from '@/utils/theme';

export default function ImpactBackground() {
    // Create an array for meteors to simplify the JSX
    const meteors = [
        { top: '-10%', right: '10%', delay: '0s', duration: '3s' },
        { top: '0%', right: '40%', delay: '2.5s', duration: '4s' },
        { top: '10%', right: '5%', delay: '5s', duration: '3.5s' },
        { top: '-5%', right: '60%', delay: '1s', duration: '3s' },
        { top: '20%', right: '20%', delay: '7s', duration: '4.5s' },
        { top: '5%', right: '80%', delay: '4s', duration: '3.2s' },
        { top: '-15%', right: '25%', delay: '9s', duration: '3.8s' },
        { top: '15%', right: '50%', delay: '2s', duration: '4.2s' },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#020617]">
            {/* 🌌 Deep Galactic Nebula Layers */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] nebula-glow bg-blue-900/10 rounded-full"
                style={{ animationDelay: '0s' }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] nebula-glow bg-purple-900/10 rounded-full"
                style={{ animationDelay: '-5s' }}
            />
            <div
                className="absolute top-[20%] right-[10%] w-[50%] h-[50%] nebula-glow bg-indigo-900/5 rounded-full"
                style={{ animationDelay: '-10s' }}
            />

            {/* ⭐ Constant Stars Field */}
            <div className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)',
                    backgroundSize: '100px 100px',
                    backgroundPosition: '20px 20px'
                }}
            />

            {/* 🌠 Falling Meteors */}
            {meteors.map((m, i) => (
                <div
                    key={i}
                    className="shooting-star"
                    style={{
                        top: m.top,
                        right: m.right,
                        animationDelay: m.delay,
                        animationDuration: m.duration,
                    }}
                />
            ))}

            {/* 🎨 Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#0a0a1a]" />

            {/* Subtle light leak at top-right */}
            <div
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-20"
                style={{ background: `radial-gradient(circle, ${theme.accentPrimary}00 0%, ${theme.accentPrimary}40 100%)` }}
            />
        </div>
    );
}
