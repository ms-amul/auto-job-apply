'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function ImpactCTA({ onSignIn }) {
    return (
        <div className="mt-32 md:mt-48 max-w-6xl mx-auto">
            <div
                className="relative rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5"
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(40px)',
                    boxShadow: '0 50px 100px -30px rgba(0,0,0,0.8)',
                }}
            >
                {/* Luminous Core for CTA */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px]" />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-xl text-center lg:text-left">
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Start your <br />
                            <span className="text-slate-400">Nexi Journey.</span>
                        </h3>
                        <p className="text-lg text-slate-300 font-medium mb-10 leading-relaxed">
                            Join 2,500+ professionals accelerating their careers with AI automation.
                            No credit card required.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                ✓ 100 Free Applications
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                ✓ Privacy Encrypted
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full lg:w-[380px]">
                        <button
                            onClick={onSignIn}
                            className="cursor-pointer relative py-6 px-10 rounded-2xl bg-[#f97316] hover:bg-[#ff8533] text-white font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-between"
                        >
                            <span>Choose Success</span>
                            <ArrowRight className="w-6 h-6" />
                        </button>

                        <button
                            className="cursor-pointer py-5 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-white/10 transition-all active:scale-95"
                            onClick={() => {
                                const el = document.getElementById('features');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Features
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
