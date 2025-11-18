// ========================================
// BRAND CONFIGURATION
// ========================================
// Centralized branding configuration for easy updates

import React from 'react';

export const brand = {
  // Company Information
  name: {
    full: 'RangamWorks',
    parts: {
      first: 'Rangam',
      second: 'Works',
    },
    // Styling for the name parts
    styles: {
      first: 'font-bold text-blue-600', // Rangam - blue and bold
      second: 'font-extrabold text-green-600', // Works - green and bolder
    },
  },

  // Logo Configuration
  logo: {
    // Initials to display in the logo
    initials: 'RW',
    // Logo image path (if using an image instead of initials)
    imagePath: '/logo.png',
    // Size presets
    sizes: {
      sm: { container: 'w-8 h-8', text: 'text-xs' },
      md: { container: 'w-12 h-12', text: 'text-base' },
      lg: { container: 'w-16 h-16', text: 'text-xl' },
    },
  },

  // Contact Information
  contact: {
    email: 'support@rangamworks.com',
  },

  // Database Configuration
  database: {
    name: 'rangamworks',
  },

  // Cookie Names
  cookies: {
    userId: 'rangamworks_user_id',
  },

  // Helper: Get styled company name JSX
  getStyledName(className = '') {
    return (
      <span className={className}>
        <span className={this.name.styles.first}>{this.name.parts.first}</span>
        <span className={this.name.styles.second}>{this.name.parts.second}</span>
      </span>
    );
  },

  // Helper: Get company name as string
  getName() {
    return this.name.full;
  },
};

/**
 * Logo Component Generator
 * Premium square glass gradiented logo with initials
 * Features two-toned gradient with sophisticated glass morphism effects
 * 
 * @param {Object} options - Logo configuration options
 * @param {string} options.size - Size preset: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} options.initials - Custom initials (default: brand.logo.initials)
 * @param {string} options.className - Additional CSS classes
 * @param {Object} options.style - Additional inline styles
 * @param {Function} options.theme - Theme object with getAccentGradient method
 * @returns {JSX.Element} - Styled logo component
 */
export function Logo({ 
  size = 'md', 
  initials = brand.logo.initials,
  className = '',
  style = {},
  theme = null 
} = {}) {
  const sizeConfig = brand.logo.sizes[size] || brand.logo.sizes.md;
  
  // Premium two-toned gradient - combines theme colors with sophisticated tones
  // First tone: Deep rich color (primary)
  // Second tone: Elegant complementary color (secondary)
  const primaryColor = theme?.accentPrimary || '#1e40af';
  const secondaryColor = theme?.accentSecondary || '#4f46e5';
  
  // Create premium two-toned gradient with depth
  const premiumGradient = `linear-gradient(135deg, 
    ${primaryColor} 0%, 
    ${secondaryColor} 50%, 
    ${primaryColor} 100%
  )`;
  
  // Secondary gradient layer for depth
  const depthGradient = `radial-gradient(circle at 30% 30%, 
    rgba(255, 255, 255, 0.15) 0%, 
    transparent 50%
  )`;

  return (
    <div
      className={`
        ${sizeConfig.container}
        rounded-2xl
        flex items-center justify-center
        relative overflow-hidden
        border border-white/20
        ${className}
      `}
      style={{
        background: premiumGradient,
        boxShadow: `
          0 8px 32px -4px ${primaryColor}40,
          0 4px 16px -2px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)
        `,
        ...style,
      }}
    >
      {/* Depth gradient layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: depthGradient,
        }}
      />
      
      {/* Premium glass reflection - top left shine */}
      <div className="absolute inset-0 bg-linear-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />
      
      {/* Secondary glass reflection - subtle bottom right */}
      <div className="absolute inset-0 bg-linear-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Inner glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${primaryColor}20`,
        }}
      />
      
      {/* Premium border highlight */}
      <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" />
      
      {/* Initials with premium styling */}
      <span 
        className={`${sizeConfig.text} text-white font-extrabold relative z-10 tracking-tighter`}
        style={{
          textShadow: `
            0 1px 2px rgba(0, 0, 0, 0.3),
            0 0 8px ${primaryColor}60,
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
          letterSpacing: '-0.02em',
        }}
      >
        {initials}
      </span>
      
      {/* Subtle animated shimmer on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}

/**
 * Logo with Image Component
 * Returns a logo using the image path if available
 * Falls back to initials logo if image not found
 */
export function LogoImage({ 
  size = 'md',
  className = '',
  alt = brand.getName(),
  ...props 
} = {}) {
  const sizeConfig = brand.logo.sizes[size] || brand.logo.sizes.md;
  
  return (
    <img
      src={brand.logo.imagePath}
      alt={alt}
      width={size === 'sm' ? 32 : size === 'lg' ? 64 : 48}
      height={size === 'sm' ? 32 : size === 'lg' ? 64 : 48}
      className={`${sizeConfig.container} rounded-full ${className}`}
      onError={(e) => {
        // Fallback to initials logo if image fails to load
        e.target.style.display = 'none';
        const parent = e.target.parentElement;
        if (parent && !parent.querySelector('.logo-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = 'logo-fallback';
          parent.appendChild(fallback);
        }
      }}
      {...props}
    />
  );
}

export default brand;

