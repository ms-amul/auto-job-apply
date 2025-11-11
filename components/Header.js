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
        {/* Premium glass background - only visible when scrolled */}
        <div 
          className={`
            absolute inset-0 
            border border-transparent
            transition-all duration-700 ease-out
            ${scrolled 
              ? 'bg-white/75 backdrop-blur-xl rounded-2xl shadow-xl' 
              : 'bg-transparent'
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
                  className="group relative px-4 py-2 rounded-xl font-semibold text-sm overflow-hidden"
                >
                  {/* Premium hover background with glow */}
                  <div 
                    className="absolute inset-0 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                    style={{
                      boxShadow: `0 4px 16px -4px ${theme.accentPrimary}20, inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
                    }}
                  ></div>
                  
                  {/* Subtle accent gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300"
                    style={{ background: theme.getAccentGradient(135) }}
                  ></div>
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                  
                  {/* Text with scale effect */}
                  <span className="relative z-10 text-gray-800 group-hover:text-gray-900 transition-all duration-300 group-hover:scale-105 inline-block">
                    {link.label}
                  </span>
                  
                  {/* Bottom accent line that slides up on hover */}
                  <div 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 rounded-full transition-all duration-300 ease-out"
                    style={{ background: theme.getAccentGradient(90) }}
                  ></div>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                  group cursor-pointer relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 overflow-hidden
                  ${scrolled 
                    ? 'bg-white/30 border border-white/40 hover:bg-white/50 hover:shadow-lg' 
                    : 'bg-white/10 border border-white/20 hover:bg-white/25 hover:shadow-md'
                  }
                `}
                aria-label="Toggle menu"
              >
                {/* Glass reflection on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-800 relative z-10 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-800 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
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
                className="group cursor-pointer relative px-4 py-1.5 rounded-full font-semibold transition-all duration-300 text-white flex items-center gap-1.5 text-sm hover:scale-105 hover:shadow-xl active:scale-95 overflow-hidden"
                style={{ 
                  background: theme.getAccentGradient(90),
                  boxShadow: `0 4px 12px -2px ${theme.accentPrimary}40`
                }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>
                
                <span className="relative z-10">Get Started</span>
                <Sparkles className="w-3.5 h-3.5 relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
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
            <nav className="flex-1 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative block px-4 py-3 rounded-xl font-semibold text-base overflow-hidden"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Premium hover background with glow */}
                  <div 
                    className="absolute inset-0 bg-white/60 backdrop-blur-md border border-white/70 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 ease-out"
                    style={{
                      boxShadow: `0 4px 16px -4px ${theme.accentPrimary}20, inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`,
                    }}
                  ></div>
                  
                  {/* Subtle accent gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300"
                    style={{ background: theme.getAccentGradient(135) }}
                  ></div>
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/50 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                  
                  {/* Text with slight transform */}
                  <span className="relative z-10 text-gray-800 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1 inline-block">
                    {link.label}
                  </span>
                  
                  {/* Left accent bar that slides in on hover */}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0 group-hover:w-1 h-2/3 rounded-r-full transition-all duration-300 ease-out"
                    style={{ background: theme.getAccentGradient(90) }}
                  ></div>
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
                className="group relative w-full px-4 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                style={{
                  background: theme.getAccentGradient(90),
                  boxShadow: `0 8px 20px -4px ${theme.accentPrimary}40`
                }}
              >
                {/* Animated shine effect on hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-xl"></div>
                
                <span className="relative z-10">Get Started</span>
                <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
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

