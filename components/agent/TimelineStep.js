'use client';

import { theme } from '@/utils/theme';

export default function TimelineStep({ number, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
        style={{ background: theme.getAccentGradient(135) }}
      >
        {number}
      </div>
      <div>
        <p className="font-semibold text-slate-900 mb-1">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

