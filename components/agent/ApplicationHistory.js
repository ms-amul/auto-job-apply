'use client';

import PremiumCard from '@/components/ui/PremiumCard';
import ApplicationHistoryItem from './ApplicationHistoryItem';
import { History } from 'lucide-react';

export default function ApplicationHistory({ applicationHistory }) {
  if (!applicationHistory || applicationHistory.length === 0) return null;

  return (
    <PremiumCard>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-lg">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Session Activity</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent dispatches</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-sm font-black text-slate-700">
              {applicationHistory.length} <span className="opacity-50">Jobs</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {applicationHistory.map((item, index) => (
            <ApplicationHistoryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </PremiumCard>
  );
}

