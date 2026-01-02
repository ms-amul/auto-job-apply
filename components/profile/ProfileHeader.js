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
      className="relative bg-white rounded-3xl p-8 mb-8 overflow-hidden transition-all duration-300 group hover:shadow-lg"
      style={{
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Background Decor - Subtle & Premium */}
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-50/30 to-teal-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-40 pointer-events-none"
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        {/* Avatar Section - Modern Ring */}
        <div className="relative shrink-0">
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-300 md:group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
              boxShadow: `0 10px 40px -10px ${theme.accentPrimary}40`,
            }}
          >
            <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
              {getInitials()}
            </span>
          </div>

          {/* Status Indicator - Floating */}
          {profileCompleted && (
            <div
              className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-[3px] border-white bg-emerald-500 text-white animate-in zoom-in duration-300"
              title="Profile Completed"
            >
              <Check className="w-4 h-4 text-white stroke-[3px]" />
            </div>
          )}
        </div>

        {/* User Info Section - Clean Hierarchy */}
        <div className="flex-1 min-w-0 py-2">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {profile.full_name || `${profile.first_name} ${profile.last_name}`.trim() || 'Your Name'}
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
              {profile.professional_summary ? profile.professional_summary.substring(0, 80) + (profile.professional_summary.length > 80 ? '...' : '') : 'Add your professional summary to stand out.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Contact Chips - Glassmorphic */}
            <div className="flex flex-wrap gap-2 text-sm">
              {profile.email && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="font-medium">{profile.email}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-medium">{profile.location}</span>
                </div>
              )}
            </div>

            {/* Agent Status Pill */}
            {agentStatus !== 'none' && (
              <div className={`
                 ml-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm
                 ${agentStatus === 'running'
                  ? 'bg-blue-50/50 text-blue-700 border-blue-200/60'
                  : 'bg-gray-50 text-gray-600 border-gray-200'
                }
               `}>
                <span className={`relative flex h-2 w-2`}>
                  {agentStatus === 'running' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${agentStatus === 'running' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                </span>
                Agent {agentStatus === 'running' ? 'Active' : 'Paused'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

