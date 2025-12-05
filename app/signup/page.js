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
  Zap,
  Upload,
  FileText,
  X,
  CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  // Step management: 1 = email/password, 2 = resume upload
  const [currentStep, setCurrentStep] = useState(1);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateResume = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      return 'Resume is required';
    }

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return 'Please upload a PDF, DOCX, or TXT file';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFileSelect = (file) => {
    setResumeError('');
    const error = validateResume(file);
    if (error) {
      setResumeError(error);
      return;
    }
    setResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeResume = () => {
    setResume(null);
    setResumeError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (ext === 'docx' || ext === 'doc') return '📝';
    if (ext === 'txt') return '📋';
    return '📎';
  };

  // Handle Next button click (Step 1 -> Step 2)
  const handleNext = async () => {
    setError('');
    
    // Validate email and password
    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!form.password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Call API to validate/save email and password
      // This is step 1 API call
      const res = await fetch('/api/auth/validate-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      // For now, just proceed to next step (API endpoint may not exist yet)
      // TODO: Handle API response properly when endpoint is ready
      setCurrentStep(2);
      setLoading(false);
    } catch (err) {
      console.error('Error validating credentials:', err);
      // For now, proceed anyway (API may not exist)
      setCurrentStep(2);
      setLoading(false);
    }
  };

  // Handle final submit (Step 2 - Resume Upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResumeError('');

    // Validate resume
    if (!resume) {
      setResumeError('Please upload your resume');
      setLoading(false);
      return;
    }

    const resumeValidationError = validateResume(resume);
    if (resumeValidationError) {
      setResumeError(resumeValidationError);
      setLoading(false);
      return;
    }

    try {
      // TODO: Call API to submit resume and complete signup
      // This is step 2 API call - submit resume
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('email', form.email);
      formData.append('password', form.password);

      const res = await fetch('/api/auth/signup-with-resume', {
        method: 'POST',
        body: formData,
      });

      // For now, try the existing signup endpoint as fallback
      if (!res.ok) {
        // Fallback to original signup endpoint
        const signupRes = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await signupRes.json();
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
      } else {
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
      }
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
                <div className="text-left mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {currentStep === 1 && 'Account Details'}
                    {currentStep === 2 && 'Upload Resume'}
                  </h2>
                  <p className="text-sm md:text-base text-slate-600">
                    {currentStep === 1 && 'Enter your email and password'}
                    {currentStep === 2 && 'Upload your resume to complete signup'}
                  </p>
                  
                  {/* Step indicator */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {[1, 2].map((step) => (
                      <div
                        key={step}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          step <= currentStep ? 'w-8' : 'w-2'
                        }`}
                        style={{
                          background: step <= currentStep
                            ? theme.getAccentGradient(90)
                            : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
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
                  {/* Step 1: Email and Password */}
                  {currentStep === 1 && (
                    <>
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
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

                      <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Password <span className="text-red-500">*</span>
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
                    </>
                  )}

                  {/* Step 2: Resume Upload Field - Show only when step 2 */}
                  {currentStep === 2 && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Resume <span className="text-red-500">*</span>
                      </label>
                    
                    {!resume ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-xl p-6 md:p-8 transition-all duration-300 cursor-pointer group ${
                          isDragging
                            ? 'border-opacity-100 scale-[1.02]'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${
                          resumeError
                            ? 'border-red-300 bg-red-50/50'
                            : 'bg-gradient-to-br from-slate-50 to-white'
                        }`}
                        style={{
                          borderColor: isDragging
                            ? theme.accentPrimary
                            : resumeError
                            ? '#fca5a5'
                            : undefined,
                          background: isDragging
                            ? `linear-gradient(135deg, ${theme.accentPrimary}08, white)`
                            : resumeError
                            ? undefined
                            : undefined,
                        }}
                        onClick={() => document.getElementById('resume-upload').click()}
                      >
                        {/* Premium glass effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Animated gradient border on hover */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${theme.accentPrimary}10, ${theme.accentSecondary}10)`,
                            border: `2px solid ${theme.accentPrimary}30`,
                            margin: '-2px',
                          }}
                        ></div>

                        <div className="relative z-10 flex flex-col items-center justify-center text-center">
                          {/* Premium icon container */}
                          <div
                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                            style={{
                              background: theme.getAccentGradient(135),
                              boxShadow: `0 8px 24px ${theme.accentPrimary}25`,
                            }}
                          >
                            <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                          </div>

                          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                            Upload Your Resume
                          </h3>
                          <p className="text-sm text-slate-600 mb-1">
                            Drag and drop your resume here, or{' '}
                            <span
                              className="font-semibold"
                              style={{ color: theme.accentPrimary }}
                            >
                              browse
                            </span>
                          </p>
                          <p className="text-xs text-slate-500">
                            Supports PDF, DOCX, and TXT files (max 5MB)
                          </p>

                          {/* File type badges */}
                          <div className="flex items-center gap-2 mt-4">
                            {['PDF', 'DOCX', 'TXT'].map((type) => (
                              <span
                                key={type}
                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  background: `${theme.accentPrimary}10`,
                                  color: theme.accentPrimary,
                                  border: `1px solid ${theme.accentPrimary}20`,
                                }}
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.docx,.doc,.txt"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div
                        className="relative rounded-xl p-4 md:p-5 border-2 transition-all duration-300 group"
                        style={{
                          background: `linear-gradient(135deg, ${theme.accentPrimary}08, white)`,
                          borderColor: `${theme.accentPrimary}30`,
                          boxShadow: `0 4px 12px ${theme.accentPrimary}15`,
                        }}
                      >
                        {/* Success indicator */}
                        <div className="absolute top-3 right-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: `${theme.accentPrimary}15`,
                            }}
                          >
                            <CheckCircle2
                              className="w-5 h-5"
                              style={{ color: theme.accentPrimary }}
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-4 pr-10">
                          {/* File icon */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                            style={{
                              background: theme.getAccentGradient(135),
                              boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
                            }}
                          >
                            {getFileIcon(resume.name)}
                          </div>

                          {/* File info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-slate-600" />
                              <p className="font-semibold text-slate-900 text-sm md:text-base truncate">
                                {resume.name}
                              </p>
                            </div>
                            <p className="text-xs text-slate-500">
                              {formatFileSize(resume.size)}
                            </p>
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={removeResume}
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-red-50 group/remove"
                            style={{
                              color: '#ef4444',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#fef2f2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <X className="w-4 h-4" strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Change file button */}
                        <button
                          type="button"
                          onClick={() => document.getElementById('resume-upload').click()}
                          className="mt-3 text-xs font-semibold transition-colors"
                          style={{ color: theme.accentPrimary }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                        >
                          Change file
                        </button>

                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.docx,.doc,.txt"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </div>
                    )}

                      {resumeError && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {resumeError}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Terms - Show on step 1 and 2 */}
                  {(currentStep === 1 || currentStep === 2) && (
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
                  )}

                  {/* Step 1: Next Button */}
                  {currentStep === 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={loading || !form.email.trim() || !form.password.trim()}
                      className="group relative w-full py-3 md:py-3.5 rounded-lg font-semibold text-white overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                      style={{
                        background: theme.getAccentGradient(135),
                        boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
                      }}
                      onMouseEnter={(e) => {
                        if (!loading && form.email.trim() && form.password.trim()) {
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
                            Validating...
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </span>
                    </button>
                  )}

                  {/* Step 2: Submit Button */}
                  {currentStep === 2 && (
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
                  )}
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
