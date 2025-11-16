'use client';

import { setCookie } from '@/utils/cookies';
import { theme } from '@/utils/theme';
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
        setCookie('jobvita_user_id', data.user.id, 7);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="JobVeda" width={34} height={34} className='rounded-full scale-110' />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 leading-none">JobVeda</span>
                <span className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                  Powered by <span className="font-semibold text-slate-700">Nexi</span>
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI-Powered Job Search</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Land your dream job{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: theme.getAccentGradient(90) }}
                >
                  10x faster
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed">
                Join thousands of professionals using AI to automate their job applications
                and get hired faster.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                  style={{
                    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.05), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
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
          <div className="order-1 lg:order-2">
            <div
              className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/20"
              style={{
                boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.08), -20px -20px 60px rgba(255, 255, 255, 0.9)',
              }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-600">
                    Start your AI-powered job search journey
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-fadeIn">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors text-slate-900 placeholder-slate-400"
                        placeholder="John"
                        required
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors text-slate-900 placeholder-slate-400"
                        placeholder="Doe"
                        required
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors text-slate-900 placeholder-slate-400"
                        placeholder="john@example.com"
                        required
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors text-slate-900 placeholder-slate-400"
                        placeholder="••••••••"
                        required
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Demo only - use any password</p>
                  </div>

                  {/* Terms */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By signing up you agree to our{' '}
                    <span className="font-medium text-slate-700 hover:text-blue-600 cursor-pointer">Terms</span> and{' '}
                    <span className="font-medium text-slate-700 hover:text-blue-600 cursor-pointer">Privacy Policy</span>.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: theme.getAccentGradient(135),
                      boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7)',
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
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <button
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={() => router.push('/')}
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
