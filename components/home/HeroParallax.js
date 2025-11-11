'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { ArrowRight, Play, Sparkles, Star, Trophy, Rocket, Send, Mail, Target, PartyPopper, Search, Briefcase, Palette } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '../../utils/theme';

export default function HeroParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);
  const { isMobile, isReducedMotion } = useMobile();

  useEffect(() => {
    // Generate fewer particles on mobile
    const particleCount = isMobile ? 5 : 20;
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
        speed: 0.1 + Math.random() * 0.2,
      }))
    );
  }, [isMobile]);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reduce parallax intensity on mobile
  const parallaxSpeed = isMobile ? scrollY * 0.1 : scrollY * 0.5;
  const opacityFade = Math.max(1 - scrollY / 500, 0);
  const shouldAnimate = !isReducedMotion;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 100% 0%, ${theme.accentPrimary}0F, transparent 60%), radial-gradient(1000px 500px at 0% 100%, ${theme.accentSecondary}12, transparent 60%), linear-gradient(180deg, #ffffff, #fafafa)`,
      }}
    >
      {/* Premium layered background with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${theme.accentPrimary}18, transparent 60%)` }}></div>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom left, ${theme.accentSecondary}14, transparent 60%)` }}></div>
        
        {/* Multi-layered floating orbs - reduced on mobile */}
        {!isMobile && (
          <>
            <div 
              className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{ 
                background: theme.getAccentGradient(135),
                opacity: 0.25,
                transform: shouldAnimate ? `translate(${parallaxSpeed * 0.3}px, ${parallaxSpeed * 0.4}px) scale(${1 + scrollY * 0.0001})` : 'none',
              }}
            ></div>
            <div 
              className={`absolute top-40 -right-32 w-[500px] h-[500px] rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{ 
                background: theme.getAccentGradient(45),
                opacity: 0.2,
                transform: shouldAnimate ? `translate(${parallaxSpeed * -0.5}px, ${parallaxSpeed * 0.6}px) scale(${1 + scrollY * 0.00012})` : 'none',
                animationDelay: '1s',
              }}
            ></div>
            <div 
              className={`absolute bottom-20 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{ 
                background: theme.getAccentGradient(180),
                opacity: 0.18,
                transform: shouldAnimate ? `translate(${parallaxSpeed * 0.4}px, ${parallaxSpeed * -0.3}px) scale(${1 + scrollY * 0.00008})` : 'none',
                animationDelay: '2s',
              }}
            ></div>
          </>
        )}

        {/* Enhanced floating particles - fewer on mobile */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `linear-gradient(135deg, ${theme.accentPrimary}66, ${theme.accentSecondary}55)`,
              animation: shouldAnimate ? `float ${particle.duration}s ease-in-out infinite` : 'none',
              animationDelay: `${particle.delay}s`,
              transform: shouldAnimate ? `translateY(${parallaxSpeed * particle.speed}px) translateX(${parallaxSpeed * particle.speed * 0.5}px)` : 'none',
              boxShadow: `0 0 ${4 + Math.random() * 8}px ${theme.accentPrimary}40`,
            }}
          ></div>
        ))}

        {/* Subtle grid overlay - disabled on mobile */}
        {!isMobile && (
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px)',
              transform: shouldAnimate ? `translateY(${parallaxSpeed * 0.1}px)` : 'none',
            }}
          ></div>
        )}
      </div>

      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Left Content - Premium Glass Design */}
          <div 
            className="text-center lg:text-left text-sm"
            style={{
              transform: `translateY(${parallaxSpeed * 0.2}px)`,
              opacity: opacityFade,
            }}
          >
            {/* Premium Glassmorphic Badge */}
            <div 
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full px-3 py-2 mb-4 shadow-xl animate-fadeInUp"
              style={{
                boxShadow: `0 10px 30px -5px ${theme.accentPrimary}4D, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                animationDuration: '1.2s',
                animationDelay: '0.2s',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: theme.accentPrimary }} strokeWidth={2.5} />
              <span className="text-[10px] font-bold bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                AI-Powered Job Applications
              </span>
            </div>

            {/* Enhanced Heading with Parallax */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[1.1] mb-4 animate-fadeInUp tracking-tight"
              style={{
                transform: `translateY(${parallaxSpeed * 0.05}px)`,
                animationDuration: '1.2s',
                animationDelay: '0.4s',
              }}
            >
              Your dream job is{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent drop-shadow-sm" style={{ backgroundImage: theme.getAccentGradient(90) }}>
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
                      <stop offset="0%" stopColor={theme.accentPrimary} />
                      <stop offset="100%" stopColor={theme.accentSecondary} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}away
            </h1>
            
            {/* Enhanced Description */}
            <p 
              className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-2xl mx-auto lg:mx-0 animate-fadeInUp font-medium leading-relaxed" 
              style={{ 
                animationDuration: '1.2s',
                animationDelay: '0.6s',
                transform: `translateY(${parallaxSpeed * 0.08}px)`,
              }}
            >
              Join <span className="font-black bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>2,500+</span> professionals who automated their job search and landed{' '}
              <span className="font-black bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>5x more interviews</span> in half the time.
            </p>

            {/* Premium Glassmorphic Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4 animate-fadeInUp" 
              style={{ 
                animationDuration: '1.2s',
                animationDelay: '0.8s',
                transform: `translateY(${parallaxSpeed * 0.1}px)`,
              }}
            >
              <button 
                className="cursor-pointer relative group text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 shadow-2xl overflow-hidden"
                style={{
                  background: theme.getAccentGradient(90),
                  boxShadow: `0 20px 40px -10px ${theme.accentPrimary}80`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Applying for Free
                  <ArrowRight className="w-5 h-5" />
                </span>
                {/* Glass shine effect */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
              </button>
              
              <button 
                className="cursor-pointer relative bg-white/60 backdrop-blur-xl border-2 border-white/80 text-gray-900 px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 shadow-xl overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Premium Glassmorphic Achievement Badges */}
            <div 
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start animate-fadeInUp" 
              style={{ 
                animationDuration: '1.2s',
                animationDelay: '1s',
                transform: `translateY(${parallaxSpeed * 0.12}px)`,
              }}
            >
              <div 
                className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: `0 10px 25px -5px ${theme.accentPrimary}30, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                }}
              >
                <div className="absolute inset-0 opacity-[0.08]" style={{ background: theme.getAccentGradient(135) }}></div>
                <Trophy className="w-5 h-5 relative z-10" style={{ color: theme.accentPrimary }} strokeWidth={2.5} />
                <span className="font-bold bg-clip-text text-transparent text-sm relative z-10" style={{ backgroundImage: theme.getAccentGradient(90) }}>#1 Product of the Day</span>
              </div>
              
              <div 
                className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: `0 10px 25px -5px ${theme.accentSecondary}30, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                }}
              >
                <div className="absolute inset-0 opacity-[0.08]" style={{ background: theme.getAccentGradient(45) }}></div>
                <Rocket className="w-5 h-5 relative z-10" style={{ color: theme.accentSecondary }} strokeWidth={2.5} />
                <span className="font-bold bg-clip-text text-transparent text-sm relative z-10" style={{ backgroundImage: theme.getAccentGradient(90) }}>#3 Product of the Week</span>
              </div>
            </div>
          </div>

          {/* Right Content - Premium Glassmorphic Dashboard */}
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
                  style={{ background: theme.getAccentGradient(135), opacity: 0.2, transform: `translate(${parallaxSpeed * 0.1}px, ${parallaxSpeed * 0.15}px)` }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
                  style={{ background: theme.getAccentGradient(30), opacity: 0.18, transform: `translate(${parallaxSpeed * -0.1}px, ${parallaxSpeed * -0.12}px)` }}
                ></div>
              </div>

              {/* Main glassmorphic dashboard card */}
              <div 
                className="absolute inset-0 bg-white/75 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/90 p-4 overflow-hidden z-10"
                style={{
                  transform: `translateY(${parallaxSpeed * 0.05}px)`,
                  boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}15`,
                }}
              >
                {/* Premium glass reflection layer */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/20 to-transparent pointer-events-none"></div>
                
                {/* Strong background layer for text readability */}
                <div className="absolute inset-0 bg-white/65 backdrop-blur-xl"></div>
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 20px)'
                }}></div>

                <div className="relative z-10">
                  {/* Header with premium styling */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 mb-1 tracking-tight drop-shadow-sm">
                        Job Applications
                      </h3>
                      <p className="text-sm text-gray-700 font-semibold">Real-time automation dashboard</p>
                    </div>
                    <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 border-2 border-white shadow-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.6s' }}></div>
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
                          className={`relative bg-white/75 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/90 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300`}
                          style={{
                            transform: `translateY(${parallaxSpeed * (0.02 + i * 0.005)}px)`,
                            boxShadow: `0 10px 30px -8px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`,
                          }}
                        >
                          {/* Premium glass reflection */}
                          <div className="absolute inset-0 bg-linear-to-br from-white/50 via-white/20 to-transparent pointer-events-none"></div>
                          
                          {/* Solid background for text readability */}
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                          
                          {/* Accent overlay */}
                          <div className="absolute inset-0 opacity-[0.06]" style={{ background: theme.getAccentGradient(135) }}></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-2">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden" style={{ background: theme.getAccentGradient(135) }}>
                                {/* Inner shine */}
                                <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent"></div>
                                <IconComponent className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
                              </div>
                              <div className="text-4xl font-black text-gray-900 drop-shadow-sm">{stat.value}</div>
                            </div>
                            <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">{stat.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Premium progress section */}
                  <div className="relative bg-white/75 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/90 shadow-xl overflow-hidden">
                    {/* Premium glass reflection */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/50 via-white/20 to-transparent pointer-events-none"></div>
                    
                    {/* Solid background for text readability */}
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-900 drop-shadow-sm">Success Rate</span>
                        <span className="text-2xl font-black bg-clip-text text-transparent drop-shadow-sm" style={{ backgroundImage: theme.getAccentGradient(90) }}>68%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200/80 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                        <div 
                          className="absolute inset-y-0 left-0 rounded-full shadow-lg animate-progress-hero"
                          style={{ width: '68%', background: theme.getAccentGradient(90) }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mt-2 font-semibold">This week's performance</p>
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
                    className="absolute bg-white/20 backdrop-blur-2xl rounded-2xl p-5 border-2 border-white/90 shadow-2xl w-64 z-20 animate-float transition-all duration-300 overflow-hidden"
                    style={{
                      top: job.top,
                      bottom: job.bottom,
                      left: job.left,
                      right: job.right,
                      animationDelay: job.delay,
                      transform: `translateY(${parallaxSpeed * job.parallax}px)`,
                      boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}20`,
                    }}
                  >
                    {/* Premium glass reflection layer */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/30 to-transparent pointer-events-none"></div>
                    
                    {/* Strong opaque background layer for text readability */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden" style={{ background: theme.getAccentGradient(135) }}>
                          {/* Inner shine effect */}
                          <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent"></div>
                          <JobIcon className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base text-gray-900 truncate drop-shadow-sm">{job.company}</h4>
                          <p className="text-xs text-gray-700 font-semibold truncate">{job.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200/60">
                        <span className="text-xs font-bold text-green-700 bg-green-100/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-200/50">
                          {job.match} Match
                        </span>
                        <span className="text-xs text-gray-600 font-bold bg-gray-100/80 px-2.5 py-1 rounded-full">Just now</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </section>
  );
}

