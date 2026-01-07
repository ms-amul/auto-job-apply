'use client';

import { theme } from '@/utils/theme';
import { Briefcase, Sparkles, User, Settings } from 'lucide-react';
import { useRef, useEffect } from 'react';

const tabs = [
  { id: 'general', label: 'General', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'work', label: 'Experience', icon: Briefcase },
];

export default function ProfileTabs({ activeTab, onTabChange }) {
  const scrollRef = useRef(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (scrollRef.current) {
      // Find active button
      // Simple logic: if needed we can add data-id and querySelector
    }
  }, [activeTab]);

  return (
    <div className="mb-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" ref={scrollRef}>
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                group cursor-pointer relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-xl
                transition-all duration-300 ease-out border
                ${isActive
                  ? 'bg-white border-white/50 text-slate-800 shadow-md'
                  : 'bg-white/40 border-transparent text-slate-500 hover:bg-white/60 hover:text-slate-700'
                }
              `}
            >
              {/* Active Indicator Dot */}
              {isActive && (
                <span
                  className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})` }}
                />
              )}

              <Icon
                className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
