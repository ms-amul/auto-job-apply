'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { Settings, Sparkles, Target, CheckCircle, ArrowRight } from 'lucide-react';

export default function ProcessParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Calculate which step should be active based on scroll position
        if (sectionTop < window.innerHeight / 2 && sectionTop > -sectionHeight / 2) {
          const progress = (window.innerHeight / 2 - sectionTop) / (sectionHeight / 3);
          const step = Math.min(Math.floor(progress), 2);
          setActiveStep(step);
        }
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
      className="relative py-32 md:py-48 bg-linear-to-b from-gray-50 to-white overflow-hidden"
      style={{ minHeight: '150vh' }}
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

      <div className="sticky top-0 min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              From job seeker to interview-ready in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep >= index;
              const scale = isActive ? 1 : 0.95;
              const opacity = isActive ? 1 : 0.5;

              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    transform: `scale(${scale}) translateY(${isActive ? 0 : 20}px)`,
                    opacity: opacity,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Connecting line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0">
                      <ArrowRight className="absolute -right-3 -top-2 w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  <div className={`
                    relative bg-white rounded-3xl p-8
                    border-2 ${isActive ? 'border-orange-300' : 'border-gray-200'}
                    shadow-xl hover:shadow-2xl
                    transition-all duration-500
                    overflow-hidden
                    group
                  `}>
                    {/* Background glow */}
                    <div className={`
                      absolute inset-0 bg-linear-to-br ${step.color}
                      opacity-0 group-hover:opacity-5
                      transition-opacity duration-500
                    `}></div>

                    {/* Step number */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className={`
                      relative w-20 h-20
                      bg-linear-to-br ${step.color}
                      rounded-2xl
                      flex items-center justify-center
                      mb-6
                      transform ${isActive ? 'scale-100 rotate-0' : 'scale-90 rotate-12'}
                      transition-all duration-500
                      shadow-lg
                    `}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      
                      {/* Pulse effect when active */}
                      {isActive && (
                        <div className={`
                          absolute inset-0 rounded-2xl
                          bg-linear-to-br ${step.color}
                          animate-ping opacity-25
                        `}></div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Check icon when active */}
                    {isActive && (
                      <div className="flex items-center gap-2 text-green-600 animate-fadeIn">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">Ready</span>
                      </div>
                    )}

                    {/* Decorative emoji */}
                    <div className="absolute bottom-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {step.image}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <span 
                  key={index}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeStep >= index ? 'text-orange-600' : 'text-gray-400'
                  }`}
                >
                  Step {index + 1}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

