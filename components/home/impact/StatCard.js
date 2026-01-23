'use client';

import { CheckCircle } from 'lucide-react';

export default function StatCard({ stat }) {
    const Icon = stat.icon;

    return (
        <div
            className="group relative"
            style={{
                '--liquid-color-low': `color-mix(in srgb, ${stat.color}, transparent 90%)`,
                '--liquid-color-high': `color-mix(in srgb, ${stat.color}, transparent 75%)`,
                '--glow-color': stat.glow,
            }}
        >
            {/* Card Container */}
            <div
                className="relative flex flex-col h-full rounded-[2rem] overflow-hidden transition-colors duration-500 bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl shadow-2xl"
            >
                {/* 🌊 Liquid Fill Animation Layer */}
                <div className="stellar-liquid-fill" />

                {/* Content Layer (z-10 to stay above liquid) */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Header Pattern Area */}
                    <div className="relative h-36 overflow-hidden">
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                background: `radial-gradient(circle at 70% 30%, ${stat.color}66 0%, transparent 70%)`,
                                backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* Icon/Logo Circle - With Rich Glow */}
                        <div className="absolute top-8 left-8">
                            <div
                                className="rich-icon-glow w-14 h-14 rounded-full flex items-center justify-center border border-white/10"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: `0 0 20px ${stat.glow}`
                                }}
                            >
                                <Icon className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-8 right-8">
                            <span className="text-[10px] font-black tracking-widest uppercase text-white/70 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                                {stat.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 px-8 pb-10">
                        <h3 className="text-xl font-bold text-white mb-1 transition-colors duration-500 group-hover:text-white">{stat.title}</h3>
                        <p className="text-xs text-slate-300 font-medium mb-6 opacity-90 transition-colors duration-500 group-hover:text-white">{stat.label}</p>

                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter transition-shadow duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{stat.value}</span>
                            <span className="text-xs text-slate-300 font-bold ml-2 tracking-widest opacity-60 uppercase">Metrics</span>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4 border-t border-white/5 pt-8">
                            {stat.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                                        <CheckCircle className="w-3 h-3 text-slate-300 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors uppercase tracking-wide">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Glossy Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: stat.color }}
                />
            </div>
        </div>
    );
}
