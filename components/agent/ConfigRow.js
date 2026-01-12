'use client';

export default function ConfigRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/40 last:border-0 group">
      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-900 transition-colors">{label}</span>
      <span className="text-sm font-black text-slate-900">{value}</span>
    </div>
  );
}

