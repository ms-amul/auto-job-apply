'use client';

import { CheckCircle, Clock, FileText, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';

export default function DailyLimitReached({ agent, stats, onRestart }) {
  return (
    <GlassPanel>
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 opacity-60" />
        
        {/* Content */}
        <div className="relative space-y-6 py-8">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Daily Limit Reached
            </h3>
            <p className="text-slate-600 max-w-md">
              You've reached your daily application limit of {agent?.dailyLimit || 10} applications. 
              The agent has been paused automatically.
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                {stats?.today || 0}
              </div>
              <div className="text-sm text-slate-600">Applied Today</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {stats?.thisWeek || 0}
              </div>
              <div className="text-sm text-slate-600">This Week</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats?.successRate || '0%'}
              </div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>

          {/* Action Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-full">
              <Clock className="w-5 h-5 text-amber-700" />
              <span className="text-sm font-medium text-amber-900">
                Agent will resume tomorrow or you can restart it manually
              </span>
            </div>
            
            <div className="flex justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/dashboard/applications'}
              >
                <FileText className="w-4 h-4" />
                <span>View Applications</span>
              </Button>
              <Button
                variant="primary"
                onClick={onRestart}
              >
                <Play className="w-4 h-4" />
                <span>Restart Agent</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

