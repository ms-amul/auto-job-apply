'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../Container';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';

export default function ParallaxStats() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
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
      color: 'from-orange-500 to-red-500',
      delay: '0s',
    },
    {
      icon: Users,
      value: '2.5K+',
      label: 'Happy Users',
      color: 'from-blue-500 to-indigo-500',
      delay: '0.2s',
    },
    {
      icon: TrendingUp,
      value: '5x',
      label: 'Faster Job Search',
      color: 'from-green-500 to-emerald-500',
      delay: '0.4s',
    },
    {
      icon: Award,
      value: '87%',
      label: 'Success Rate',
      color: 'from-purple-500 to-pink-500',
      delay: '0.6s',
    }
  ];

  // Reduce parallax on mobile
  const parallaxOffset = isVisible && !isMobile ? (scrollY * 0.1) % 50 : 0;

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500 via-rose-500 to-pink-500">
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
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden">
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Icon */}
                    <div className={`
                      w-12 h-12 md:w-16 md:h-16
                      bg-linear-to-br ${stat.color}
                      rounded-2xl
                      flex items-center justify-center
                      mb-4
                      transform group-hover:scale-110 group-hover:rotate-6
                      transition-all duration-500
                      shadow-lg
                    `}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Value */}
                    <div
                      className="text-4xl md:text-6xl font-bold text-white mb-2 animate-countUp"
                      style={{ animationDelay: stat.delay }}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm md:text-base text-orange-100 font-medium">
                      {stat.label}
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom text */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their job search with AI automation
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

