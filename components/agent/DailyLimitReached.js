'use client';

import { CheckCircle, Clock, FileText, Play, Crown } from 'lucide-react';
import Button from '@/components/ui/Button';
import PremiumCard from '@/components/ui/PremiumCard';

export default function DailyLimitReached({ agent, stats, onRestart }) {
  return (
    <PremiumCard>
      <div className="relative py-4 md:py-8">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative space-y-12">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-[2.5rem] bg-slate-900 flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 hover:rotate-3 duration-500">
                <CheckCircle className="w-12 h-12 text-amber-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center border-4 border-white shadow-lg">
                <Crown className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Daily Target <span className="text-amber-600">Achieved</span>
            </h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest max-w-sm leading-relaxed">
              System successfully dispatched {agent?.dailyLimit || 10} applications today.
              Automation is now in standby mode.
            </p>
          </div>

          {/* Stats Summary Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto bg-white/20 border border-white/60 p-4 rounded-[2.5rem]">
            <div className="bg-white/60 border border-white shadow-sm rounded-3xl p-6 text-center transform transition-all hover:scale-105">
              <div className="text-4xl font-black text-amber-600 tracking-tighter mb-1">
                {stats?.today || 0}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Apps Today</div>
            </div>
            <div className="bg-white/60 border border-white shadow-sm rounded-3xl p-6 text-center transform transition-all hover:scale-105">
              <div className="text-4xl font-black text-emerald-600 tracking-tighter mb-1">
                {stats?.thisWeek || 0}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Weekly Total</div>
            </div>
            <div className="bg-white/60 border border-white shadow-sm rounded-3xl p-6 text-center transform transition-all hover:scale-105">
              <div className="text-4xl font-black text-blue-600 tracking-tighter mb-1">
                {stats?.successRate || '0%'}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Success Opt.</div>
            </div>
          </div>

          {/* Action Hub */}
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <div className="relative">
                <Clock className="w-5 h-5 text-amber-500" />
                <div className="absolute inset-0 bg-amber-500/20 blur animate-pulse" />
              </div>
              <span className="text-xs font-black text-white uppercase tracking-widest">
                System Reset in ~12 Hours
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.location.href = '/dashboard/applications'}
                className="h-14 px-8 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm"
              >
                <FileText className="w-5 h-5" />
                Track History
              </button>
              <Button
                variant="primary"
                onClick={onRestart}
                className="h-14 px-10 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl group"
              >
                <Play className="w-5 h-5 group-hover:animate-ping" />
                Override Limit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
}

