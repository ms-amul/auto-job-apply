'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { Settings, Sparkles, Target, CheckCircle, ArrowRight } from 'lucide-react';

export default function ProcessParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Auto-advance through steps with clean animation
  useEffect(() => {
    if (!isVisible || activeStep >= 2) return; // Stop if we've reached the last step

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        // Stop at the last step (step 2)
        if (prev < 2) {
          return prev + 1;
        }
        return prev; // Stay at step 2
      });
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, [isVisible, activeStep]); // Re-run when activeStep changes to clear interval

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
      description: 'Tell us your dream role, skills, salary expectations, and location preferences. Our AI will understand your unique career goals.',
      color: 'from-blue-500 to-cyan-500',
      image: '🎯',
    },
    {
      icon: Sparkles,
      title: 'AI Does the Work',
      description: 'Our advanced AI searches thousands of jobs across multiple platforms, matches your profile, and applies automatically.',
      color: 'from-purple-500 to-pink-500',
      image: '🤖',
    },
    {
      icon: Target,
      title: 'Get Interviews',
      description: 'Track responses in real-time, prepare for interviews, and land your dream job. We handle the applications, you handle the success.',
      color: 'from-orange-500 to-red-500',
      image: '🎉',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 50px, #000 50px, #000 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, #000 50px, #000 51px)
            `,
            transform: `translateY(${scrollY * 0.1}px)`,
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

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    transform: `scale(${isActive ? 1.05 : 1}) translateY(${isActive ? -10 : 0}px)`,
                    opacity: isPast ? 0.7 : 1,
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                    relative bg-white rounded-3xl p-8
                    border-2 transition-all duration-500
                    ${isActive 
                      ? 'border-orange-400 shadow-2xl shadow-orange-200/50' 
                      : isPast 
                        ? 'border-green-300 shadow-xl' 
                        : 'border-gray-200 shadow-xl'
                    }
                    hover:shadow-2xl
                    overflow-hidden
                    group
                  `}>
                    {/* Active glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-linear-to-br from-orange-100/50 via-red-100/30 to-transparent animate-pulse"></div>
                    )}

                    {/* Background gradient on hover */}
                    <div className={`
                      absolute inset-0 bg-linear-to-br ${step.color}
                      opacity-0 group-hover:opacity-5
                      transition-opacity duration-500
                    `}></div>

                    {/* Step number badge */}
                    <div className={`
                      absolute top-4 right-4 w-12 h-12 rounded-full 
                      flex items-center justify-center transition-all duration-500
                      ${isPast 
                        ? 'bg-green-500' 
                        : isActive 
                          ? `bg-linear-to-br ${step.color}` 
                          : 'bg-gray-100'
                      }
                    `}>
                      {isPast ? (
                        <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                      ) : (
                        <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Icon with enhanced animations */}
                    <div className="relative w-24 h-24 mb-6">
                      {/* Rotating ring when active */}
                      {isActive && (
                        <div className={`
                          absolute inset-0 rounded-2xl border-4 border-transparent
                          bg-linear-to-br ${step.color} bg-origin-border
                          animate-spin-slow opacity-30
                        `}
                        style={{ 
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          padding: '4px'
                        }}
                        ></div>
                      )}
                      
                      {/* Icon container */}
                      <div className={`
                        relative w-full h-full
                        bg-linear-to-br ${step.color}
                        rounded-2xl
                        flex items-center justify-center
                        transform transition-all duration-500
                        ${isActive 
                          ? 'scale-110 rotate-0' 
                          : isPast 
                            ? 'scale-100 rotate-0' 
                            : 'scale-95 rotate-6'
                        }
                        shadow-lg
                      `}>
                        <Icon className="w-12 h-12 text-white relative z-10" strokeWidth={2} />
                        
                        {/* Ping effect when active */}
                        {isActive && (
                          <div className={`
                            absolute inset-0 rounded-2xl
                            bg-linear-to-br ${step.color}
                            animate-ping opacity-30
                          `}></div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`
                      text-2xl md:text-3xl font-bold mb-4 transition-all duration-500
                      ${isActive 
                        ? 'bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-red-500' 
                        : 'text-gray-900'
                      }
                    `}>
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      {isPast ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>Completed</span>
                        </div>
                      ) : isActive ? (
                        <div className="flex items-center gap-2 text-orange-600">
                          <div className="relative">
                            <div className="w-5 h-5 border-3 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                          <span>Pending</span>
                        </div>
                      )}
                    </div>

                    {/* Decorative corner accent */}
                    <div className={`
                      absolute -bottom-6 -right-6 w-24 h-24 rounded-full
                      bg-linear-to-br ${step.color}
                      blur-2xl transition-opacity duration-500
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

