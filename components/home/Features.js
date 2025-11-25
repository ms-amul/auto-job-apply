'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '../Container';
import { Zap, Bot, Target, Sparkles, Rocket, TrendingUp, Clock, Mail, BarChart3, Shield, RefreshCw, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '../../utils/theme';

export default function Features() {
  const { isMobile, isReducedMotion } = useMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
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
  ];

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (isMobile) return 1;
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
    }
    return 2;
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(features.length / itemsPerView);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isMobile || isReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, isReducedMotion, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon;

    return (
      <div
        key={index}
        className="group relative h-full"
      >
        <div className={`
          relative h-full bg-white/5 backdrop-blur-2xl rounded-2xl ${isMobile ? 'p-5' : 'p-6 md:p-7'}
          border border-white/10
          transition-all duration-500 ease-out
          transform ${isMobile ? '' : 'hover:border-white/20'}
          overflow-hidden
        `}
          style={{
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Premium glass reflection */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>

          {/* Top glass shine */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
            style={{ background: theme.getAccentGradient(135) }}>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon container */}
            <div className={`relative ${isMobile ? 'w-14 h-14 mb-5' : 'w-16 h-16 mb-6'}`}>
              <div className="absolute inset-0 rounded-xl blur-xl opacity-30 transition-all duration-500"
                style={{ background: theme.getAccentGradient(135) }}
              ></div>

              <div className={`
                relative w-full h-full
                rounded-xl
                flex items-center justify-center
                transform ${isMobile ? '' : 'group-hover:scale-110'}
                transition-all duration-500
                overflow-hidden
              `}
                style={{
                  background: theme.getAccentGradient(135),
                  boxShadow: `0 10px 25px -5px ${theme.accentPrimary}50, inset 0 1px 0 0 rgba(255, 255, 255, 0.3)`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-xl"></div>
                <Icon className={`relative z-10 text-white drop-shadow-lg ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}`} strokeWidth={2.5} />
              </div>
            </div>

            <h3 className={`${isMobile ? 'text-lg mb-3' : 'text-xl md:text-2xl mb-3'} font-black text-white tracking-tight`}>
              {feature.title}
            </h3>

            <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
              {feature.description}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            style={{ background: theme.getAccentGradient(90) }}>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="features"
      className="relative overflow-visible"
    >
      {/* Outer container for rounded dark section */}
      <div className={`relative overflow-hidden`}
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
        <div className={`relative ${isMobile ? 'py-12' : 'py-16 md:py-20'}`}>

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

              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-black mb-3 md:mb-5 tracking-tight`}>
                <span className="text-white">
                  Everything You Need to
                </span>
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                  Land Your Dream Job
                </span>
              </h2>

              <p className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-gray-300 font-medium ${isMobile ? 'max-w-md' : 'max-w-2xl'} ${isMobile ? 'mx-auto' : 'lg:mx-0'}`}>
                Powerful automation features that work 24/7 to help you{' '}
                <span className="font-bold text-white">
                  apply faster, track smarter,
                </span>
                {' '}and land more interviews.
              </p>
            </div>
          </Container>

          {/* Premium Carousel */}
          <Container>
            <div className="relative">
              {/* Carousel Container */}
              <div
                className="relative overflow-hidden px-2"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Carousel Track */}
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className={`min-w-full grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} ${isMobile ? 'gap-5' : 'gap-6 lg:gap-8'} ${isMobile ? 'px-2' : 'px-4'}`}
                    >
                      {features
                        .slice(slideIndex * itemsPerView, slideIndex * itemsPerView + itemsPerView)
                        .map((feature, featureIndex) => (
                          <FeatureCard
                            key={slideIndex * itemsPerView + featureIndex}
                            feature={feature}
                            index={slideIndex * itemsPerView + featureIndex}
                          />
                        ))}
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows - Desktop Only */}
                {!isMobile && totalSlides > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg group"
                      style={{
                        boxShadow: `0 8px 20px -4px ${theme.accentPrimary}30, inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`,
                      }}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg group"
                      style={{
                        boxShadow: `0 8px 20px -4px ${theme.accentPrimary}30, inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`,
                      }}
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>
                  </>
                )}

                {/* Dot Indicators */}
                {totalSlides > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex
                            ? 'w-8 h-2 bg-white'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                          }`}
                        style={
                          index === currentIndex
                            ? {
                              background: theme.getAccentGradient(90),
                              boxShadow: `0 0 12px ${theme.accentPrimary}60`,
                            }
                            : {}
                        }
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>

          <Container>
            <div className="relative z-10 mt-16 md:mt-20">
              <div className={`${isMobile ? 'text-center' : 'text-left'} mb-12 md:mb-16`}>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-black mb-3 md:mb-4 tracking-tight text-white`}>
                  How It Works
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-gray-300 font-medium`}>
                  Your personal AI agent working 24/7 to land your dream job
                </p>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'} ${isMobile ? 'gap-5' : 'gap-6 lg:gap-8'}`}>
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
              <div className={`${isMobile ? 'mt-12' : 'mt-16 md:mt-20'} grid grid-cols-2 md:grid-cols-4 ${isMobile ? 'gap-4' : 'gap-6 lg:gap-8'}`}>
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
