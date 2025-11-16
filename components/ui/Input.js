/**
 * Reusable Input Component
 * Uses theme.js for consistent styling
 */

'use client';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  ...props
}) {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 rounded-lg
            ${icon ? 'pl-10' : ''}
            ${error ? 'border border-red-300 bg-red-50' : 'border border-gray-200 bg-white'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
            focus:outline-none focus:ring-0 focus:border-gray-300
            transition-colors duration-200
            text-slate-900 placeholder:text-slate-400
          `}
          style={{ outline: 'none', boxShadow: 'none' }}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

