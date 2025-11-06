'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import SignInModal from './auth/SignInModal';

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
        {/* Premium glassmorphic background */}
        <div className={`
          absolute inset-0 transition-all duration-700 ease-out
          ${scrolled 
            ? 'bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-900/10 border-2 border-white/60' 
            : 'bg-white/40 backdrop-blur-xl border-b border-white/30'
          }
        `}
        style={{
          boxShadow: scrolled 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.08), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)'
            : 'none',
        }}
        >
          {/* Multi-layer glass reflections */}
          <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/40 to-transparent opacity-60 rounded-3xl"></div>
          <div className="absolute inset-0 bg-linear-to-tl from-white/30 via-transparent to-transparent opacity-40 rounded-3xl"></div>
          
          {/* Top edge highlight */}
          <div className={`
            absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent
            ${scrolled ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-700
          `}></div>
          
          {/* Shimmer effect on scroll */}
          {scrolled && (
            <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1500"></div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className={`
            relative flex justify-between items-center transition-all duration-700
            ${scrolled ? 'h-14 md:h-16 px-4 md:px-5' : 'h-16 md:h-20 px-4 md:px-6 lg:px-8'}
          `}>
            {/* Premium Logo */}
            <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
              {/* Enhanced logo with rotating ring */}
              <div className="relative">
                {/* Rotating outer ring */}
                <div className={`
                  absolute inset-0 rounded-2xl border-2 border-dashed transition-all duration-700
                  ${scrolled ? 'border-orange-400/30 opacity-100' : 'border-orange-400/20 opacity-0'}
                  animate-spin-slow
                `}></div>
                
                {/* Logo container */}
                <div className={`
                  relative bg-linear-to-br from-orange-500 via-rose-500 to-pink-500 
                  rounded-2xl flex items-center justify-center transition-all duration-700 overflow-hidden
                  ${scrolled 
                    ? 'w-9 h-9 md:w-11 md:h-11 shadow-xl shadow-orange-500/30' 
                    : 'w-10 h-10 md:w-12 md:h-12 shadow-lg shadow-orange-500/20'
                  }
                  group-hover:scale-110 group-hover:rotate-3
                `}
                style={{
                  boxShadow: scrolled
                    ? '0 10px 25px -5px rgba(249, 115, 22, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.4)'
                    : '0 5px 15px -3px rgba(249, 115, 22, 0.3), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
                }}
                >
                  {/* Glass reflections */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent rounded-2xl"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent rounded-t-2xl"></div>
                  
                  {/* Sparkle icon instead of letter */}
                  <Sparkles className={`
                    text-white relative z-10 transition-all duration-700
                    ${scrolled ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5 md:w-7 md:h-7'}
                  `} strokeWidth={2.5} />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-400 to-rose-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating particles */}
                {scrolled && (
                  <>
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-rose-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                  </>
                )}
              </div>
              
              {/* Brand name with gradient */}
              <div className="flex flex-col">
                <span className={`
                  font-black tracking-tight transition-all duration-700
                  bg-linear-to-r from-gray-900 via-orange-900 to-gray-900 bg-clip-text text-transparent
                  group-hover:from-orange-600 group-hover:via-rose-600 group-hover:to-pink-600
                  ${scrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'}
                `}>
                  JobVita
                </span>
                {!scrolled && (
                  <span className="text-[10px] font-bold text-orange-600 tracking-wider animate-fadeInUp">
                    AI-POWERED
                  </span>
                )}
              </div>
            </div>

            {/* Premium Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative px-4 lg:px-5 py-2 rounded-xl font-semibold transition-all duration-500
                    text-gray-700 hover:text-gray-900
                    ${scrolled ? 'text-sm' : 'text-base'}
                    group overflow-hidden
                  `}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
                  
                  {/* Border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-orange-200/0 group-hover:border-orange-200/60 transition-all duration-500"></div>
                  
                  {/* Glass reflection on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Underline indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-orange-500 to-rose-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
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
                style={{
                  boxShadow: '0 4px 12px -3px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-xl"></div>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 relative z-10 transition-all duration-300 rotate-90" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 relative z-10 transition-all duration-300" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Premium CTA Button - Desktop */}
            <button 
              onClick={() => setIsSignInOpen(true)}
              className={`
              hidden md:flex relative px-5 py-2 md:px-7 md:py-2.5 rounded-2xl font-black transition-all duration-700
              bg-linear-to-r from-gray-900 via-gray-800 to-gray-900
              text-white overflow-hidden group items-center gap-2
              ${scrolled 
                ? 'text-sm md:text-base shadow-xl shadow-gray-900/30' 
                : 'text-sm md:text-base shadow-lg shadow-gray-900/20'
              }
              hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5
            `}
            style={{
              boxShadow: scrolled
                ? '0 10px 30px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
                : '0 5px 20px -5px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
            }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
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
            bg-white/80 backdrop-blur-3xl
            border-l-2 border-white/40
            shadow-2xl
            transition-transform duration-500 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '-10px 0 50px -12px rgba(0, 0, 0, 0.3), inset 2px 0 0 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Multi-layer glass reflections */}
          <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/60 to-transparent opacity-70"></div>
          <div className="absolute inset-0 bg-linear-to-tl from-white/40 via-transparent to-transparent opacity-50"></div>
          
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
          
          {/* Side edge highlight */}
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
                    relative block px-6 py-4 rounded-2xl font-bold text-lg
                    text-gray-800 transition-all duration-300
                    group overflow-hidden
                    ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-rose-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                  
                  {/* Border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-orange-200/0 group-hover:border-orange-200/60 transition-all duration-300"></div>
                  
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/70 to-transparent rounded-2xl opacity-60"></div>
                  
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-orange-500 to-rose-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10 flex items-center justify-between">
                    {link.label}
                    <Sparkles className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={2.5} />
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
                  relative w-full px-6 py-4 rounded-2xl font-black text-base
                  bg-linear-to-r from-gray-900 via-gray-800 to-gray-900
                  text-white overflow-hidden group
                  transition-all duration-300
                  hover:shadow-2xl hover:shadow-orange-500/40
                  ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
                `}
                style={{
                  animationDelay: '300ms',
                  boxShadow: '0 10px 30px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
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

