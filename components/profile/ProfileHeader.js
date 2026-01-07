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
      className="relative rounded-3xl overflow-hidden transition-all duration-300"
    >
      {/* 
        Premium Glass Background 
        - High blur for depth
        - Subtle white gradient for 'crystal' feel
        - Clean light border
      */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(30,41,59,0.04)]" />

      <div className="relative p-3 md:p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-10">

        {/* Avatar Section - Floating with Glow */}
        <div className="relative shrink-0 group">
          {/* Subtle backlight glow behind avatar */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-20 scale-150 transition-all duration-500 group-hover:scale-175 group-hover:opacity-30"
            style={{ background: theme.accentPrimary }}
          />

          <div
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-xl border-[4px] border-white"
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
            }}
          >
            <span className="text-3xl md:text-5xl font-bold text-white tracking-widest leading-none">
              {getInitials()}
            </span>
          </div>

          {/* Status Indicator - Integrated nicely */}
          {profileCompleted && (
            <div
              className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-[3px] border-white bg-emerald-500 text-white"
              title="Profile Completed"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0 flex flex-col pt-1 md:pt-2 w-full md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profile.full_name || `${profile.first_name} ${profile.last_name}`.trim() || 'Your Name'}
            </h1>

            {/* Agent Status - Top Right on Desktop */}
            {agentStatus !== 'none' && (
              <div className={`
                   inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border self-center md:self-auto
                   ${agentStatus === 'running'
                  ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-100'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
                }
                 `}>
                <span className={`relative flex h-2 w-2`}>
                  {agentStatus === 'running' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${agentStatus === 'running' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                </span>
                Agent {agentStatus === 'running' ? 'Active' : 'Paused'}
              </div>
            )}
          </div>

          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-3xl mb-6 mx-auto md:mx-0">
            {profile.professional_summary ? profile.professional_summary : 'Add your professional summary to highlight your expertise and stand out to recruiters.'}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {/* Chips - Clean Pills */}
            {profile.email && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50/80 border border-slate-100 text-slate-600 text-sm font-medium hover:bg-white transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50/80 border border-slate-100 text-slate-600 text-sm font-medium hover:bg-white transition-colors">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50/80 border border-slate-100 text-slate-600 text-sm font-medium hover:bg-white transition-colors">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
