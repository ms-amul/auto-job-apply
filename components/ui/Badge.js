/**
 * Badge Component - Clean & Readable
 */

const variants = {
  primary: 'bg-blue-100 text-blue-700 border-blue-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  danger: 'bg-red-100 text-red-700 border-red-200',
  secondary: 'bg-gray-100 text-gray-700 border-gray-200',
};

const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export default function Badge({ 
  children, 
  variant = 'secondary', 
  size = 'md',
  className = '' 
}) {
  return (
    <span 
      className={`
        inline-flex items-center font-medium rounded-lg border
        ${variants[variant] || variants.secondary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
