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
  fullWidth = false,
  icon,
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
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={getButtonStyle()}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            {/* JV Loader */}
            <div className="relative w-4 h-4">
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                style={{
                  borderTopColor: 'currentColor',
                  borderRightColor: 'currentColor',
                }}
              />
              <div 
                className="absolute inset-0 flex items-center justify-center text-[6px] font-bold opacity-70"
                style={{
                  color: 'currentColor',
                }}
              >
                JV
              </div>
            </div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && icon}
            {children}
          </>
        )}
      </span>
    </button>
  );
}
