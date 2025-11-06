'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-orange-500 via-rose-500 to-pink-500 mb-4 shadow-xl shadow-orange-500/30"
          style={{
            boxShadow: '0 10px 30px -8px rgba(249, 115, 22, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-2xl"></div>
          <Lock className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Enter Password</h2>
        <p className="text-gray-600">
          Signing in as <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-bold text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className={`
            relative bg-white/80 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300
            ${isFocused ? 'border-orange-400 shadow-xl shadow-orange-200/40' : 'border-gray-200'}
            ${error ? 'border-red-400' : ''}
          `}
          style={{
            boxShadow: isFocused 
              ? '0 10px 30px -8px rgba(249, 115, 22, 0.2), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)'
              : '0 4px 12px -3px rgba(0, 0, 0, 0.08), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)',
          }}
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/30 to-transparent rounded-2xl"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
            
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
              className="relative z-10 w-full px-5 py-4 pr-12 bg-transparent text-gray-900 placeholder-gray-400 text-base font-medium outline-none"
              disabled={isLoading}
            />
            
            {/* Toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
              ) : (
                <Eye className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
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
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white/60 backdrop-blur-sm border border-gray-200 hover:bg-white/80 transition-all duration-300 disabled:opacity-50"
        >
          Back
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full px-6 py-4 rounded-2xl font-black text-base bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: '0 10px 30px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

