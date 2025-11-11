'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { TrendingUp, Users, Zap, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '@/utils/theme';
import SignInModal from '../auth/SignInModal';

export default function ParallaxStats() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const sectionRef = useRef(null);
  const { isMobile, isReducedMotion } = useMobile();

  useEffect(() => {
    // Generate fewer particles on mobile
    const particleCount = isMobile ? 3 : 15;
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
        parallaxMultiplier: 1 + i * 0.1,
      }))
    );
  }, [isMobile]);

  useEffect(() => {
    // Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
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

  const stats = [
    {
      icon: Zap,
      value: '10K+',
      label: 'Applications Sent',
      delay: '0s',
    },
    {
      icon: Users,
      value: '2.5K+',
      label: 'Happy Users',
      delay: '0.2s',
    },
    {
      icon: TrendingUp,
      value: '5x',
      label: 'Faster Job Search',
      delay: '0.4s',
    },
    {
      icon: Award,
      value: '87%',
      label: 'Success Rate',
      delay: '0.6s',
    }
  ];

  // Reduce parallax on mobile
  const parallaxOffset = isVisible && !isMobile ? (scrollY * 0.1) % 50 : 0;

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden"
    >
      {/* Animated gradient background with accent colors */}
      <div 
        className="absolute inset-0"
        style={{ background: theme.getAccentGradient(135) }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
            transform: `translateY(${parallaxOffset}px)`,
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transform: `translateY(${parallaxOffset * particle.parallaxMultiplier}px)`,
            }}
          ></div>
        ))}
      </div>

      <Container>
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const cardOffset = isVisible ? Math.sin((scrollY + index * 100) * 0.01) * 10 : 0;

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    transform: `translateY(${cardOffset}px)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border-2 border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden shadow-xl">
                    {/* Glass reflection layers */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    
                    {/* Subtle shine effect on hover - no movement */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Frosted glass icon container with corner shading */}
                    <div className="relative z-10 flex justify-center mb-5">
                      {/* Outer glow with theme colors */}
                      <div 
                        className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                        style={{ background: theme.getAccentGradient(135) }}
                      ></div>
                      
                      {/* Main frosted glass container */}
                      <div 
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center transition-all duration-300 overflow-hidden"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: `
                            0 8px 32px 0 rgba(5, 101, 146, 0.15),
                            inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                            0 0 0 1px rgba(255, 255, 255, 0.2)
                          `
                        }}
                      >
                        {/* Frosted glass reflection - top left corner */}
                        <div 
                          className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl pointer-events-none"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%)',
                          }}
                        ></div>
                        
                        {/* Theme color accent - top right corner */}
                        <div 
                          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-3xl pointer-events-none"
                          style={{ 
                            background: `radial-gradient(circle at top right, ${theme.accentPrimary}40 0%, transparent 70%)`,
                          }}
                        ></div>
                        
                        {/* Theme color accent - bottom left corner */}
                        <div 
                          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-3xl pointer-events-none"
                          style={{ 
                            background: `radial-gradient(circle at bottom left, ${theme.accentSecondary}40 0%, transparent 70%)`,
                          }}
                        ></div>
                        
                        {/* Subtle bottom shadow for depth */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/10 to-transparent rounded-b-3xl pointer-events-none"></div>
                        
                        {/* Icon with theme color */}
                        <Icon 
                          className="relative z-10 w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" 
                          strokeWidth={2.5}
                          style={{ color: 'white' }}
                        />
                      </div>
                    </div>

                    {/* Value */}
                    <div
                      className="relative z-10 text-3xl md:text-4xl font-black text-white mb-2 text-center drop-shadow-xl animate-countUp"
                      style={{ animationDelay: stat.delay }}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="relative z-10 text-xs md:text-sm text-white font-semibold text-center leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Classy CTA Section with Curved Waves */}
          <div className="mt-16 md:mt-20">
            <div 
              className="relative mx-auto rounded-[3rem] p-8 overflow-hidden shadow-2xl"
              style={{ background: theme.getAccentGradient(-35) }}
            >
              {/* Elegant curved wave patterns on the right - More visible */}
              <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 pointer-events-none">
                {/* Wave 1 - Innermost (Most visible) */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                  style={{
                    right: '-100px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 70%)',
                    filter: 'blur(1px)',
                  }}
                ></div>
                {/* Wave 2 */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full"
                  style={{
                    right: '-150px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%)',
                    filter: 'blur(1px)',
                  }}
                ></div>
                {/* Wave 3 */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
                  style={{
                    right: '-200px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 70%)',
                    filter: 'blur(2px)',
                  }}
                ></div>
                {/* Wave 4 - Outermost */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full"
                  style={{
                    right: '-250px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
                    filter: 'blur(2px)',
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-xl">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  Ready to land your dream job?
                </h2>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-white/90 mb-8 leading-relaxed">
                  Your AI-powered job search assistant is ready to help you succeed. Let's get started.
                </p>

                {/* CTA Buttons - Classy black pills */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsSignInOpen(true)}
                    className="group relative cursor-pointer bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 inline-flex items-center justify-between gap-3 shadow-lg hover:shadow-xl"
                  >
                    <span>Start Applying for Free</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                  </button>

                  <button 
                    onClick={() => setIsSignInOpen(true)}
                    className="group relative cursor-pointer bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 inline-flex items-center justify-between gap-3 shadow-lg hover:shadow-xl"
                  >
                    <span>View Features</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                  </button>
                </div>

                {/* Subtle benefits note */}
                <p className="text-xs text-white/70 mt-5">
                  No credit card required • 100 free applications • Start in 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </section>
  );
}

