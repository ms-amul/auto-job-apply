'use client';

import { theme } from '@/utils/theme';

export default function YesNoDecline({ value, onChange }) {
  return (
    <div className="flex gap-2.5">
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === true
            ? 'text-white border-transparent shadow-sm'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        style={value === true ? {
          background: theme.getAccentGradient(135),
        } : {}}
        onClick={() => onChange(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === false
            ? 'text-white border-transparent shadow-sm'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        style={value === false ? {
          background: theme.getAccentGradient(135),
        } : {}}
        onClick={() => onChange(false)}
      >
        No
      </button>
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === null
            ? 'bg-gray-100 text-slate-700 border-gray-300'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => onChange(null)}
      >
        Decline
      </button>
    </div>
  );
}

