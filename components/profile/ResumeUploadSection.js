'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Clock, CheckCircle2, X, Loader2 } from 'lucide-react';
import SectionCard from './SectionCard';
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
    console.log(dateString);
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const hasResume = true;

  return (
    <SectionCard title="Resume" description="Upload your resume to get better job matches">
      {/* Status Badges */}
      {hasResume && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{
              background: `${theme.accentPrimary}08`,
              borderColor: `${theme.accentPrimary}25`,
            }}
          >
            <CheckCircle2 
              className="w-3.5 h-3.5"
              style={{ color: theme.accentPrimary }}
            />
            <span className="text-xs font-semibold" style={{ color: theme.accentPrimary }}>
              Resume Active
            </span>
          </div>
          {profile.resume_upload_date && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-medium text-slate-600">
                Uploaded {formatDate(profile.resume_upload_date)}
              </span>
            </div>
          )}
          {profile.resume_parsed_at && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: `${theme.accentPrimary}08`,
                border: `1px solid ${theme.accentPrimary}25`,
              }}
            >
              <FileText className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
              <span className="text-xs font-semibold" style={{ color: theme.accentPrimary }}>
                Parsed {formatDate(profile.resume_parsed_at)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50/50 hover:border-gray-400'
        }`}
        style={isDragging ? {
          borderColor: theme.accentPrimary,
          backgroundColor: `${theme.accentPrimary}08`,
        } : {}}
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
          <div className="space-y-3">
            <div className="inline-flex w-12 h-12 rounded-xl bg-white border border-gray-200 items-center justify-center">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-1">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 inline mr-1" />
                Remove
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={uploading}
                className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                style={{
                  background: theme.getAccentGradient(135),
                  boxShadow: `0 2px 8px ${theme.accentPrimary}25`,
                }}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="inline-flex w-12 h-12 rounded-xl bg-white border border-gray-200 items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-700 mb-1 text-sm font-medium">
              <span style={{ color: theme.accentPrimary }} className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">PDF, DOC, DOCX, TXT (max. 5MB)</p>
          </>
        )}
      </div>

      {/* Current Resume Info */}
      {hasResume && !selectedFile && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 mb-1">
                {profile.resume_file_name}
              </p>
              <p className="text-xs text-slate-500">
                Last updated: {new Date(profile.resume_parsed_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <FileText className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
          </div>
        </div>
      )}
    </SectionCard>
  );
}
