'use client';

import { setCookie } from '@/utils/cookies';
import { theme } from '@/utils/theme';
import { brand, Logo } from '@/utils/brand';
import {
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Failed to sign up');
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      try {
        setCookie(brand.cookies.userId, data.user.id, 7);
      } catch (err) {
        console.error('Failed to set id cookie', err);
      }
      router.push('/dashboard/profile');
    } catch (err) {
      console.error(err);
      setError('Failed to sign up');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Applications',
      description: 'Let our agent apply to jobs automatically',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Real-time application analytics',
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${theme.accentPrimary}15, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${theme.accentSecondary}15, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <img src="/brand.png" alt="Brand Logo" className="w-52" />
                <span className="text-base text-slate-500 font-medium leading-none m-0.5">
                  Powered by <span className="font-semibold text-slate-700">Nexi</span>
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border"
                style={{
                  background: `${theme.accentPrimary}08`,
                  borderColor: `${theme.accentPrimary}20`,
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: theme.accentPrimary }} />
                <span className="text-sm font-semibold" style={{ color: theme.accentPrimary }}>
                  AI-Powered Job Search
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Land your dream job{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: theme.getAccentGradient(90) }}
                >
                  10x faster
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg">
                Join thousands of professionals using AI to automate their job applications
                and get hired faster.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-3 md:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-4 md:p-5 border border-gray-200/80 transition-all duration-200"
                  style={{
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${theme.accentPrimary}40`;
                    e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accentPrimary}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{
                        background: theme.getAccentGradient(135),
                      }}
                    >
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{
                        background: theme.getAccentGradient(135),
                      }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">2,000+</span> users joined this month
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="order-1 lg:order-2 w-full">
            <div
              className="relative bg-white rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200/80 overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Top accent border */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: theme.getAccentGradient(90),
                  borderTopLeftRadius: '0.75rem',
                  borderTopRightRadius: '0.75rem',
                }}
              />

              <div className="relative z-10">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Create Account
                  </h2>
                  <p className="text-sm md:text-base text-slate-600">
                    Start your AI-powered job search journey
                  </p>
                </div>

                {error && (
                  <div
                    className="mb-5 rounded-lg border px-4 py-3 text-sm animate-fadeIn"
                    style={{
                      borderColor: '#fecaca',
                      background: '#fef2f2',
                      color: '#991b1b',
                    }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all text-slate-900 placeholder-slate-400 text-sm md:text-base"
                        placeholder="John"
                        required
                        style={{
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = theme.accentPrimary;
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentPrimary}15`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all text-slate-900 placeholder-slate-400 text-sm md:text-base"
                        placeholder="Doe"
                        required
                        style={{
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = theme.accentPrimary;
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentPrimary}15`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all text-slate-900 placeholder-slate-400 text-sm md:text-base"
                        placeholder="john@example.com"
                        required
                        style={{
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = theme.accentPrimary;
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentPrimary}15`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none transition-all text-slate-900 placeholder-slate-400 text-sm md:text-base"
                        placeholder="••••••••"
                        required
                        style={{
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = theme.accentPrimary;
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentPrimary}15`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Demo only - use any password</p>
                  </div>

                  {/* Terms */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By signing up you agree to our{' '}
                    <button
                      type="button"
                      className="font-medium text-slate-700 transition-colors"
                      style={{
                        color: theme.accentPrimary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      Terms
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      className="font-medium text-slate-700 transition-colors"
                      style={{
                        color: theme.accentPrimary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3 md:py-3.5 rounded-lg font-semibold text-white overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                    style={{
                      background: theme.getAccentGradient(135),
                      boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.boxShadow = `0 6px 16px ${theme.accentPrimary}35`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accentPrimary}25`;
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="font-semibold transition-colors"
                      style={{
                        color: theme.accentPrimary,
                      }}
                      onClick={() => router.push('/')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
