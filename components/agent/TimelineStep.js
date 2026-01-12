'use client';

import { theme } from '@/utils/theme';

export default function TimelineStep({ number, title, description }) {
  return (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-white font-black text-sm shadow-lg transition-all duration-300"
        style={{ background: theme.getAccentGradient(135) }}
      >
        {number}
      </div>
      <div>
        <p className="font-black text-slate-900 tracking-tight transition-colors">{title}</p>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">{description}</p>
      </div>
    </div>
  );
}

