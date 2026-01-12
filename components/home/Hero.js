'use client';

import { ArrowRight, Play, Rocket, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { theme } from '../../utils/theme';
import Container from '../Container';

export default function Hero() {
  const router = useRouter();
  const handleSignupClick = () => {
    console.log('Button clicked, navigating to /signup');
    router.push('/signup');
  };

  return (
    <section className="pb-12 md:pb-16 pt-20 md:pt-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fadeInUp" style={{ animationDuration: '1s' }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 leading-tight mb-5">
              Your dream job is{' '}
              <span className="relative inline-block">
                one click
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none">
                  <path d="M2 8C50 3 150 3 198 8" stroke={theme.accentPrimary} strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              {' '}away
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              For <span className="font-medium" style={{ color: theme.accentPrimary }}>job seekers</span>, <span className="font-medium" style={{ color: theme.accentPrimary }}>career changers</span>, and <span className="font-medium" style={{ color: theme.accentPrimary }}>professionals</span> who want to apply to hundreds of jobs effortlessly and land interviews faster.
            </p>

            <div className="flex z-10 flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 animate-fadeInUp" style={{ animationDuration: '1s', animationDelay: '0.3s' }}>
              <button
                type="button"
                onClick={handleSignupClick}
                className="group text-white px-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: theme.getAccentGradient(90),
                  boxShadow: `0 15px 30px -8px ${theme.accentPrimary}60`
                }}
              >
                Start Applying for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="group border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-full text-sm font-semibold hover:border-gray-400 hover:bg-white/80 backdrop-blur-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-gray-800" strokeWidth={0} />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start animate-fadeInUp" style={{ animationDuration: '1s', animationDelay: '0.5s' }}>
              <div
                className="relative bg-white/90 backdrop-blur-sm border-2 border-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.04]" style={{ background: theme.getAccentGradient(135) }}></div>
                <Trophy className="w-4 h-4 relative z-10" style={{ color: theme.accentPrimary }} strokeWidth={2.5} />
                <span className="text-xs font-bold relative z-10" style={{ color: theme.accentPrimary }}>#1 Product of the Day</span>
              </div>
              <div
                className="relative bg-white/90 backdrop-blur-sm border-2 border-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.04]" style={{ background: theme.getAccentGradient(135) }}></div>
                <Rocket className="w-4 h-4 relative z-10" style={{ color: theme.accentSecondary }} strokeWidth={2.5} />
                <span className="text-xs font-bold relative z-10" style={{ color: theme.accentPrimary }}>#3 Product of the Week</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Main Profile Image Placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full shadow-xl overflow-hidden" style={{ background: theme.getAccentGradient(135), opacity: 0.12 }}>
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              {/* Floating Feature Card 1 - Quick Apply */}
              <div
                className="absolute top-8 left-0 rounded-2xl animate-float border border-white/10 overflow-hidden hover:scale-105 transition-all duration-500 group/card"
                style={{
                  animationDelay: '0s',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    inset 0 1px 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 0 1px rgba(255, 255, 255, 0.05)
                  `
                }}
              >
                {/* Premium Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="flex items-center gap-3 p-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden"
                    style={{ background: theme.getAccentGradient(135) }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="pr-2">
                    <p className="font-black text-slate-200 text-sm tracking-tight">Apply with one prompt</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 opacity-60">Instant Engine</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 2 - Profile Highlight */}
              <div
                className="absolute top-32 right-0 rounded-2xl animate-float border border-white/10 overflow-hidden hover:scale-105 transition-all duration-500 group/card"
                style={{
                  animationDelay: '0.5s',
                  width: '280px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(50px)',
                  boxShadow: `
                    0 30px 60px -15px rgba(0, 0, 0, 0.6),
                    inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)
                  `
                }}
              >
                <div className="p-5 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full shrink-0 shadow-inner p-0.5 border border-white/10 bg-white/5 relative group-hover/card:border-blue-500/50 transition-colors">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
                        <Rocket className="w-6 h-6 text-blue-400 opacity-40 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-sm tracking-tight uppercase">Alex Johnson</p>
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">Senior Product Design • Google</p>

                      <div className="flex gap-2 mt-3">
                        <span className="text-[9px] bg-white/5 text-slate-300 px-2 py-1 rounded-md font-black border border-white/5 uppercase tracking-tighter">TypeScript</span>
                        <span className="text-[9px] bg-white/5 text-slate-300 px-2 py-1 rounded-md font-black border border-white/5 uppercase tracking-tighter">AI Ops</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] font-black text-blue-400">92%</span>
                      </div>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">Match</p>
                    </div>
                  </div>
                </div>
                {/* Glossy edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Floating Feature Card 3 - Mass Apply */}
              <div
                className="absolute bottom-32 left-4 rounded-2xl animate-float border border-white/10 overflow-hidden hover:scale-105 transition-all duration-500 group/card"
                style={{
                  animationDelay: '1s',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="flex items-center gap-4 p-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden"
                    style={{ background: theme.getAccentGradient(90) }}>
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="pr-4">
                    <p className="font-black text-slate-200 text-sm tracking-tight">Accelerated Submission</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[85%] animate-pulse"></div>
                      </div>
                      <span className="text-[9px] font-black text-orange-500 tracking-widest">128 APPS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 4 - Real-time Search */}
              <div
                className="absolute bottom-8 right-8 rounded-2xl animate-float border border-white/10 overflow-hidden hover:scale-105 transition-all duration-500 group/card"
                style={{
                  animationDelay: '1.5s',
                  width: '300px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(30px)',
                  boxShadow: `
                    0 40px 80px -20px rgba(0, 0, 0, 0.8),
                    inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)
                  `
                }}
              >
                <div className="p-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/5 border border-white/10 shadow-lg">
                      <svg className="w-4 h-4 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-none">Scanning Network</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-xs text-white font-black tracking-tight drop-shadow-md">Senior Developer @ Meta</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Neural activity visualization */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Mobile Feature Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Apply</h3>
              <p className="text-sm text-gray-600">Apply to multiple jobs with one click</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-sm text-gray-600">AI finds the best jobs for your profile</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto Follow-up</h3>
              <p className="text-sm text-gray-600">Automated follow-ups to boost response rates</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Dashboard to monitor all applications</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

