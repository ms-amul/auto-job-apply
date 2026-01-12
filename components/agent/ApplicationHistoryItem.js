'use client';

import { Building2, CheckCircle, MapPin, Zap } from 'lucide-react';

export default function ApplicationHistoryItem({ item, index }) {
  return (
    <div className="relative group bg-white/20 hover:bg-white/50 border border-white/60 p-4 rounded-2xl transition-all duration-300 animate-fadeIn cursor-pointer">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Index & Logo Section */}
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-transform duration-500">
            <Building2 className="w-7 h-7 text-slate-300" />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-black text-lg text-slate-900 truncate tracking-tight">{item.job.title}</h4>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Dispatched</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold text-slate-500 uppercase tracking-wide">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              {item.job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {item.job.location}
            </span>
          </div>
        </div>

        {/* Status & Timing Section */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-black text-white uppercase tracking-widest">{item.timeTaken} process</span>
          </div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
            Applied {new Date(item.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}

