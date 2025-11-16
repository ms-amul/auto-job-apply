'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, User, Lock, ArrowRight } from 'lucide-react';
import { theme } from '@/utils/theme';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setCookie } from '@/utils/cookies';

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

  return (
    <div
      className="min-h-screen bg-slate-50 flex items-stretch"
      style={{
        background:
          'linear-gradient(90deg, #e0f2fe 0%, #f8fafc 50%, #f9fafb 100%)',
      }}
    >
      {/* Left hero */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between px-16 py-14 bg-sky-50/80 border-r border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold"
              style={{ background: theme.getAccentGradient(135) }}
            >
              JV
            </div>
            <span className="text-lg font-semibold text-slate-900">JobVita</span>
          </div>

          <div className="max-w-lg space-y-5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Apply to jobs in{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: theme.getAccentGradient(90) }}
              >
                1-click.
              </span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Power your entire job search with an AI agent that understands your profile and
              applies for you while you focus on interviews.
            </p>
            <p className="text-xs font-medium text-slate-500">
              Browse handpicked roles from ambitious companies. Trusted by early teams and senior
              engineers.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
            TEAMS USING WORKFLOWS LIKE THIS
          </p>
          <div className="flex flex-wrap gap-3">
            {['Stripe', 'Notion', 'Netflix', 'OpenAI'].map((name) => (
              <div
                key={name}
                className="px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-xs font-medium text-slate-600"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-center lg:text-left">
            Sign up for an account
          </h2>
          <p className="text-xs text-slate-500 mb-8 text-center lg:text-left">
            Create a free account to get your agent and dashboard set up.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First name"
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                icon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Last name"
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                required
              />
            </div>

            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password (demo only)"
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <p className="text-[11px] text-slate-400 leading-relaxed">
              By signing up you agree to our{' '}
              <span className="font-medium text-slate-600">Terms</span> and{' '}
              <span className="font-medium text-slate-600">Privacy Policy</span>.
            </p>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              className="btn-shimmer mt-1"
            >
              Register
            </Button>
          </form>

          <div className="mt-6 text-xs text-slate-500 text-center lg:text-left">
            Already have an account?{' '}
            <button
              className="font-medium text-sky-600 hover:text-sky-700"
              onClick={() => router.push('/')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


