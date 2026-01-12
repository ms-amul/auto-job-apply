'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Container from '../Container';
import CinematicPlayer from '../ui/CinematicPlayer';
import { ArrowRight, Play, Sparkles, Star, Trophy, Rocket, Send, Mail, Target, PartyPopper, Search, Briefcase, Palette } from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { theme } from '../../utils/theme';
import { brand } from '../../utils/brand';
import Animation from './Animation';

export default function HeroParallax() {
  const router = useRouter();
  const { status } = useSession();
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
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
        background: `radial-gradient(1200px 600px at 100% 0%, ${theme.accentPrimary}08, transparent 70%), radial-gradient(1000px 500px at 0% 100%, ${theme.accentSecondary}06, transparent 70%), linear-gradient(180deg, #ffffff, #fafafa)`,
      }}
    >
      {/* Premium layered background with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${theme.accentPrimary}06, transparent 70%)` }}></div>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom left, ${theme.accentSecondary}04, transparent 70%)` }}></div>

        {/* Multi-layered floating orbs - reduced on mobile */}
        {!isMobile && (
          <>
            <div
              className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{
                background: theme.getAccentGradient(135),
                opacity: 0.12,
                transform: shouldAnimate ? `translate(${parallaxSpeed * 0.3}px, ${parallaxSpeed * 0.4}px) scale(${1 + scrollY * 0.0001})` : 'none',
              }}
            ></div>
            <div
              className={`absolute top-40 -right-32 w-[500px] h-[500px] rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{
                background: theme.getAccentGradient(45),
                opacity: 0.1,
                transform: shouldAnimate ? `translate(${parallaxSpeed * -0.5}px, ${parallaxSpeed * 0.6}px) scale(${1 + scrollY * 0.00012})` : 'none',
                animationDelay: '1s',
              }}
            ></div>
            <div
              className={`absolute bottom-20 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${shouldAnimate ? 'animate-float' : ''}`}
              style={{
                background: theme.getAccentGradient(180),
                opacity: 0.08,
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
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center pt-10">
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
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-4 animate-fadeInUp tracking-tight"
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
                  className="absolute -bottom-1 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 9C50 4 150 4 198 9"
                    stroke="url(#gradient)"
                    strokeWidth="3"
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
              className="text-base sm:text-lg text-gray-700 mb-4 max-w-2xl mx-auto lg:mx-0 animate-fadeInUp font-medium leading-relaxed"
              style={{
                animationDuration: '1.2s',
                animationDelay: '0.6s',
                transform: `translateY(${parallaxSpeed * 0.08}px)`,
              }}
            >
              Join <span className="font-bold bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>2,500+</span> professionals who automated their job search and landed{' '}
              <span className="font-bold bg-clip-text text-transparent" style={{ backgroundImage: theme.getAccentGradient(90) }}>5x more interviews</span> in half the time.
            </p>

            {/* Premium Glassmorphic Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4 animate-fadeInUp"
              style={{
                animationDuration: '1.2s',
                animationDelay: '0.8s',
                transform: `translateY(${parallaxSpeed * 0.1}px)`,
              }}
            >
              {status === 'authenticated' ? (
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="cursor-pointer relative group text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  style={{
                    background: theme.getAccentGradient(90),
                    boxShadow: `0 15px 30px -8px ${theme.accentPrimary}80`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  {/* Glass shine effect */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="cursor-pointer relative group text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  style={{
                    background: theme.getAccentGradient(90),
                    boxShadow: `0 15px 30px -8px ${theme.accentPrimary}80`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Applying for Free
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  {/* Glass shine effect */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="cursor-pointer relative bg-white/60 backdrop-blur-xl border-2 border-white/80 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-md overflow-hidden hover:shadow-lg transition-all active:scale-95"
                style={{
                  boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Content - Super Premium Modular Animation */}
          <div className="relative hidden lg:block">
            <Animation parallaxSpeed={parallaxSpeed} />
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      {/* Cinematic Dock Player (Replaces Modal) */}
      <CinematicPlayer
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="DWHQl3rTtwo"
        title={`${brand.getName()} Demo`}
      />
    </section >
  );
}

