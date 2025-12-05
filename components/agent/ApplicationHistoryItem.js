'use client';

import { CheckCircle, Building2, MapPin } from 'lucide-react';

export default function ApplicationHistoryItem({ item, index }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl animate-fadeIn">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold shrink-0">
        {index + 1}
      </div>
      
      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
        {item.job.companyLogo ? (
          <img 
            src={item.job.companyLogo} 
            alt={item.job.company}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <Building2 className="w-6 h-6 text-slate-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 truncate">{item.job.title}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            {item.job.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {item.job.location}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-lg">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-xs font-semibold text-emerald-700">Applied</span>
        </div>
        <span className="text-xs text-slate-500">{item.timeTaken}</span>
      </div>
    </div>
  );
}

