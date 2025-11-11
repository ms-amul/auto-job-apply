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
        ${scrolled ? 'py-3' : ''}
      `}
    >
      <div className={`
        relative transition-all duration-700 ease-out
        ${scrolled ? 'max-w-5xl mx-auto px-4' : 'max-w-7xl mx-auto'}
      `}>
        {/* Minimal glass background */}
        <div 
          className={`
            absolute inset-0 
            backdrop-blur-md
            border border-transparent
            transition-all duration-700 ease-out
            ${scrolled 
              ? 'bg-white/75 backdrop-blur-xl rounded-2xl shadow-xl' 
              : 'bg-white/30'
            }
          `}
          style={{
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
            boxShadow: scrolled 
              ? `0 10px 40px -10px ${theme.accentPrimary}20, 0 4px 16px -4px rgba(0,0,0,0.12)`
              : 'none',
          }}
        >
        </div>

        <div>
          <div className={`
            relative flex justify-between items-center transition-all duration-700
            ${scrolled ? 'h-14 px-4' : 'h-16 px-4 md:px-6'}
          `}>
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                {/* Glow effect - fades in when scrolled */}
                <div 
                  className="absolute inset-0 rounded-lg blur-md transition-all duration-700 ease-out group-hover:opacity-70"
                  style={{ 
                    background: theme.getAccentGradient(135),
                    opacity: scrolled ? 0.5 : 0,
                  }}
                ></div>
                
                <div className={`
                  relative rounded-lg flex items-center justify-center transition-all duration-700 ease-out overflow-hidden
                  ${scrolled ? 'w-8 h-8' : 'w-9 h-9'}
                  group-hover:scale-105
                `}
                style={{ background: theme.getAccentGradient(135) }}
                >
                  <Sparkles className={`
                    text-white relative z-10 transition-all duration-700 ease-out
                    ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}
                  `} strokeWidth={2.5} />
                </div>
              </div>
              
              <span className={`
                font-black tracking-tight transition-all duration-700 ease-out
                bg-clip-text text-transparent
                ${scrolled ? 'text-base' : 'text-lg'}
              `}
              style={{ backgroundImage: theme.getAccentGradient(90) }}>
                JobVita
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                    text-gray-700 hover:text-gray-900 hover:bg-white/40
                    text-sm
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-9 h-9 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center transition-all duration-200 hover:bg-white/30 active:scale-95"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block relative">
              {/* Glow effect - fades in when scrolled */}
              <div 
                className="absolute inset-0 rounded-lg blur-lg transition-opacity duration-700 ease-out"
                style={{ 
                  background: theme.getAccentGradient(90),
                  opacity: scrolled ? 0.4 : 0,
                }}
              ></div>
              
              <button 
                onClick={() => setIsSignInOpen(true)}
                className="relative px-4 py-1.5 rounded-lg font-semibold transition-all duration-200 text-white flex items-center gap-1.5 text-sm hover:opacity-90 active:scale-95"
                style={{ background: theme.getAccentGradient(90) }}
              >
                Get Started
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-300
          ${isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Backdrop */}
        <div 
          className={`
            absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
        ></div>

        {/* Menu Panel */}
        <div 
          className={`
            absolute top-0 right-0 h-full w-[280px]
            bg-white/80 backdrop-blur-xl
            border-l border-white/50
            shadow-xl
            transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"></div>

          {/* Menu Content */}
          <div className="relative z-10 h-full flex flex-col pt-16 pb-6 px-4">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/30 border border-white/40 flex items-center justify-center transition-all duration-200 hover:bg-white/40 active:scale-95"
            >
              <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            </button>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative block px-4 py-3 rounded-lg font-medium text-base text-gray-800 transition-all duration-200 hover:bg-white/40 active:scale-95"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="pt-4 border-t border-white/30">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSignInOpen(true);
                }}
                className="relative w-full px-4 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-1.5"
                style={{
                  background: theme.getAccentGradient(90),
                }}
              >
                Get Started
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
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

