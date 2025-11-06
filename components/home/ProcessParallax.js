'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { Settings, Sparkles, Target, CheckCircle, ArrowRight, User, Brain, Search, BarChart, Send, Mail, Calendar } from 'lucide-react';

export default function ProcessParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Auto-advance through sub-steps and main steps with clean animation
  useEffect(() => {
    if (!isVisible) return;
    
    // Stop if we've completed all steps
    if (activeStep > 2) return;
    
    // If we're at the last step and last sub-step, stop
    if (activeStep === 2) {
      const lastStepSubStepsCount = steps[2]?.subSteps.length || 0;
      if (activeSubStep >= lastStepSubStepsCount - 1) return;
    }

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
    }, 2000); // 2 seconds per sub-step for better visibility

    return () => clearInterval(interval);
  }, [isVisible, activeStep, activeSubStep]);

  // Detect when section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setIsVisible(inView);
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
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      subSteps: [
        {
          icon: User,
          title: 'You Share',
          description: 'Skills, role, salary expectations',
          color: 'from-blue-500 to-indigo-500',
        },
        {
          icon: Brain,
          title: 'AI Understands',
          description: 'Analyzes profile & preferences',
          color: 'from-indigo-500 to-purple-500',
        },
      ],
    },
    {
      icon: Sparkles,
      title: 'AI Does the Work',
      description: 'Our agent automatically finds, matches, and applies to perfect jobs',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      subSteps: [
        {
          icon: Search,
          title: 'Agent Fetches',
          description: 'Scans 100+ job boards continuously',
          color: 'from-purple-500 to-pink-500',
        },
        {
          icon: BarChart,
          title: 'Smart Matching',
          description: 'Scores & ranks best job matches',
          color: 'from-pink-500 to-rose-500',
        },
        {
          icon: Send,
          title: 'Auto Apply',
          description: 'Fills & submits applications',
          color: 'from-rose-500 to-red-500',
        },
        {
          icon: Mail,
          title: 'Email Alert',
          description: 'Notifies you of every application',
          color: 'from-red-500 to-orange-500',
        },
      ],
    },
    {
      icon: Calendar,
      title: 'Get Interviews',
      description: 'Receive interview invitations and track your success',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      subSteps: [
        {
          icon: Mail,
          title: 'Interview Email',
          description: 'Companies send interview invites',
          color: 'from-orange-500 to-amber-500',
        },
        {
          icon: Calendar,
          title: 'Schedule Slot',
          description: 'Pick your preferred time',
          color: 'from-amber-500 to-yellow-500',
        },
      ],
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-linear-to-br from-white via-orange-50/30 to-blue-50/40 overflow-hidden"
      style={{ minHeight: '120vh' }}
    >
      {/* Premium light background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-orange-100/30 via-transparent to-transparent"></div>
        
        {/* Floating light orbs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-linear-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDuration: '8s' }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-linear-to-br from-orange-200/25 to-pink-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s', animationDuration: '10s' }}
        ></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 50px)',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        ></div>
      </div>

      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <Container>
          {/* Premium heading section */}
          <div className="text-center mb-20 relative">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-6 py-2 mb-6 shadow-lg animate-fadeInUp backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-red-600">
                AI-Powered Automation
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main heading with premium effects */}
            <div className="relative inline-block mb-6">
              {/* Glow effect behind text */}
              <div className="absolute inset-0 blur-3xl bg-linear-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 animate-pulse"></div>
              
              <h2 className="relative text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight">
                <span className="inline-block animate-fadeInUp">
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-red-500 to-pink-500 drop-shadow-lg">
                    Automated Success
                  </span>
                </span>
                <br />
                <span className="inline-block text-gray-900 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  in{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
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
                        stroke="url(#gradient2)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </h2>
            </div>

            {/* Premium subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto mb-8 animate-fadeInUp font-medium" style={{ animationDelay: '0.2s' }}>
              Watch your job applications{' '}
              <span className="relative inline-block">
                <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-600">
                  automate in real-time
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-orange-600 to-red-600 opacity-30"></span>
              </span>
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Stats or features mini-cards */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-700">Fully Automated</span>
              </div>
              <div className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">Smart Matching</span>
              </div>
              <div className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-semibold text-gray-700">AI-Powered</span>
              </div>
            </div>
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
                  {/* Connecting line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 left-full w-8 h-0.5 z-0">
                      <div className={`
                        h-full bg-linear-to-r from-orange-400 to-transparent
                        transition-all duration-500
                        ${isPast ? 'opacity-100' : 'opacity-30'}
                      `}></div>
                      <ArrowRight className={`
                        absolute -right-3 -top-2 w-5 h-5 transition-colors duration-500
                        ${isPast ? 'text-orange-500' : 'text-gray-400'}
                      `} />
                    </div>
                  )}

                  <div className={`
                    relative bg-white/70 backdrop-blur-3xl rounded-3xl p-6
                    border-2 transition-all duration-500
                    ${isActive 
                      ? 'border-orange-300/70 shadow-2xl shadow-orange-200/50' 
                      : isPast 
                        ? 'border-green-300/60 shadow-xl' 
                        : 'border-gray-300/50 shadow-lg'
                    }
                    overflow-visible
                    group
                  `}
                  style={{
                    boxShadow: isActive 
                      ? '0 35px 70px -20px rgba(249, 115, 22, 0.4), 0 15px 30px -10px rgba(249, 115, 22, 0.2), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)'
                      : isPast
                        ? '0 25px 50px -12px rgba(34, 197, 94, 0.3), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)'
                        : '0 20px 40px -10px rgba(0, 0, 0, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.85)',
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

                    {/* Active glow background with enhanced effects */}
                    {isActive && (
                      <>
                        <div className={`absolute inset-0 bg-linear-to-br ${step.bgColor} opacity-35 animate-pulse rounded-3xl`}></div>
                        {/* Animated shimmer sweep */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-200/40 to-transparent animate-shimmer"></div>
                        </div>
                        {/* Corner accents */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/20 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      </>
                    )}
                    
                    {/* Completed celebration glow */}
                    {isPast && (
                      <div className="absolute inset-0 bg-green-400/10 rounded-3xl"></div>
                    )}

                    {/* Premium Step number badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 z-20">
                      {/* Glow ring for active */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-xl opacity-60 animate-pulse`}></div>
                      )}
                      
                      <div className={`
                        relative w-full h-full rounded-2xl 
                        flex items-center justify-center transition-all duration-500
                        backdrop-blur-xl border-2 overflow-hidden
                        ${isPast 
                          ? 'bg-green-500/95 border-green-300 shadow-2xl shadow-green-500/40' 
                          : isActive 
                            ? `bg-linear-to-br ${step.color} border-white/60 shadow-2xl shadow-orange-500/50` 
                            : 'bg-white/85 border-gray-300 shadow-xl'
                        }
                      `}
                      style={{
                        boxShadow: isActive 
                          ? '0 15px 40px -10px rgba(249, 115, 22, 0.6), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)' 
                          : isPast
                            ? '0 10px 30px -8px rgba(34, 197, 94, 0.5), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)'
                            : '0 8px 20px -5px rgba(0, 0, 0, 0.15), inset 0 2px 0 0 rgba(255, 255, 255, 0.6)',
                      }}
                      >
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent rounded-2xl"></div>
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent rounded-t-2xl"></div>
                        
                        {/* Active shimmer */}
                        {isActive && (
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                          </div>
                        )}
                        
                        <div className="relative z-10">
                          {isPast ? (
                            <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
                          ) : (
                            <span className={`text-2xl font-black ${isActive ? 'text-white drop-shadow-lg' : 'text-gray-600'}`}>
                              {index + 1}
                            </span>
                          )}
                        </div>
                        
                        {/* Success ping effect */}
                        {isPast && (
                          <div className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-30"></div>
                        )}
                      </div>
                      
                      {/* Floating particles for active badge */}
                      {isActive && (
                        <>
                          <div className="absolute -top-1 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                          <div className="absolute top-1/4 -right-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        </>
                      )}
                    </div>

                    {/* Main content container */}
                    <div className="relative z-10">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4 mb-5">
                        {/* Premium Icon with rotating ring */}
                        <div className="relative w-16 h-16 shrink-0">
                          {/* Rotating ring for active state */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-orange-400/40 animate-spin-slow"></div>
                          )}
                          
                          {/* Icon container */}
                          <div className={`
                            relative w-full h-full
                            bg-linear-to-br ${step.color}
                            rounded-2xl
                            flex items-center justify-center
                            transform transition-all duration-500
                            ${isActive ? 'scale-110 rotate-3' : 'scale-100'}
                            overflow-hidden
                          `}
                          style={{
                            boxShadow: isActive 
                              ? `0 15px 35px -8px rgba(249, 115, 22, 0.5), 0 8px 20px -5px rgba(249, 115, 22, 0.3), inset 0 2px 0 0 rgba(255, 255, 255, 0.4)`
                              : `0 10px 25px -5px rgba(0, 0, 0, 0.15), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)`,
                          }}
                          >
                            {/* Multi-layer glass reflections */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent rounded-2xl"></div>
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent rounded-t-2xl"></div>
                            
                            {/* Active shimmer */}
                            {isActive && (
                              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                              </div>
                            )}
                            
                            <Icon className="w-8 h-8 text-white relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                            
                            {/* Glow effect */}
                            {isActive && (
                              <>
                                <div className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-xl opacity-70 animate-pulse -z-10`}></div>
                                <div className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-2xl opacity-50 animate-pulse -z-20`} style={{ animationDelay: '0.5s' }}></div>
                              </>
                            )}
                          </div>
                          
                          {/* Floating particles for active state */}
                          {isActive && (
                            <>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-rose-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className={`
                            text-2xl font-black mb-1 transition-all duration-500 tracking-tight
                            ${isActive 
                              ? 'bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-red-600' 
                              : 'text-gray-900'
                            }
                          `}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">
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
                                relative bg-white/60 backdrop-blur-xl rounded-2xl p-4
                                border-2 transition-all duration-700
                                ${isSubCompleted ? 'border-green-300/60 shadow-lg' : ''}
                                ${isSubProcessing ? 'border-orange-300/60 shadow-xl shadow-orange-200/40' : ''}
                                ${isSubPending ? 'border-gray-200/40 shadow-sm' : ''}
                              `}
                              style={{
                                transform: shouldShow ? 'translateX(0) scale(1)' : 'translateX(-15px) scale(0.95)',
                                opacity: shouldShow ? (isSubPending ? 0.5 : 1) : 0,
                                transitionDelay: `${subIndex * 100}ms`,
                                boxShadow: isSubProcessing 
                                  ? '0 15px 35px -10px rgba(249, 115, 22, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)'
                                  : isSubCompleted
                                    ? '0 10px 25px -8px rgba(34, 197, 94, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)'
                                    : '0 5px 15px -5px rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                              }}
                            >
                              {/* Premium glass layers */}
                              <div className="absolute inset-0 bg-linear-to-br from-white/70 to-white/30 rounded-2xl"></div>
                              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
                              
                              {/* Processing shimmer effect */}
                              {isSubProcessing && (
                                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-200/30 to-transparent animate-shimmer"></div>
                                </div>
                              )}
                              
                              <div className="relative z-10 flex items-start gap-3">
                                {/* Enhanced sub-step icon with status */}
                                <div className="relative">
                                  <div className={`
                                    w-11 h-11 shrink-0 rounded-xl
                                    bg-linear-to-br ${subStep.color}
                                    flex items-center justify-center
                                    transition-all duration-500
                                    ${isSubProcessing ? 'scale-110' : isSubCompleted ? 'scale-100' : 'scale-95'}
                                  `}
                                  style={{
                                    boxShadow: isSubProcessing
                                      ? '0 8px 20px -5px rgba(249, 115, 22, 0.5), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)'
                                      : '0 5px 15px -3px rgba(0, 0, 0, 0.2), inset 0 2px 0 0 rgba(255, 255, 255, 0.5)',
                                  }}
                                  >
                                    <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent rounded-xl"></div>
                                    <SubIcon className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
                                    
                                    {/* Processing pulse */}
                                    {isSubProcessing && (
                                      <div className={`absolute inset-0 bg-linear-to-br ${subStep.color} rounded-xl animate-ping opacity-60`}></div>
                                    )}
                                  </div>
                                  
                                  {/* Status badge overlay */}
                                  {(isSubCompleted || isSubProcessing) && (
                                    <div className={`
                                      absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                                      ${isSubCompleted ? 'bg-green-500' : 'bg-orange-500'}
                                      shadow-lg animate-fadeInUp
                                    `}>
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
                                    <h4 className={`
                                      text-sm font-bold transition-colors duration-300
                                      ${isSubProcessing ? 'text-orange-600' : isSubCompleted ? 'text-green-700' : 'text-gray-900'}
                                    `}>
                                      {subStep.title}
                                    </h4>
                                    {isSubProcessing && (
                                      <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                    {subStep.description}
                                  </p>
                                  
                                  {/* Progress bar for active sub-step */}
                                  {isSubProcessing && (
                                    <div className="relative h-2 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm mt-3 shadow-inner">
                                      <div 
                                        className="absolute inset-y-0 left-0 bg-linear-to-r from-orange-500 via-orange-400 to-rose-500 rounded-full shadow-lg"
                                        style={{
                                          width: '0%',
                                          animation: 'progress 2s ease-out forwards',
                                        }}
                                      >
                                        {/* Shimmer on progress */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                                        {/* Glass shine */}
                                        <div className="absolute inset-0 bg-linear-to-b from-white/40 to-transparent"></div>
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-orange-400 blur-sm opacity-50"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Premium Status indicator */}
                                <div className="shrink-0">
                                  {isSubCompleted && (
                                    <div className="relative">
                                      {/* Success ping */}
                                      <div className="absolute inset-0 bg-green-400 rounded-xl animate-ping opacity-40"></div>
                                      <div className="relative w-7 h-7 bg-green-500 rounded-xl flex items-center justify-center shadow-xl shadow-green-500/50">
                                        <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-xl"></div>
                                        <CheckCircle className="w-4.5 h-4.5 text-white relative z-10" strokeWidth={2.5} />
                                      </div>
                                    </div>
                                  )}
                                  {isSubProcessing && (
                                    <div className="relative w-7 h-7">
                                      {/* Outer glow ring */}
                                      <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-md animate-pulse"></div>
                                      {/* Spinning loader */}
                                      <div className="relative w-full h-full border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin shadow-lg"></div>
                                      {/* Center dot */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Completion celebration effect */}
                              {isSubCompleted && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                              )}
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
                                <div className="relative">
                                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-60"></div>
                                </div>
                                <span className="text-xs font-black text-green-600 tracking-wide">
                                  ✓ COMPLETED
                                </span>
                              </>
                            ) : isActive ? (
                              <>
                                <div className="relative">
                                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
                                  <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-40"></div>
                                </div>
                                <span className="text-xs font-black text-orange-600 tracking-wide">
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
                            <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
                              <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                              <span className="text-[10px] font-black text-orange-700">
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

                    {/* Decorative corner glow */}
                    <div className={`
                      absolute -bottom-8 -right-8 w-32 h-32 rounded-full
                      bg-linear-to-br ${step.color}
                      blur-2xl transition-opacity duration-500 pointer-events-none
                      ${isActive ? 'opacity-20' : 'opacity-0'}
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium progress indicator */}
          <div className="mt-16 max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* Step labels */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center gap-2 transition-all duration-300"
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-500
                    ${activeStep > index 
                      ? 'bg-green-500 text-white scale-110' 
                      : activeStep === index 
                        ? 'bg-orange-500 text-white scale-110 animate-pulse' 
                        : 'bg-gray-300 text-gray-500'
                    }
                  `}>
                    {activeStep > index ? (
                      <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`
                    text-xs md:text-sm font-medium transition-colors duration-300
                    ${activeStep >= index ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    Step {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

