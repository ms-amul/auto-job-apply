'use client';

import { Check, Mail, Phone, MapPin } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function ProfileHeader({ profile, profileCompleted, agentStatus }) {
  const getInitials = () => {
    const firstName = profile.first_name || '';
    const lastName = profile.last_name || '';
    const fullName = profile.full_name || '';
    
    if (fullName) {
      const parts = fullName.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return fullName.substring(0, 2).toUpperCase();
    }
    
    if (firstName || lastName) {
      return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase() || 'U';
    }
    
    return 'U';
  };

  return (
    <div 
      className="relative bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 mb-6 overflow-hidden"
      style={{ 
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
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
      
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
        {/* Avatar Section */}
        <div className="relative">
          <div 
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-md"
            style={{
              background: theme.getAccentGradient(135),
              boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
            }}
          >
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {getInitials()}
            </span>
          </div>
          {profileCompleted && (
            <div 
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
              }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* User Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1.5">
                {profile.full_name || `${profile.first_name} ${profile.last_name}`.trim() || 'Your Name'}
              </h1>
              <p className="text-base text-slate-600 font-medium">
                {profile.professional_summary ? profile.professional_summary.substring(0, 60) + '...' : 'Add your professional summary'}
              </p>
            </div>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2.5">
              <div 
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                  profileCompleted 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${profileCompleted ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                {profileCompleted ? 'Active' : 'Incomplete'}
              </div>
              
              <div 
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                  agentStatus === 'running' 
                    ? 'border-blue-200 text-blue-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
                style={agentStatus === 'running' ? {
                  background: `${theme.accentPrimary}10`,
                  borderColor: `${theme.accentPrimary}30`,
                } : {}}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    agentStatus === 'running' ? 'animate-pulse' : ''
                  }`}
                  style={agentStatus === 'running' ? {
                    background: theme.accentPrimary,
                  } : {
                    background: '#9ca3af',
                  }}
                />
                Agent {agentStatus === 'running' ? 'Running' : 'Paused'}
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-2.5 text-sm">
            {profile.email && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-slate-700 font-medium">{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <Phone className="w-4 h-4 text-slate-500" />
                <span className="text-slate-700 font-medium">{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-slate-700 font-medium">{profile.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

