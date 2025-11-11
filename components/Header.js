'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import SignInModal from './auth/SignInModal';
import { theme } from '../utils/theme';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click or scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('nav')) {
          setIsMobileMenuOpen(false);
        }
      };
      const handleScroll = () => setIsMobileMenuOpen(false);
      
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#pricing', label: 'Pricing' },
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
        ${scrolled 
          ? 'py-2 md:py-3'
          : 'py-3 md:py-4'
        }
      `}
    >
      <div className={`
        relative transition-all duration-700 ease-out
        ${scrolled ? 'mx-4 md:mx-8 lg:mx-12' : 'mx-0'}
      `}>
        {/* Minimal glass background */}
        <div className={`
          absolute inset-0 transition-all duration-700 ease-out
          ${scrolled 
            ? 'bg-white/65 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-900/10 border border-white/50' 
            : 'bg-white/35 backdrop-blur-md border-b border-white/30'
          }
        `}
        >
          <div className={`
            absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent
            ${scrolled ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-700
          `}></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className={`
            relative flex justify-between items-center transition-all duration-700
            ${scrolled ? 'h-14 md:h-16 px-4 md:px-5' : 'h-16 md:h-20 px-4 md:px-6 lg:px-8'}
          `}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
              <div className="relative">
                <div className={`
                  relative rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden
                  ${scrolled 
                    ? 'w-9 h-9 md:w-11 md:h-11 shadow-md' 
                    : 'w-10 h-10 md:w-12 md:h-12 shadow'
                  }
                  group-hover:scale-105
                `}
                style={{ background: theme.getAccentGradient(135), border: '1px solid rgba(255,255,255,0.5)' }}
                >
                  <Sparkles className={`
                    text-white relative z-10 transition-all duration-300
                    ${scrolled ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5 md:w-7 md:h-7'}
                  `} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`
                  font-black tracking-tight transition-all duration-700
                  bg-clip-text text-transparent
                  ${scrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'}
                `}
                style={{ backgroundImage: theme.getAccentGradient(90) }}>
                  JobVita
                </span>
                {!scrolled && (
                  <span
                    className="text-[10px] font-bold tracking-wider"
                    style={{ color: theme.accentPrimary }}
                  >
                    AI-POWERED
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative px-4 lg:px-5 py-2 rounded-xl font-medium transition-all duration-300
                    text-gray-700 hover:text-gray-900 hover:bg-white/50
                    ${scrolled ? 'text-sm' : 'text-base'}
                    group
                  `}
                >
                  <span className="relative z-10">{link.label}</span>
                  <div
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-3/4 transition-all duration-300"
                    style={{ backgroundImage: theme.getAccentGradient(90) }}
                  ></div>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              {/* Hamburger Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/30 group"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-xl"></div>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 relative z-10 transition-all duration-300 rotate-90" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 relative z-10 transition-all duration-300" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* CTA Button - Desktop */}
            <button 
              onClick={() => setIsSignInOpen(true)}
              className={`
              hidden md:flex relative px-5 py-2 md:px-6 md:py-2 rounded-xl font-semibold transition-all duration-300
              text-white overflow-hidden items-center gap-2
              ${scrolled ? 'text-sm md:text-base' : 'text-sm md:text-base'}
            `}
            style={{ background: theme.getAccentGradient(90), border: '1px solid rgba(255,255,255,0.4)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out
          ${isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Backdrop with blur */}
        <div 
          className={`
            absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
        ></div>

        {/* Glass Menu Panel */}
        <div 
          className={`
            absolute top-0 right-0 h-full w-[85vw] max-w-sm
            bg-white/75 backdrop-blur-2xl
            border-l border-white/40
            shadow-xl
            transition-transform duration-500 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-transparent via-white/70 to-transparent"></div>

          {/* Menu Content */}
          <div className="relative z-10 h-full flex flex-col pt-20 pb-8 px-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group"
              style={{
                boxShadow: '0 4px 12px -3px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent rounded-xl"></div>
              <X className="w-5 h-5 text-gray-700 relative z-10 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            </button>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                  relative block px-6 py-4 rounded-2xl font-semibold text-lg
                    text-gray-800 transition-all duration-300
                  group
                    ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundImage: theme.getAccentGradient(180) }}
                ></div>
                  <span className="relative z-10 flex items-center justify-between">
                    {link.label}
                  <Sparkles
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    strokeWidth={2.5}
                    style={{ color: theme.accentPrimary }}
                  />
                  </span>
                </a>
              ))}
            </nav>

            {/* CTA Button in Menu */}
            <div className="pt-6 border-t border-white/20">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSignInOpen(true);
                }}
                className={`
                  relative w-full px-6 py-4 rounded-2xl font-semibold text-base
                  text-white overflow-hidden
                  transition-all duration-300
                  hover:opacity-95
                  ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
                `}
                style={{
                  animationDelay: '300ms',
                  background: theme.getAccentGradient(90),
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </nav>
  );
}

