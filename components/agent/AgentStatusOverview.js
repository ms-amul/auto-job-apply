'use client';

import { Bot, Check, Calendar, TrendingUp, CheckCircle, Target } from 'lucide-react';
import { theme } from '@/utils/theme';
import StatCard from './StatCard';
import PremiumCard from '@/components/ui/PremiumCard';

export default function AgentStatusOverview({ isRunning, isConfigured, stats }) {
  return (
    <PremiumCard padding="p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300"
            style={{ background: theme.getAccentGradient(135) }}
          >
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-1.5 ${isRunning ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-600 border border-slate-500/20'
              }`}>
              <div className={`w-1 h-1 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {isRunning ? 'System Active' : 'System Paused'}
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Agent Status</h3>
            <p className="text-[13px] font-medium text-slate-500 max-w-sm leading-relaxed" aria-live="polite">
              {isRunning
                ? 'Your intelligent assistant is actively searching and applying to matching jobs.'
                : 'Agent is currently idle. Configure or start the agent to begin automation.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConfigured && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/40 border border-white/60 rounded-xl shadow-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-[13px] font-bold text-slate-700">Fully Configured</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Today"
          value={stats?.today || 0}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          label="This Week"
          value={stats?.thisWeek || 0}
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          label="Total Applied"
          value={stats?.total || 0}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          label="Success Rate"
          value={stats?.successRate || '0%'}
          icon={Target}
          color="green"
        />
      </div>
    </PremiumCard>
  );
}

