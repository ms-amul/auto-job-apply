/**
 * Reusable Input Component
 * Uses theme.js for consistent styling
 */

import { useId } from 'react';

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
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" aria-hidden="true">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
          className={`
            w-full px-4 py-3 rounded-xl text-sm font-medium
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-white/50 focus:bg-white'}
            ${disabled ? 'bg-slate-50 cursor-not-allowed opacity-70' : ''}
            border focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10
            outline-none transition-all duration-200
            text-slate-900 placeholder:text-slate-400
          `}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p
          id={error ? errorId : helperId}
          role={error ? "alert" : undefined}
          className={`mt-1.5 ml-1 text-xs font-medium ${error ? 'text-red-500' : 'text-slate-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
