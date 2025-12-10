'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Clock, CheckCircle2, X, Loader2, File, Sparkles } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

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
      <div className="p-2">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-3 sm:p-5 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
            isDragging
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
