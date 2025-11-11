'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function PasswordStep({ email, password, setPassword, onBack, onSubmit, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative overflow-hidden"
          style={{
            background: theme.getAccentGradient(135),
            boxShadow: `0 10px 30px -8px ${theme.accentPrimary}40, inset 0 2px 0 0 rgba(255, 255, 255, 0.3)`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent"></div>
          <Lock className="w-8 h-8 text-white relative z-10" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter Password</h2>
        <p className="text-gray-500">
          Signing in as <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <div className="relative">
          <div 
            className={`
              relative bg-white rounded-xl border-2 transition-all duration-300
              ${error ? 'border-red-400' : ''}
            `}
            style={{
              borderColor: isFocused ? theme.accentPrimary : error ? '#f87171' : '#e5e7eb',
              boxShadow: isFocused 
                ? `0 0 0 3px ${theme.accentPrimary}15`
                : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 pr-12 bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none"
              disabled={isLoading}
            />
            
            {/* Toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" strokeWidth={2} />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" strokeWidth={2} />
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1.5 animate-fadeInUp">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full px-6 py-3.5 rounded-xl font-semibold text-base text-white overflow-hidden group transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: theme.getAccentGradient(90),
            boxShadow: `0 4px 12px -2px ${theme.accentPrimary}40`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </>
            )}
          </span>
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
        >
          Back
        </button>
      </div>
    </form>
  );
}

