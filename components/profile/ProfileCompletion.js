'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, Loader2 } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function ProfileCompletion({ userId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userId) {
      loadCompletion();
    }
  }, [userId]);

  const loadCompletion = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/profile/completion`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error loading completion:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div 
        className="bg-white rounded-xl border border-gray-200/80 p-6"
        style={{ 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'partial':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Circle className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'text-emerald-600';
      case 'partial':
        return 'text-amber-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200/80 p-6"
      style={{ 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-slate-900">Profile Completion</h3>
        <span 
          className="text-lg font-bold"
          style={{ color: theme.accentPrimary }}
        >
          {data.overallPercentage}%
        </span>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-5">
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.overallPercentage}%`,
              background: theme.getAccentGradient(90),
            }}
          />
        </div>
      </div>

      {/* Section Details */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        {Object.entries(data.sections).map(([key, section]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getStatusIcon(section.status)}
              <span className={`text-xs font-medium truncate ${getStatusColor(section.status)}`}>
                {section.label}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              {section.status === 'complete' ? (
                <span className="text-xs font-semibold text-emerald-600">Complete</span>
              ) : (
                <span className="text-xs font-semibold text-slate-900">
                  {section.completed}/{section.total}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Missing Sections Hint */}
      {data.missingSections.length > 0 && data.overallPercentage < 100 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-slate-600 mb-2">
            Complete these sections to improve your profile:
          </p>
          <div className="space-y-1.5">
            {data.missingSections.slice(0, 3).map((missing, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{missing.section}</span>
                <span className="text-xs font-semibold text-slate-700">
                  {missing.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

