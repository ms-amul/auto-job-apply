/**
 * Button Component - Premium Shimmer Effect
 * - Elegant horizontal shimmer on hover
 * - Professional appearance
 * - Uses theme.js colors only
 */

import { theme } from '@/utils/theme';

const variants = {
  primary: `text-white btn-shimmer shadow-md hover:shadow-xl`,
  outline: 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 text-white shadow-md hover:shadow-xl hover:bg-red-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  ...props 
}) {
  const getButtonStyle = () => {
    if (variant === 'primary') {
      return {
        background: theme.getAccentGradient(135),
      };
    }
    return {};
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-300
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={getButtonStyle()}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : children}
      </span>
    </button>
  );
}
