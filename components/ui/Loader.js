/**
 * Loader Component
 * Beautiful animated loader with brand initials
 * 
 * Features:
 * - Animated brand initials with gradient
 * - Pulsing glow effect
 * - Rotating ring animation
 * - Smooth fade-in entrance
 * - Optional loading text
 */

'use client';

import { theme } from '@/utils/theme';
import { brand } from '@/utils/brand';

export default function Loader({ 
  size = 'md', 
  text = '', 
  fullScreen = false,
  className = '' 
}) {
  const sizes = {
    sm: { container: 'w-12 h-12', text: 'text-xs', logo: 'text-xl' },
    md: { container: 'w-20 h-20', text: 'text-sm', logo: 'text-3xl' },
    lg: { container: 'w-32 h-32', text: 'text-base', logo: 'text-5xl' },
  };

  const currentSize = sizes[size] || sizes.md;

  const loaderContent = (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* Animated Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring with gradient */}
        <div 
          className={`absolute ${currentSize.container} rounded-full animate-spin`}
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${theme.accentPrimary} 50%, ${theme.accentSecondary} 100%)`,
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))',
            animationDuration: '1s',
            animationTimingFunction: 'linear',
          }}
        />

        {/* Middle rotating ring - opposite direction */}
        <div 
          className={`absolute ${currentSize.container} rounded-full animate-spin-reverse opacity-40`}
          style={{
            background: `conic-gradient(from 180deg, transparent 0%, ${theme.accentSecondary} 50%, ${theme.accentPrimary} 100%)`,
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 3px))',
            animationDuration: '1.5s',
            animationTimingFunction: 'linear',
          }}
        />

        {/* Pulsing glow */}
        <div 
          className={`absolute ${currentSize.container} rounded-full blur-xl opacity-20 animate-pulse-slow`}
          style={{
            background: theme.getAccentGradient(135),
          }}
        />

        {/* Brand Logo with enhanced fill animation */}
        <div className="relative">
          {/* Background text (outline) */}
          <div 
            className={`${currentSize.logo} font-bold tracking-tight text-slate-200`}
          >
            {brand.logo.initials}
          </div>
          
          {/* Animated fill with gradient */}
          <div 
            className={`absolute inset-0 ${currentSize.logo} font-bold tracking-tight overflow-hidden`}
          >
            <div 
              className="animate-fillText"
              style={{
                background: theme.getAccentGradient(135),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {brand.logo.initials}
            </div>
          </div>

          {/* Shimmer overlay */}
          <div 
            className={`absolute inset-0 ${currentSize.logo} font-bold tracking-tight overflow-hidden`}
          >
            <div 
              className="animate-shimmer-text"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
              }}
            >
              {brand.logo.initials}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Text with dots animation */}
      {text && (
        <div className="flex items-center gap-1 mt-10">
          <p className={`${currentSize.text} text-slate-600 font-medium`}>
            {text}
          </p>
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
}

/**
 * Inline Loader - Small loader for buttons and inline use
 */
export function InlineLoader({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative w-5 h-5">
        {/* Spinning ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: 'currentColor',
            borderRightColor: 'currentColor',
          }}
        />
        {/* Brand initials mini */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-60"
          style={{
            background: theme.getAccentGradient(135),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {brand.logo.initials}
        </div>
      </div>
    </div>
  );
}

/**
 * Page Loader - For full page loading states
 */
export function PageLoader({ text = '' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Loader size="lg" text={text} />
    </div>
  );
}

/**
 * Card Loader - For loading states within cards
 */
export function CardLoader({ text = '' }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader size="md" text={text} />
    </div>
  );
}
