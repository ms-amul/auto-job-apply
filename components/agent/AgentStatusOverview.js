'use client';

import { Bot, Check, Calendar, TrendingUp, CheckCircle, Target } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import { theme } from '@/utils/theme';
import StatCard from './StatCard';

export default function AgentStatusOverview({ isRunning, isConfigured, stats }) {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: theme.getAccentGradient(135) }}
          >
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">Agent Status</p>
            <p className="text-sm text-slate-600 mt-1">
              {isRunning ? 'Actively searching and applying to jobs' : 'Agent is paused'}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span className="text-sm font-semibold text-slate-700">
              {isRunning ? 'Running' : 'Paused'}
            </span>
          </div>
          {isConfigured && (
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Configured
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
    </GlassPanel>
  );
}

