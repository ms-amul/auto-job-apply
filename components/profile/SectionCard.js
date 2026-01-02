'use client';

import { theme } from '@/utils/theme';
import { Star, Layout, Hash } from 'lucide-react';

export default function SectionCard({ title, description, icon: Icon, children }) {
  // Default icon if none provided
  const DisplayIcon = Icon || Star;
  return (
    <div
      className="bg-white rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden transition-all duration-200 hover:shadow-md"
      style={{
        boxShadow: '0 2px 20px rgba(0,0,0,0.02)',
        border: '1px solid rgba(241, 245, 249, 1)' // slate-100
      }}
    >
      <div className="flex items-start gap-5 mb-8">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
            boxShadow: `0 8px 20px -6px ${theme.accentPrimary}50`,
          }}
        >
          <DisplayIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <div className="text-slate-500 text-sm mt-1">{description}</div>
          )}
        </div>
      </div>

      <div className="">
        {children}
      </div>
    </div>
  );
}

