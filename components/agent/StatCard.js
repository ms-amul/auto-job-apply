'use client';

export default function StatCard({ label, value, icon: Icon, color }) {
  const colorStyles = {
    blue: 'bg-blue-500/10 text-blue-600',
    indigo: 'bg-indigo-500/10 text-indigo-600',
    purple: 'bg-purple-500/10 text-purple-600',
    green: 'bg-emerald-500/10 text-emerald-600',
  };

  return (
    <div className="relative group bg-white/20 hover:bg-white/40 border border-white/60 p-5 rounded-3xl transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${colorStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
            {label}
          </p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

