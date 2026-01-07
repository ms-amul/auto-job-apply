'use client';

import { Star } from 'lucide-react';

export default function SectionCard({ title, description, icon: Icon, children }) {
  // Default icon if none provided
  const DisplayIcon = Icon || Star;
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 md:p-4 mb-6 border border-white/60 shadow-sm"
    >
      <div className="flex items-start gap-4 md:gap-5 mb-8">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 bg-white border-2 border-blue-100 shadow-sm text-blue-700"
        >
          <DisplayIcon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <div className="text-slate-500 text-sm mt-0.5 font-medium">{description}</div>
          )}
        </div>
      </div>

      <div className="animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
