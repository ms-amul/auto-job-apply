'use client';

import React from 'react';
import { Send, Mail, Target, PartyPopper, Search, Briefcase, Palette } from 'lucide-react';
import { theme } from '../../utils/theme';

export default function Animation({ parallaxSpeed = 0 }) {
    return (
        <div
            className="relative hidden lg:block"
            style={{
                transform: `translateY(${parallaxSpeed * -0.3}px)`,
            }}
        >
            <div className="relative w-full h-[600px]">
                {/* Background glow effects */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: theme.getAccentGradient(135), opacity: 0.08, transform: `translate(${parallaxSpeed * 0.1}px, ${parallaxSpeed * 0.15}px)` }}
                    ></div>
                    <div
                        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
                        style={{ background: theme.getAccentGradient(30), opacity: 0.06, transform: `translate(${parallaxSpeed * -0.1}px, ${parallaxSpeed * -0.12}px)` }}
                    ></div>
                </div>

                {/* Main glassmorphic dashboard card - Light Theme */}
                <div
                    className="absolute inset-0 rounded-3xl shadow-2xl p-4 overflow-hidden z-10"
                    style={{
                        transform: `translateY(${parallaxSpeed * 0.05}px)`,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(248, 250, 252, 0.9))',
                        backdropFilter: 'blur(40px)',
                        boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.2)`,
                    }}
                >
                    {/* Premium glass reflection layer */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                    {/* Subtle accent gradient overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ background: theme.getAccentGradient(135) }}></div>

                    {/* Top highlight edge */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

                    <div className="relative z-10">
                        {/* Header with premium styling - Light Theme */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">
                                    Job Applications
                                </h3>
                                <p className="text-xs text-slate-600 font-medium">Real-time automation dashboard</p>
                            </div>
                            <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-400/30"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-sm shadow-yellow-400/30" style={{ animationDelay: '0.3s' }}></div>
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-400/30" style={{ animationDelay: '0.6s' }}></div>
                            </div>
                        </div>

                        {/* Glassmorphic stat cards */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {[
                                { label: 'Applied', value: '127', icon: Send },
                                { label: 'Responses', value: '43', icon: Mail },
                                { label: 'Interviews', value: '12', icon: Target },
                                { label: 'Offers', value: '3', icon: PartyPopper },
                            ].map((stat, i) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`relative rounded-2xl p-5 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300`}
                                        style={{
                                            transform: `translateY(${parallaxSpeed * (0.02 + i * 0.005)}px)`,
                                            background: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(203, 213, 225, 0.5)',
                                            boxShadow: `0 10px 30px -8px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                                        }}
                                    >
                                        {/* Premium glass reflection */}
                                        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                                        {/* Accent overlay */}
                                        <div className="absolute inset-0 opacity-[0.03]" style={{ background: theme.getAccentGradient(135) }}></div>

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden" style={{ background: theme.getAccentGradient(135) }}>
                                                    {/* Inner shine */}
                                                    <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent"></div>
                                                    <IconComponent className="w-4 h-4 text-white relative z-10" strokeWidth={2.5} />
                                                </div>
                                                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Premium progress section - Light Theme */}
                        <div
                            className="relative rounded-2xl p-5 shadow-xl overflow-hidden"
                            style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(203, 213, 225, 0.5)',
                            }}
                        >
                            {/* Premium glass reflection */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-slate-900">Success Rate</span>
                                    <span className="text-2xl font-black bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>68%</span>
                                </div>
                                <div className="relative h-4 bg-gray-200/80 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full shadow-lg animate-progress-hero"
                                        style={{ width: '68%', background: theme.getAccentGradient(90) }}
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 mt-2 font-medium">This week's performance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating glassmorphic job cards with proper z-index */}
                {[
                    { company: 'Google', role: 'Senior Engineer', match: '95%', icon: Search, top: '5%', left: '-12%', delay: '0s', parallax: 0.15 },
                    { company: 'Microsoft', role: 'Product Manager', match: '89%', icon: Briefcase, top: '45%', right: '-12%', delay: '1s', parallax: 0.18 },
                    { company: 'Apple', role: 'Design Lead', match: '92%', icon: Palette, bottom: '8%', left: '-2%', delay: '2s', parallax: 0.12 },
                ].map((job, i) => {
                    const JobIcon = job.icon;
                    return (
                        <div
                            key={i}
                            className="absolute rounded-2xl p-5 w-64 z-20 animate-float transition-all duration-300 overflow-hidden hover:scale-105"
                            style={{
                                top: job.top,
                                bottom: job.bottom,
                                left: job.left,
                                right: job.right,
                                animationDelay: job.delay,
                                transform: `translateY(${parallaxSpeed * job.parallax}px)`,
                                background: 'rgba(255, 255, 255, 0.75)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(203, 213, 225, 0.5)',
                                boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                            }}
                        >
                            {/* Premium glass reflection layer */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden" style={{ background: theme.getAccentGradient(135) }}>
                                        {/* Inner shine effect */}
                                        <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent"></div>
                                        <JobIcon className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-slate-900 truncate">{job.company}</h4>
                                        <p className="text-[10px] text-slate-600 font-medium truncate">{job.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2.5 border-t border-gray-200">
                                    <span
                                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${theme.accentPrimary}15, ${theme.accentSecondary}10)`,
                                            color: theme.accentPrimary,
                                            border: `1px solid ${theme.accentPrimary}30`,
                                        }}
                                    >
                                        {job.match} Match
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium">Just now</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
