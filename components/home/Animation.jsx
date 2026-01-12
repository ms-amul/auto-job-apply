'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, Target, PartyPopper, Search, Briefcase, Palette } from 'lucide-react';
import { theme } from '../../utils/theme';

export default function Animation({ parallaxSpeed = 0 }) {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // Max 20px tilt
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] perspective-1000"
            style={{
                transform: `translateY(${parallaxSpeed * -0.3}px)`,
            }}
        >
            <div
                className="relative w-full h-full transition-transform duration-200 ease-out"
                style={{
                    transform: `rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
                }}
            >
                {/* 1. Background Neural Grid (Elite Subtle) */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg width="100%" height="100%" className="overflow-visible">
                        <defs>
                            <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="rgba(99, 102, 241, 0.2)" />
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#neural-grid)" />

                        {/* Animated Neural Connections */}
                        {[...Array(5)].map((_, i) => (
                            <path
                                key={i}
                                d={`M ${20 + i * 15}% 0 Q ${50 + i * 5}% 50% ${30 + i * 10}% 100%`}
                                fill="none"
                                stroke="rgba(99, 102, 241, 0.1)"
                                strokeWidth="0.5"
                                className="animate-pulse"
                                style={{ animationDelay: `${i * 1.5}s` }}
                            />
                        ))}
                    </svg>
                </div>

                {/* 2. Background Glow Effects */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[100px]"
                        style={{
                            background: theme.getAccentGradient(135),
                            opacity: 0.12,
                            transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`
                        }}
                    ></div>
                    <div
                        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px]"
                        style={{
                            background: theme.getAccentGradient(30),
                            opacity: 0.1,
                            transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)`
                        }}
                    ></div>
                </div>

                {/* 3. Main Glassmorphic Dashboard */}
                <div
                    className="absolute inset-0 rounded-[2.5rem] p-6 overflow-hidden z-10 border border-white/40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
                    style={{
                        transform: `translateZ(50px) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.95))',
                        backdropFilter: 'blur(40px)',
                    }}
                >
                    {/* Elite Shimmer Reflection Layer */}
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] animate-shimmer pointer-events-none" style={{ animationDuration: '6s' }}></div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">
                                    Neural Dashboard
                                </h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Autonomous Sync: Active</p>
                            </div>
                            <div className="flex gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>

                        {/* Glass Stat Cards */}
                        <div className="grid grid-cols-2 gap-5 mb-6">
                            {[
                                { label: 'Applications', value: '1,280', icon: Send, trend: '+12%' },
                                { label: 'Interviews', value: '42', icon: Target, trend: '+5%' },
                            ].map((stat, i) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="relative rounded-3xl p-6 bg-white/40 border border-white/60 shadow-sm hover:scale-[1.02] transition-transform duration-300 group overflow-hidden"
                                    >
                                        {/* Inner Glass Glow */}
                                        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative z-10 flex flex-col gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                                                <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                                    <span className="text-[10px] font-black text-green-600">{stat.trend}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Success Rate Visual */}
                        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-600/20 to-transparent opacity-50"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-black text-indigo-300 uppercase tracking-[0.2em] block mb-1">Efficiency Ratio</span>
                                    <span className="text-4xl font-black text-white tracking-tighter">94.8%</span>
                                </div>
                                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                                    <Zap className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Floating Data Nodes (Parallax Elements) */}
                {[
                    { company: 'Google', role: 'Staff UI/UX', match: '99%', icon: Search, top: '5%', left: '-15%', delay: '0s', z: 120 },
                    { company: 'OpenAI', role: 'AI Architect', match: '98%', icon: Briefcase, bottom: '15%', right: '-15%', delay: '1.5s', z: 150 },
                    { company: 'Apple', role: 'Design Lead', match: '95%', icon: Palette, top: '40%', left: '-20%', delay: '0.7s', z: 80 },
                ].map((job, i) => {
                    const JobIcon = job.icon;
                    return (
                        <div
                            key={i}
                            className="absolute rounded-[2rem] p-5 w-60 z-20 animate-float-subtle overflow-hidden border border-white/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
                            style={{
                                top: job.top,
                                bottom: job.bottom,
                                left: job.left,
                                right: job.right,
                                animationDelay: job.delay,
                                transform: `translateZ(${job.z}px) translate(${mousePos.x * (job.z / 100)}px, ${mousePos.y * (job.z / 100)}px)`,
                                background: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(30px)',
                            }}
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg transform rotate-3">
                                        <JobIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-sm text-slate-900 truncate tracking-tight">{job.company}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate">{job.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                    <span className="text-[10px] font-black px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                                        {job.match} MATCH
                                    </span>
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
                                </div>
                            </div>
                            {/* Glass Scan Effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
