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
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap
                border-b-2 relative
                ${isActive 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-gray-300'
                }
              `}
              style={isActive ? {
                borderBottomColor: theme.accentPrimary,
                color: theme.accentPrimary,
              } : {}}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: theme.getAccentGradient(90),
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

