'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { Settings, Sparkles, Target, CheckCircle, User, Brain, Search, BarChart, Send, Mail, Calendar } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '@/utils/theme';

export default function ProcessParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { isMobile, isReducedMotion } = useMobile();

  // Auto-advance through sub-steps and main steps with clean animation
  useEffect(() => {
    if (!isVisible || isReducedMotion) return;
    
    // Stop if we've completed all steps
    if (activeStep > 2) return;
    
    // If we're at the last step and last sub-step, stop
    if (activeStep === 2) {
      const lastStepSubStepsCount = steps[2]?.subSteps.length || 0;
      if (activeSubStep >= lastStepSubStepsCount - 1) return;
    }

    // Slower on mobile for better performance
    const intervalTime = isMobile ? 3000 : 2000;
    const interval = setInterval(() => {
      const currentStepSubStepsCount = steps[activeStep]?.subSteps.length || 0;
      
      // If we haven't completed all sub-steps of current step
      if (activeSubStep < currentStepSubStepsCount - 1) {
        // Move to next sub-step
        setActiveSubStep(activeSubStep + 1);
      } else {
        // All sub-steps complete, move to next main step
        if (activeStep < 2) {
          setActiveStep(activeStep + 1);
          setActiveSubStep(0); // Reset to first sub-step of next step
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, activeStep, activeSubStep, isMobile, isReducedMotion]);

  // Detect when section is in viewport
  useEffect(() => {
    // Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            setIsVisible(inView);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      icon: Settings,
      title: 'Set Your Preferences',
      description: 'Tell us your dream role and our AI understands your unique career goals',
      useGradient: true,
      subSteps: [
        {
          icon: User,
          title: 'You Share',
          description: 'Skills, role, salary expectations',
          useGradient: true,
        },
        {
          icon: Brain,
          title: 'AI Understands',
          description: 'Analyzes profile & preferences',
          useGradient: true,
        },
      ],
    },
    {
      icon: Sparkles,
      title: 'AI Does the Work',
      description: 'Our agent automatically finds, matches, and applies to perfect jobs',
      useGradient: true,
      subSteps: [
        {
          icon: Search,
          title: 'Agent Fetches',
          description: 'Scans 100+ job boards continuously',
          useGradient: true,
        },
        {
          icon: BarChart,
          title: 'Smart Matching',
          description: 'Scores & ranks best job matches',
          useGradient: true,
        },
        {
          icon: Send,
          title: 'Auto Apply',
          description: 'Fills & submits applications',
          useGradient: true,
        },
        {
          icon: Mail,
          title: 'Email Alert',
          description: 'Notifies you of every application',
          useGradient: true,
        },
      ],
    },
    {
      icon: Calendar,
      title: 'Get Interviews',
      description: 'Receive interview invitations and track your success',
      useGradient: true,
      subSteps: [
        {
          icon: Mail,
          title: 'Interview Email',
          description: 'Companies send interview invites',
          useGradient: true,
        },
        {
          icon: Calendar,
          title: 'Schedule Slot',
          description: 'Pick your preferred time',
          useGradient: true,
        },
      ],
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id='how-it-works'
      className="relative bg-linear-to-br from-white via-sky-50/20 to-cyan-50/25 overflow-hidden"
    >
      {/* Premium subtle background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle radial gradient overlays */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 800px 600px at top left, ${theme.accentPrimary}15, transparent 60%)`
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(ellipse 1000px 700px at bottom right, ${theme.accentSecondary}12, transparent 60%)`
          }}
        ></div>
        
        {/* Subtle floating light orbs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float opacity-20"
          style={{ 
            background: theme.getAccentGradient(135),
            animationDuration: '8s' 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl animate-float opacity-15"
          style={{ 
            background: theme.getAccentGradient(45),
            animationDelay: '2s', 
            animationDuration: '10s' 
          }}
        ></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 50px)',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        ></div>
      </div>

      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <Container>
          {/* Premium heading section */}
          <div className="mb-10 relative">

            {/* Main heading with premium effects */}
            <div className="relative inline-block mb-6">
              {/* Subtle static gradient backdrop - no animation */}
              <div 
                className="absolute -inset-4 blur-2xl opacity-15"
                style={{ background: theme.getAccentGradient(135) }}
              ></div>
              
              {/* Secondary subtle shade for depth */}
              <div 
                className="absolute -inset-2 blur-xl opacity-10"
                style={{ background: `radial-gradient(ellipse, ${theme.accentPrimary}40, transparent 70%)` }}
              ></div>
              
              <h2 className="relative text-left text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight">
                <span className="inline-block animate-fadeInUp" style={{ animationDuration: '1.2s' }}>
                  <span className="bg-clip-text text-transparent drop-shadow-lg" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                    Automated Success
                  </span>
                </span>
                <br />
                <span className="inline-block text-gray-900 animate-fadeInUp" style={{ animationDelay: '0.1s', animationDuration: '1.2s' }}>
                  in{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                      Three Steps
                    </span>
                    {/* Animated underline */}
                    <svg 
                      className="absolute -bottom-2 left-0 w-full animate-draw-line" 
                      height="12" 
                      viewBox="0 0 200 12" 
                      fill="none"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <path 
                        d="M2 8C50 4 150 4 198 8" 
                        stroke="url(#gradient-process)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient-process" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={theme.accentPrimary} />
                          <stop offset="100%" stopColor={theme.accentSecondary} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </h2>
            </div>

            {/* Premium subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 animate-fadeInUp font-medium" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}>
              Watch your job applications{' '}
              <span className="relative inline-block">
                <span className="font-bold text-transparent bg-clip-text" style={{ backgroundImage: theme.getAccentGradient(90) }}>
                  automate in real-time
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 opacity-30" style={{ background: theme.getAccentGradient(90) }}></span>
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    transform: `scale(${isActive ? 1.02 : 1}) translateY(${isActive ? -5 : 0}px)`,
                    opacity: isPast ? 0.8 : 1,
                    transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {/* Elegant connecting line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 left-full w-10 h-px z-0">
                      {/* Dotted line with gradient */}
                      <div className="relative h-full w-full flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`
                              h-px w-1.5 rounded-full transition-all duration-700 ease-out
                              ${isPast ? 'opacity-60' : 'opacity-20'}
                            `}
                            style={{ 
                              background: theme.accentPrimary,
                              transitionDelay: `${i * 50}ms`
                            }}
                          ></div>
                        ))}
                      </div>
                      {/* Small circle at the end */}
                      <div 
                        className={`
                          absolute -right-1 -top-1 w-2 h-2 rounded-full transition-all duration-700
                          ${isPast ? 'opacity-80 scale-100' : 'opacity-30 scale-75'}
                        `}
                        style={{ background: theme.accentPrimary }}
                      ></div>
                    </div>
                  )}

                  <div className={`
                    relative bg-white/75 backdrop-blur-3xl rounded-3xl p-6
                    border-2 transition-all duration-700 ease-out
                    ${isActive 
                      ? 'border-white/80 shadow-2xl' 
                      : isPast 
                        ? 'border-green-300/60 shadow-xl' 
                        : 'border-gray-300/40 shadow-lg'
                    }
                    overflow-visible
                    group
                  `}
                  style={{
                    boxShadow: isActive 
                      ? `0 35px 70px -20px ${theme.accentPrimary}30, 0 15px 30px -10px ${theme.accentPrimary}20, inset 0 2px 0 0 rgba(255, 255, 255, 0.9)`
                      : isPast
                        ? '0 25px 50px -12px rgba(34, 197, 94, 0.25), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)'
                        : '0 20px 40px -10px rgba(0, 0, 0, 0.08), inset 0 2px 0 0 rgba(255, 255, 255, 0.85)',
                  }}
                  >
                    {/* Multi-layer premium glass reflections */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/50 to-transparent opacity-70 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-linear-to-tl from-white/40 via-transparent to-transparent opacity-50 rounded-3xl"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
                    <div className="absolute top-0 left-1/4 right-1/4 h-20 bg-linear-to-b from-white/40 to-transparent blur-md"></div>
                    
                    {/* Side edge highlights */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-transparent via-white/70 to-transparent"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-transparent via-white/70 to-transparent"></div>

                    {/* Very subtle active tint - no flashing */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 opacity-[0.03] rounded-3xl transition-opacity duration-700" 
                        style={{ background: theme.getAccentGradient(135) }}
                      ></div>
                    )}
                    
                    {/* Completed celebration glow */}
                    {isPast && (
                      <div className="absolute inset-0 bg-green-400/10 rounded-3xl"></div>
                    )}

                    {/* Premium Step number badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 z-20">
                      {/* Very subtle glow ring for active - no pulsing */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-2xl blur-lg opacity-20 transition-opacity duration-700"
                          style={{ background: theme.getAccentGradient(135) }}
                        ></div>
                      )}
                      
                      <div className={`
                        relative w-full h-full rounded-2xl 
                        flex items-center justify-center transition-all duration-700 ease-out
                        backdrop-blur-xl border-2 overflow-hidden
                        ${isPast 
                          ? 'bg-green-500/95 border-green-300 shadow-2xl shadow-green-500/40' 
                          : isActive 
                            ? 'border-white/70 shadow-2xl' 
                            : 'bg-white/85 border-gray-300 shadow-xl'
                        }
                      `}
                      style={{
                        background: isActive ? theme.getAccentGradient(135) : undefined,
                        boxShadow: isActive 
                          ? `0 15px 40px -10px ${theme.accentPrimary}50, inset 0 2px 0 0 rgba(255, 255, 255, 0.5)` 
                          : isPast
                            ? '0 10px 30px -8px rgba(34, 197, 94, 0.5), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)'
                            : '0 8px 20px -5px rgba(0, 0, 0, 0.12), inset 0 2px 0 0 rgba(255, 255, 255, 0.6)',
                      }}
                      >
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent rounded-2xl"></div>
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent rounded-t-2xl"></div>
                        
                        <div className="relative z-10">
                          {isPast ? (
                            <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
                          ) : (
                            <span className={`text-2xl font-black ${isActive ? 'text-white drop-shadow-lg' : 'text-gray-600'}`}>
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Main content container */}
                    <div className="relative z-10">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4 mb-5">
                        {/* Premium Icon - clean and simple */}
                        <div className="relative w-16 h-16 shrink-0">
                          
                          {/* Icon container */}
                          <div className={`
                            relative w-full h-full
                            rounded-2xl
                            flex items-center justify-center
                            transform transition-all duration-700 ease-out
                            ${isActive ? 'scale-110 rotate-3' : 'scale-100'}
                            overflow-hidden
                          `}
                          style={{
                            background: theme.getAccentGradient(135),
                            boxShadow: isActive 
                              ? `0 15px 35px -8px ${theme.accentPrimary}40, 0 8px 20px -5px ${theme.accentPrimary}30, inset 0 2px 0 0 rgba(255, 255, 255, 0.4)`
                              : `0 10px 25px -5px rgba(0, 0, 0, 0.12), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)`,
                          }}
                          >
                            {/* Multi-layer glass reflections */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent rounded-2xl"></div>
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent rounded-t-2xl"></div>
                            
                            <Icon className="w-8 h-8 text-white relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                            
                            {/* Very subtle static glow - no pulsing */}
                            {isActive && (
                              <div 
                                className="absolute inset-0 rounded-2xl blur-lg opacity-20 -z-10 transition-opacity duration-700"
                                style={{ background: theme.getAccentGradient(135) }}
                              ></div>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className={`
                            text-2xl font-black mb-1 transition-all duration-700 tracking-tight
                            ${isActive 
                              ? 'bg-clip-text text-transparent' 
                              : 'text-gray-900'
                            }
                          `}
                          style={isActive ? { backgroundImage: theme.getAccentGradient(90) } : {}}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-700 font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Sub-steps visualization with loading states */}
                      <div className="space-y-3 mt-6">
                        {step.subSteps.map((subStep, subIndex) => {
                          const SubIcon = subStep.icon;
                          const isSubCompleted = isActive && subIndex < activeSubStep;
                          const isSubProcessing = isActive && subIndex === activeSubStep;
                          const isSubPending = !isActive || subIndex > activeSubStep;
                          const shouldShow = isPast || isActive;
                          
                          return (
                            <div
                              key={subIndex}
                              className={`
                                relative bg-white/70 backdrop-blur-xl rounded-2xl p-4
                                border-2 transition-all duration-700 ease-out
                                ${isSubCompleted ? 'border-green-300/60 shadow-lg' : ''}
                                ${isSubProcessing ? 'border-white/70 shadow-xl' : ''}
                                ${isSubPending ? 'border-gray-200/30 shadow-sm' : ''}
                              `}
                              style={{
                                transform: shouldShow ? 'translateX(0) scale(1)' : 'translateX(-15px) scale(0.95)',
                                opacity: shouldShow ? (isSubPending ? 0.5 : 1) : 0,
                                transitionDelay: `${subIndex * 100}ms`,
                                boxShadow: isSubProcessing 
                                  ? `0 15px 35px -10px ${theme.accentPrimary}25, inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`
                                  : isSubCompleted
                                    ? '0 10px 25px -8px rgba(34, 197, 94, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)'
                                    : '0 5px 15px -5px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                              }}
                            >
                              {/* Premium glass layers */}
                              <div className="absolute inset-0 bg-linear-to-br from-white/70 to-white/30 rounded-2xl"></div>
                              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
                              
                              {/* Very subtle processing tint - no shimmer */}
                              {isSubProcessing && (
                                <div className="absolute inset-0 rounded-2xl opacity-[0.02] transition-opacity duration-700" style={{ background: theme.accentPrimary }}></div>
                              )}
                              
                              <div className="relative z-10 flex items-start gap-3">
                                {/* Enhanced sub-step icon with status */}
                                <div className="relative">
                                  <div className={`
                                    w-11 h-11 shrink-0 rounded-xl
                                    flex items-center justify-center
                                    transition-all duration-700 ease-out
                                    ${isSubProcessing ? 'scale-110' : isSubCompleted ? 'scale-100' : 'scale-95'}
                                  `}
                                  style={{
                                    background: theme.getAccentGradient(135),
                                    boxShadow: isSubProcessing
                                      ? `0 8px 20px -5px ${theme.accentPrimary}40, inset 0 2px 0 0 rgba(255, 255, 255, 0.5)`
                                      : '0 5px 15px -3px rgba(0, 0, 0, 0.15), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)',
                                  }}
                                  >
                                    <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent rounded-xl"></div>
                                    <SubIcon className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
                                  </div>
                                  
                                  {/* Status badge overlay */}
                                  {(isSubCompleted || isSubProcessing) && (
                                    <div 
                                      className={`
                                        absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                                        ${isSubCompleted ? 'bg-green-500' : ''}
                                        shadow-lg animate-fadeInUp
                                      `}
                                      style={{
                                        background: isSubProcessing ? theme.accentPrimary : undefined
                                      }}
                                    >
                                      {isSubCompleted ? (
                                        <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                                      ) : (
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Sub-step content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 
                                      className={`
                                        text-sm font-bold transition-colors duration-700
                                        ${isSubCompleted ? 'text-green-700' : 'text-gray-900'}
                                      `}
                                      style={{
                                        color: isSubProcessing ? theme.accentPrimary : undefined
                                      }}
                                    >
                                      {subStep.title}
                                    </h4>
                                    {isSubProcessing && (
                                      <div className="flex gap-1">
                                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: theme.accentPrimary }}></div>
                                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: theme.accentPrimary, animationDelay: '0.2s' }}></div>
                                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: theme.accentPrimary, animationDelay: '0.4s' }}></div>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700 leading-relaxed mb-2">
                                    {subStep.description}
                                  </p>
                                  
                                  {/* Clean progress bar for active sub-step */}
                                  {isSubProcessing && (
                                    <div className="relative h-2 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm mt-3 shadow-inner">
                                      <div 
                                        className="absolute inset-y-0 left-0 rounded-full shadow-md"
                                        style={{
                                          background: theme.getAccentGradient(90),
                                          width: '0%',
                                          animation: 'progress 2s ease-out forwards',
                                        }}
                                      >
                                        {/* Simple glass shine - no shimmer */}
                                        <div className="absolute inset-0 bg-linear-to-b from-white/30 to-transparent"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Premium Status indicator */}
                                <div className="shrink-0">
                                  {isSubCompleted && (
                                    <div className="relative w-7 h-7 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/40 transition-all duration-300">
                                      <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-xl"></div>
                                      <CheckCircle className="w-4.5 h-4.5 text-white relative z-10" strokeWidth={2.5} />
                                    </div>
                                  )}
                                  {isSubProcessing && (
                                    <div className="relative w-7 h-7">
                                      {/* Clean spinning loader - no glow */}
                                      <div 
                                        className="relative w-full h-full border-3 rounded-full animate-spin shadow-md"
                                        style={{
                                          borderColor: `${theme.accentPrimary}25`,
                                          borderTopColor: theme.accentPrimary
                                        }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Enhanced Status indicator with progress */}
                      <div className="mt-6 pt-5 border-t border-gray-200/60">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isPast ? (
                              <>
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm"></div>
                                <span className="text-xs font-black text-green-600 tracking-wide">
                                  ✓ COMPLETED
                                </span>
                              </>
                            ) : isActive ? (
                              <>
                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: theme.accentPrimary }}></div>
                                <span className="text-xs font-black tracking-wide" style={{ color: theme.accentPrimary }}>
                                  ⚡ PROCESSING
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-2.5 h-2.5 bg-gray-300 rounded-full opacity-50"></div>
                                <span className="text-xs font-bold text-gray-400 tracking-wide">
                                  ⏳ PENDING
                                </span>
                              </>
                            )}
                          </div>
                          
                          {/* Sub-step progress counter */}
                          {isActive && (
                            <div 
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 transition-all duration-300"
                              style={{
                                background: `${theme.accentPrimary}10`,
                                borderColor: `${theme.accentPrimary}40`
                              }}
                            >
                              <div className="w-1 h-1 rounded-full" style={{ background: theme.accentPrimary }}></div>
                              <span className="text-[10px] font-black" style={{ color: theme.accentPrimary }}>
                                {activeSubStep + 1} / {step.subSteps.length}
                              </span>
                            </div>
                          )}
                          
                          {isPast && (
                            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-200/60">
                              <CheckCircle className="w-3 h-3 text-green-600" strokeWidth={2.5} />
                              <span className="text-[10px] font-black text-green-700">
                                {step.subSteps.length} / {step.subSteps.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}

