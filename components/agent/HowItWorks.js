'use client';

import { Activity, Clock, Info } from 'lucide-react';
import PremiumCard from '@/components/ui/PremiumCard';
import TimelineStep from './TimelineStep';

export default function HowItWorks() {
  return (
    <PremiumCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20">
          <Activity className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Operation Protocol</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">How automation works</p>
        </div>
      </div>

      <div className="space-y-3">
        <TimelineStep
          number="1"
          title="Global Parameters"
          description="Define your target keywords and daily limits"
        />
        <TimelineStep
          number="2"
          title="Initialize Agent"
          description="Bootstrap the AI engine with your preferences"
        />
        <TimelineStep
          number="3"
          title="Stealth Dispatch"
          description="Automated submissions at human-like intervals"
        />
        <TimelineStep
          number="4"
          title="Telemetry Feed"
          description="Real-time monitoring of all application states"
        />
      </div>

      <div className="mt-2 pt-2 border-t border-white/60">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <div>
              <p className="text-sm font-black text-white mb-1 uppercase tracking-widest flex items-center gap-2">
                Operational Tempo
                <Info className="w-3 h-3 text-slate-500" />
              </p>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                The agent operates at a controlled frequency (1 job/min) to maintain high deliverability and respect platform rate limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
}

