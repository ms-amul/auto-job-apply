'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';

export default function HeroParallax() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxSpeed = scrollY * 0.5;
  const opacityFade = Math.max(1 - scrollY / 500, 0);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-orange-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-linear-to-br from-orange-300 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{ transform: `translateY(${parallaxSpeed * 0.3}px)` }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-72 h-72 bg-linear-to-br from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{ 
            transform: `translateY(${parallaxSpeed * 0.5}px)`,
            animationDelay: '1s',
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-linear-to-br from-blue-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ 
            transform: `translateY(${parallaxSpeed * 0.4}px)`,
            animationDelay: '2s',
          }}
        ></div>

        {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-linear-to-br from-orange-400 to-pink-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateY(${parallaxSpeed * (0.1 + Math.random() * 0.2)}px)`,
            }}
          ></div>
        ))}
      </div>

      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="text-center lg:text-left"
            style={{
              transform: `translateY(${parallaxSpeed * 0.2}px)`,
              opacity: opacityFade,
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2 mb-6 shadow-lg animate-fadeInUp">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">
                AI-Powered Job Applications
              </span>
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight mb-6 animate-fadeInUp">
              Your dream job is{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                  one click
                </span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  height="16" 
                  viewBox="0 0 200 16" 
                  fill="none"
                >
                  <path 
                    d="M2 12C50 6 150 6 198 12" 
                    stroke="url(#gradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F43F5E" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}away
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join <span className="font-bold text-orange-500">2,500+</span> professionals who automated their job search and landed{' '}
              <span className="font-bold text-orange-500">5x more interviews</span> in half the time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button className="group bg-linear-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105">
                Start Applying for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="group bg-linear-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-lg transition-all">
                <span className="text-2xl">🏆</span>
                <span className="text-orange-600 text-sm font-semibold">#1 Product of the Day</span>
              </div>
              <div className="group bg-linear-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-lg transition-all">
                <span className="text-2xl">🚀</span>
                <span className="text-orange-600 text-sm font-semibold">#3 Product of the Week</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div 
            className="relative hidden lg:block"
            style={{
              transform: `translateY(${parallaxSpeed * -0.3}px)`,
            }}
          >
            <div className="relative w-full h-[600px]">
              {/* Main dashboard card */}
              <div className="absolute inset-0 bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-orange-200 to-transparent rounded-full blur-3xl opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Job Applications</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Applied', value: '127', color: 'blue' },
                      { label: 'Responses', value: '43', color: 'green' },
                      { label: 'Interviews', value: '12', color: 'orange' },
                      { label: 'Offers', value: '3', color: 'purple' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-linear-to-r from-orange-500 to-rose-500 h-full rounded-full animate-progress" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">68% match rate this week</p>
                </div>
              </div>

              {/* Floating job cards */}
              {[
                { company: 'Google', role: 'Senior Engineer', match: '95%', top: '10%', left: '-10%', delay: '0s' },
                { company: 'Microsoft', role: 'Product Manager', match: '89%', top: '50%', right: '-10%', delay: '1s' },
                { company: 'Apple', role: 'Design Lead', match: '92%', bottom: '10%', left: '0%', delay: '2s' },
              ].map((job, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-2xl p-4 shadow-xl border border-gray-200 w-56 animate-float"
                  style={{
                    top: job.top,
                    bottom: job.bottom,
                    left: job.left,
                    right: job.right,
                    animationDelay: job.delay,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">{job.company}</h4>
                      <p className="text-xs text-gray-600">{job.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-600">{job.match} Match</span>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 68%; }
        }

        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}

