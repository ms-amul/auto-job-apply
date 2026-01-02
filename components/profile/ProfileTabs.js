'use client';

import { theme } from '@/utils/theme';
import { Briefcase, Sparkles, User, Settings } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'skills', label: 'Skills, Education & Certifications', icon: Sparkles },
  { id: 'work', label: 'Work Experience & Projects', icon: Briefcase },
];

export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-8">
      <div className="flex p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-slate-200/60 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ease-out z-0
                ${isActive
                  ? 'text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }
              `}
              style={isActive ? {
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
              } : {}}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

