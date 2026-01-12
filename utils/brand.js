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
} = {}) {
  const sizeConfig = brand.logo.sizes[size] || brand.logo.sizes.md;

  return (
    <img src={brand.logo.imagePath} alt={brand.getName()} className={`w-8 h-8 ${sizeConfig.container}`} />
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

