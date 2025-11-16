/**
 * Loader Component
 * Beautiful animated loader with JV (JobVeda) branding
 * 
 * Features:
 * - Animated JV letters with gradient
 * - Pulsing glow effect
 * - Rotating ring animation
 * - Smooth fade-in entrance
 * - Optional loading text
 */

'use client';

import { theme } from '@/utils/theme';

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
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Animated Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div 
          className={`absolute ${currentSize.container} rounded-full border-3 border-transparent animate-spin`}
          style={{
            borderTopColor: 'rgb(59, 130, 246)',
            borderRightColor: 'rgb(99, 102, 241)',
            animationDuration: '1.2s',
          }}
        />

        {/* Subtle inner glow */}
        <div 
          className={`absolute ${currentSize.container} rounded-full blur-2xl opacity-10`}
          style={{
            background: theme.getAccentGradient(135),
          }}
        />

        {/* JV Logo with fill animation */}
        <div className="relative">
          {/* Background text (outline) */}
          <div 
            className={`${currentSize.logo} font-bold tracking-tight text-slate-200`}
          >
            JV
          </div>
          
          {/* Animated fill */}
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
              JV
            </div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className={`${currentSize.text} text-slate-600 font-medium`}>
          {text}
        </p>
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
        {/* JV mini */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-60"
          style={{
            background: theme.getAccentGradient(135),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          JV
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
