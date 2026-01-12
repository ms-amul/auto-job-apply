'use client';

import { theme } from '@/utils/theme';
import { CheckCircle2, FileText, Loader2, Sparkles, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AIParserVisual = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Initializing AI Core...',
    'Scanning Document Semantics...',
    'Extracting Skill Synapses...',
    'Analyzing Experience Vector...',
    'Aligning Keyword Clusters...',
    'Synthesizing Profile DNA...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full h-full">
      {/* 3D Glass Document Frame */}
      <div className="relative w-36 h-48 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden mb-8 transform -rotate-3 transition-transform duration-500 hover:rotate-0">
        {/* Laser Scan Line */}
        <div className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20 animate-laser-scan"></div>

        {/* Abstract Document Content */}
        <div className="p-4 space-y-3 relative z-10 opacity-40">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-indigo-500/20 w-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
            </div>
          ))}
          <div className="h-1.5 bg-slate-200 rounded-full w-3/4"></div>
          <div className="h-1.5 bg-slate-200 rounded-full w-1/2"></div>
        </div>

        {/* Pulsing Neural Nodes */}
        <div className="absolute inset-0 z-0 opacity-30">
          <svg width="100%" height="100%">
            <circle cx="40%" cy="30%" r="3" className="fill-indigo-500 animate-pulse" />
            <circle cx="70%" cy="50%" r="2" className="fill-indigo-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            <circle cx="30%" cy="75%" r="4" className="fill-indigo-600 animate-pulse" style={{ animationDelay: '0.8s' }} />
            <path d="M 40% 30% L 70% 50% L 30% 75%" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Dynamic Narrative Text */}
      <div className="text-center h-12">
        <p className="text-sm font-black text-slate-900 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500" key={step}>
          {steps[step]}
        </p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1.5 opacity-60">
          Advanced AI Engine Active
        </p>
      </div>

      {/* Finishing Micro-animations */}
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
        ))}
      </div>
    </div>
  );
};

export default function ResumeUploadSection({ profile, userId, onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      return 'Please select a file';
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return 'Please upload a PDF, DOCX, DOC, or TXT file';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFileSelect = (file) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setSelectedFile(file);
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

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('candidate_id', userId);

      const response = await fetch('/api/auth/upload-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || 'Failed to upload resume');
        setUploading(false);
        return;
      }

      toast.success('Resume uploaded and processed successfully!');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Refresh profile data
      if (onUploadSuccess) {
        onUploadSuccess();
      } else {
        // Fallback: reload page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const hasResume = profile?.resume_file_name || profile?.resume_parsed_at;

  return (
    <div
      className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header Section */}
      <div
        className="px-2 py-3 border-b border-gray-100"
        style={{
          background: `linear-gradient(135deg, ${theme.accentPrimary}08, ${theme.accentSecondary}08)`,
        }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: theme.getAccentGradient(135),
                boxShadow: `0 2px 8px ${theme.accentPrimary}25`,
              }}
            >
              <FileText className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Resume</h3>
              <p className="text-xs text-slate-500 mt-0.5">Upload & manage your resume</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {profile?.resume_parsed_at && (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                style={{
                  background: `${theme.accentPrimary}10`,
                  border: `1px solid ${theme.accentPrimary}20`,
                }}
              >
                <Sparkles className="w-3 h-3" style={{ color: theme.accentPrimary }} />
                <span className="text-xs font-semibold" style={{ color: theme.accentPrimary }}>
                  Active
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 relative min-h-[180px]">
        {/* Elite Loading Overlay */}
        {uploading && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 animate-in fade-in">
            <AIParserVisual />
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-3 sm:p-5 text-center cursor-pointer transition-all duration-300 overflow-hidden ${isDragging
            ? 'border-blue-500 bg-blue-50/50 scale-[1.02]'
            : 'border-gray-300 bg-gradient-to-br from-gray-50/50 to-white hover:border-gray-400 hover:bg-gray-50'
            }`}
          style={isDragging ? {
            borderColor: theme.accentPrimary,
            backgroundColor: `${theme.accentPrimary}08`,
            boxShadow: `0 4px 20px ${theme.accentPrimary}15`,
          } : {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
          />

          {selectedFile ? (
            <div className="space-y-4">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 items-center justify-center shadow-sm">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1.5 break-words">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200"
                >
                  <X className="w-3.5 h-3.5 inline mr-1.5" />
                  Remove
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  disabled={uploading}
                  className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                  style={{
                    background: theme.getAccentGradient(135),
                    boxShadow: uploading ? 'none' : `0 2px 8px ${theme.accentPrimary}30`,
                  }}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      Upload Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 items-center justify-center shadow-sm mb-2">
                <Upload className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-700 mb-1.5 text-sm font-semibold">
                  <span
                    className="font-bold transition-colors"
                    style={{ color: theme.accentPrimary }}
                  >
                    Click to upload
                  </span>
                  {' '}or drag and drop
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  PDF, DOC, DOCX, TXT (max. 5MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Current Resume Info & Timestamps */}
        {hasResume && !selectedFile && (
          <div className="mt-5 space-y-3">
            {profile?.resume_file_name && (
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 mb-1 truncate">
                      {profile.resume_file_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Current resume file
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamp Badges */}
            <div className="flex flex-wrap gap-2">
              {profile?.resume_parsed_at && (
                <div
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg"
                  style={{
                    background: `${theme.accentPrimary}08`,
                    border: `1px solid ${theme.accentPrimary}20`,
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
                  <span className="text-xs font-semibold" style={{ color: theme.accentPrimary }}>
                    Parsed {formatDate(profile.resume_parsed_at)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
