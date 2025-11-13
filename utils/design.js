/**
 * Premium Design System
 * Clean, readable, professional
 */

import { theme } from './theme';

export const design = {
  // Neomorphic shadows (elegant)
  neomorph: {
    flat: 'shadow-[2px_2px_6px_rgba(0,0,0,0.08),-2px_-2px_6px_rgba(255,255,255,0.95)]',
    pressed: 'shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]',
    hover: 'shadow-[3px_3px_8px_rgba(0,0,0,0.1),-3px_-3px_8px_rgba(255,255,255,0.98)]',
  },

  // Glass effect
  glass: {
    light: 'bg-white/70 backdrop-blur-md border border-white/30',
    medium: 'bg-white/50 backdrop-blur-lg border border-white/40',
  },

  // Clean spacing (not too tight)
  spacing: {
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  },

  // Readable typography
  text: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
  },

  // Borders
  border: {
    light: 'border border-gray-100',
    medium: 'border border-gray-200',
    accent: `border border-[${theme.accentPrimary}]/20`,
  },

  // Rounded corners
  rounded: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  },

  // Card styles
  card: {
    neo: 'bg-white shadow-[2px_2px_6px_rgba(0,0,0,0.08),-2px_-2px_6px_rgba(255,255,255,0.95)] rounded-xl',
    flat: 'bg-white border border-gray-100 rounded-xl shadow-sm',
    glass: 'bg-white/70 backdrop-blur-md border border-white/30 rounded-xl',
  },

  // Transitions
  transition: {
    fast: 'transition-all duration-150 ease-in-out',
    normal: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
};

export default design;
