'use client';

import { theme } from '@/utils/theme';

export default function ToggleCard({ label, icon: Icon, value, onChange }) {
  const yes = value === true;
  const no = value === false;

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-4 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        <span className="text-sm font-semibold text-slate-900">{label}</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all border ${
            yes
              ? 'text-white border-emerald-600 shadow-sm'
              : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={yes ? {
            background: 'linear-gradient(135deg, #10b981, #059669)',
          } : {}}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all border ${
            no
              ? 'text-white border-rose-600 shadow-sm'
              : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={no ? {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          } : {}}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

