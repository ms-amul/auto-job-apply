'use client';

import { useState } from 'react';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function EmailStep({ email, setEmail, onNext, isLoading }) {
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // TODO: Check with backend if email is registered with Rangam
    // For now, proceed to password step
    onNext();
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
          <Mail className="w-8 h-8 text-white relative z-10" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Enter your email to continue</p>
      </div>

      {/* Rangam Notice */}
      <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/60 rounded-2xl p-4 flex items-start gap-3"
        style={{
          boxShadow: '0 4px 12px -3px rgba(59, 130, 246, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900 mb-1">Rangam Candidates Only</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Only candidates registered with Rangam can sign in. If you're not registered, please contact Rangam support.
          </p>
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address
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
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3.5 bg-transparent text-gray-900 placeholder-gray-400 text-sm outline-none"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1.5 animate-fadeInUp">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>
      </div>

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
              Checking...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </>
          )}
        </span>
      </button>
    </form>
  );
}

