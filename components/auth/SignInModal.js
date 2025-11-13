/**
 * Sign In Modal Component
 * - Uses API for authentication
 * - Role-based redirection
 * - Loading states with react-hot-toast
 * - Stores user in localStorage
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

export default function SignInModal({ isOpen, onClose }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Show success toast
        toast.success(`Welcome back, ${data.user.name}!`);

        // Close modal
        onClose();

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Show error toast
        toast.error(data.error || 'Sign in failed');
        setErrors({ general: data.error });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An error occurred. Please try again.');
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Quick sign-in for testing
  const quickSignIn = async (testEmail) => {
    setEmail(testEmail);
    setPassword('test123'); // Any password works in test mode
    
    // Wait a bit for state to update
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="md"
      zIndex={100}
    >
      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: theme.getAccentGradient(135) }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold" style={{ color: theme.accentPrimary }}>
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to continue to your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={<Mail className="w-5 h-5" />}
            error={errors.email}
            required
            disabled={loading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              error={errors.password}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            size="lg"
          >
            Sign In
          </Button>
        </form>

        {/* Test Accounts */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-3">Quick Test Sign In</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              fullWidth
              size="sm"
              onClick={() => quickSignIn('rajgopal@gmail.com')}
              disabled={loading}
            >
              Sign in as <strong className="ml-1">Applicant</strong>
            </Button>
            <Button
              variant="outline"
              fullWidth
              size="sm"
              onClick={() => quickSignIn('rajgopal@jobvita.com')}
              disabled={loading}
            >
              Sign in as <strong className="ml-1">Recruiter</strong>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <button 
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => toast('Sign up coming soon!')}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}
