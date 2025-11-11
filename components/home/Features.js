'use client';

import Container from '../Container';
import { Zap, Bot, Target, Sparkles, Rocket, TrendingUp, Clock, Mail, BarChart3, Shield, RefreshCw, Bell } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '../../utils/theme';

export default function Features() {
  const { isMobile, isReducedMotion } = useMobile();
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Set your preferences and watch AI apply to hundreds of jobs in minutes',
    },
    {
      icon: Bot,
      title: 'AI-Powered Matching',
      description: 'Our AI analyzes job descriptions and matches them perfectly with your profile',
    },
    {
      icon: RefreshCw,
      title: '24/7 Auto-Pilot',
      description: 'Agent runs continuously in the background, scanning and applying to new jobs automatically',
    },
    {
      icon: Target,
      title: 'Smart Profile Matching',
      description: 'Intelligent algorithm matches your profile with job requirements for perfect fit every time',
    },
    {
      icon: Sparkles,
      title: 'Auto Application',
      description: 'Automatically fills out applications, uploads documents, and submits - while you sleep',
    },
    {
      icon: Mail,
      title: 'Instant Notifications',
      description: 'Get real-time email alerts for every application submitted and company response received',
    },
    {
      icon: BarChart3,
      title: 'Live Tracking Dashboard',
      description: 'Monitor all applications, track status changes, and manage responses in one beautiful interface',
    },
    {
      icon: Clock,
      title: 'Save 40+ Hours Weekly',
      description: 'Let automation handle the tedious work while you focus on interview preparation',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Complete control over your job search',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss a follow-up or interview with intelligent notification system',
    },
  ];

  const FeatureCard = ({ feature, keyPrefix }) => {
    const Icon = feature.icon;

    return (
      <div
        key={keyPrefix}
        className={`group relative shrink-0 ${isMobile ? 'w-[280px]' : 'w-80 md:w-[360px]'}`}
      >
        <div className={`
          relative h-full bg-white/5 backdrop-blur-2xl rounded-2xl ${isMobile ? 'p-5' : 'p-6 md:p-8'}
          border border-white/10
          shadow-xl
          transition-all duration-700 ease-out
          transform ${isMobile ? '' : 'hover:-translate-y-2 hover:border-white/20'}
          overflow-hidden
        `}
          style={{
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Premium glass reflection with multiple layers */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-60 rounded-2xl"></div>

          {/* Glass shine top edge */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
          <div className={`absolute top-0 left-1/4 right-1/4 ${isMobile ? 'h-12' : 'h-16'} bg-linear-to-b from-white/10 to-transparent blur-md`}></div>

          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 rounded-2xl"
            style={{ background: theme.getAccentGradient(135) }}>
          </div>

          {/* Enhanced shimmer effect */}
          {!isMobile && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10">
            {/* Premium glassmorphic icon container */}
            <div className={`relative ${isMobile ? 'w-14 h-14 mb-5' : 'w-16 h-16 md:w-18 md:h-18 mb-6'}`}>
              {/* Icon glow backdrop */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 transition-all duration-700"
                style={{ background: theme.getAccentGradient(135) }}
              ></div>

              {/* Glass icon box */}
              <div className={`
                relative w-full h-full
                rounded-2xl
                flex items-center justify-center
                transform ${isMobile ? '' : 'group-hover:scale-110 group-hover:rotate-6'}
                transition-all duration-700
                overflow-hidden
              `}
                style={{
                  background: theme.getAccentGradient(135),
                  boxShadow: `0 10px 25px -5px ${theme.accentPrimary}60, inset 0 1px 0 0 rgba(255, 255, 255, 0.3)`,
                }}
              >
                {/* Glass shine overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent rounded-t-2xl"></div>

                <Icon className={`relative z-10 text-white drop-shadow-lg ${isMobile ? 'w-7 h-7' : 'w-8 h-8 md:w-9 md:h-9'}`} strokeWidth={2.5} />
              </div>
            </div>

            <h3 className={`${isMobile ? 'text-lg mb-2' : 'text-xl md:text-2xl mb-3'} font-black text-white transition-all duration-500 tracking-tight`}>
              {feature.title}
            </h3>

            <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base md:text-lg'} leading-relaxed`}>
              {feature.description}
            </p>
          </div>

          {/* Subtle corner accent glows */}
          {!isMobile && (
            <>
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-2xl"
                style={{ background: theme.getAccentGradient(135) }}>
              </div>

              <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 transition-all duration-700 blur-2xl"
                style={{ background: theme.getAccentGradient(45) }}>
              </div>
            </>
          )}

          {/* Subtle border highlight */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-400/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="features"
      className="relative py-4 md:py-8 overflow-visible"
    >
      {/* Outer container for rounded dark section */}
      <div className={`relative ${isMobile ? 'mx-4' : 'mx-8 md:mx-12 lg:mx-16'} ${isMobile ? 'rounded-3xl' : 'rounded-[3rem]'} overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
        }}
      >
        {/* Premium dark background with mesh gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient mesh */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]"
            style={{
              '--tw-gradient-from': `${theme.accentPrimary}30`,
              '--tw-gradient-to': 'transparent',
            }}
          ></div>
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))]"
            style={{
              '--tw-gradient-from': `${theme.accentSecondary}25`,
              '--tw-gradient-to': 'transparent',
            }}
          ></div>

          {/* Floating orbs - reduced on mobile */}
          {!isMobile && (
            <>
              <div
                className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl ${isReducedMotion ? '' : 'animate-float'}`}
                style={{
                  background: theme.getAccentGradient(135),
                  opacity: 0.15,
                  animationDuration: '8s'
                }}>
              </div>
              <div
                className={`absolute top-40 -right-32 w-[500px] h-[500px] rounded-full blur-3xl ${isReducedMotion ? '' : 'animate-float animation-delay-2000'}`}
                style={{
                  background: theme.getAccentGradient(45),
                  opacity: 0.12,
                  animationDuration: '10s'
                }}>
              </div>
              <div
                className={`absolute bottom-20 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isReducedMotion ? '' : 'animate-float animation-delay-4000'}`}
                style={{
                  background: theme.getAccentGradient(180),
                  opacity: 0.1,
                  animationDuration: '12s'
                }}>
              </div>
            </>
          )}

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)'
            }}
          ></div>

          {/* Top glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
          <div className={`absolute top-0 left-1/4 right-1/4 ${isMobile ? 'h-20' : 'h-32'} bg-linear-to-b from-white/10 to-transparent blur-xl`}></div>
        </div>

        {/* Inner content with padding */}
        <div className={`relative ${isMobile ? 'py-12' : 'py-20 md:py-32'}`}>

          <Container>
            <div className="relative z-10 text-center lg:text-left mb-12 md:mb-16">
              {/* Premium badge */}
              <div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 mb-6 shadow-xl"
                style={{
                  boxShadow: `0 10px 30px -5px ${theme.accentPrimary}40, inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`,
                }}>
                <Sparkles className="w-4 h-4" style={{ color: theme.accentPrimary }} />
                <span className="text-sm font-bold text-white">
                  AI-Powered Features
                </span>
              </div>

              <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-black mb-4 md:mb-6 tracking-tight`}>
                <span className="text-white">
                  Everything You Need to
                </span>
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                  Land Your Dream Job
                </span>
              </h2>

              <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-300 font-medium ${isMobile ? 'max-w-md' : 'max-w-2xl'} ${isMobile ? 'mx-auto' : 'lg:mx-0'}`}>
                Powerful automation features that work 24/7 to help you{' '}
                <span className="font-bold text-white">
                  apply faster, track smarter,
                </span>
                {' '}and land more interviews.
              </p>
            </div>
          </Container>

          {/* Glassmorphic carousel with corner fade accents */}
          <div className="relative">
            {/* Subtle left corner fade */}
            {!isMobile && (
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
              </div>
            )}

            {/* Subtle right corner fade */}
            {!isMobile && (
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-l from-slate-900 via-slate-900/60 to-transparent"></div>
              </div>
            )}

            {/* Mobile: Horizontal scroll, Desktop: Marquee animation */}
            <div className={`py-4 ${isMobile ? 'overflow-x-auto overflow-y-hidden scrollbar-hide px-4' : 'overflow-hidden'}`}
              style={isMobile ? {
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              } : {}}
            >
              <div
                className={`flex ${isMobile ? 'gap-4' : 'gap-6 md:gap-8'} ${isMobile || isReducedMotion ? '' : 'marquee-container'}`}
                style={isMobile ? {
                  width: 'max-content',
                } : {}}
              >
                {/* First set of features */}
                {features.map((feature, index) => (
                  <FeatureCard key={`first-${index}`} feature={feature} keyPrefix={`first-${index}`} />
                ))}

                {/* Duplicate set for seamless loop - only on desktop */}
                {!isMobile && features.map((feature, index) => (
                  <FeatureCard key={`second-${index}`} feature={feature} keyPrefix={`second-${index}`} />
                ))}
              </div>
            </div>
          </div>

          <Container>
            <div className="relative z-10 mt-12 md:mt-16">
              <div className={`${isMobile ? 'text-center' : 'text-left'} mb-10 md:mb-12`}>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-black mb-3 md:mb-4 tracking-tight text-white`}>
                  How It Works
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-gray-300 font-medium`}>
                  Your personal AI agent working 24/7 to land your dream job
                </p>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4 md:gap-6`}>
                {[
                  {
                    step: '01',
                    icon: Target,
                    title: 'Agent Scans',
                    description: 'Continuously monitors job boards for new postings matching your criteria',
                  },
                  {
                    step: '02',
                    icon: Bot,
                    title: 'AI Matches',
                    description: 'Analyzes requirements vs your profile using advanced ML algorithms',
                  },
                  {
                    step: '03',
                    icon: Rocket,
                    title: 'Auto Applies',
                    description: 'Fills applications, uploads resume, and submits automatically',
                  },
                  {
                    step: '04',
                    icon: Mail,
                    title: 'You Track',
                    description: 'Get instant email alerts and monitor everything in your dashboard',
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="relative group"
                    >
                      {/* Connecting line for desktop */}
                      {index < 3 && !isMobile && (
                        <div className="hidden lg:block absolute top-1/4 left-full w-6 h-0.5 z-0">
                          <div className="h-full opacity-20" style={{ background: theme.getAccentGradient(90) }}></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: theme.accentPrimary, opacity: 0.3 }}></div>
                        </div>
                      )}

                      <div className={`relative bg-white/5 backdrop-blur-xl rounded-xl ${isMobile ? 'p-5' : 'p-6 md:p-7'} border border-white/10 hover:border-white/20 transition-all duration-500 ${isMobile ? '' : 'group-hover:-translate-y-2'}`}
                        style={{
                          boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-60 rounded-xl"></div>

                        {/* Step number */}
                        <div
                          className={`absolute -top-3 -right-3 ${isMobile ? 'w-10 h-10' : 'w-11 h-11'} backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center shadow-lg`}
                          style={{
                            background: theme.getAccentGradient(135),
                            boxShadow: `0 8px 20px -5px ${theme.accentPrimary}50`,
                          }}>
                          <span className={`text-white font-black ${isMobile ? 'text-xs' : 'text-sm'} drop-shadow-sm`}>{item.step}</span>
                        </div>

                        {/* Icon */}
                        <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} rounded-xl flex items-center justify-center mb-4 md:mb-5 ${isMobile ? '' : 'group-hover:scale-110'} transition-transform duration-500`}
                          style={{
                            background: theme.getAccentGradient(135),
                            boxShadow: `0 10px 25px -5px ${theme.accentPrimary}60, inset 0 1px 0 0 rgba(255, 255, 255, 0.3)`,
                          }}
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-xl"></div>
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent rounded-t-xl"></div>
                          <Icon className={`relative z-10 ${isMobile ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'} text-white drop-shadow-md`} strokeWidth={2.5} />

                          {/* Glow */}
                          <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" style={{ background: theme.getAccentGradient(135) }}></div>
                        </div>

                        {/* Content */}
                        <h4 className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-black text-white mb-2 md:mb-3 tracking-tight`}>
                          {item.title}
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm md:text-base'} leading-relaxed`}>
                          {item.description}
                        </p>

                        {/* Bottom accent */}
                        <div className={`${isMobile ? 'mt-4' : 'mt-5'} h-0.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500`} style={{ background: theme.getAccentGradient(90) }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats highlight */}
              <div className={`${isMobile ? 'mt-10' : 'mt-12 md:mt-16'} grid grid-cols-2 md:grid-cols-4 ${isMobile ? 'gap-3' : 'gap-4 md:gap-6'}`}>
                {[
                  { value: '24/7', label: 'Always Active' },
                  { value: '100+', label: 'Jobs/Day' },
                  { value: '< 30s', label: 'Per Application' },
                  { value: '100%', label: 'Automated' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`relative bg-white/5 backdrop-blur-xl rounded-xl ${isMobile ? 'p-4' : 'p-5 md:p-6'} border border-white/10 text-center hover:border-white/20 hover:-translate-y-1 transition-all duration-300`}
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <div className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-black bg-clip-text text-transparent mb-1 md:mb-2`} style={{ backgroundImage: theme.getAccentGradient(90) }}>
                        {stat.value}
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 font-bold`}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>

        </div>
        {/* End of dark rounded section */}
      </div>
    </section>
  );
}
