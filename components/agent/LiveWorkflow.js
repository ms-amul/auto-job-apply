'use client';

import { Clock, Radio } from 'lucide-react';
import PremiumCard from '@/components/ui/PremiumCard';
import WorkflowStep from './WorkflowStep';

export default function LiveWorkflow({ workflow, nextApplicationIn }) {
  return (
    <PremiumCard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Radio className="w-5 h-5 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Real-time Pipeline</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live automation activity</p>
            </div>
          </div>

          {nextApplicationIn !== null && (
            <div className="flex items-center gap-3 px-5 py-3 bg-white/40 border border-white/60 rounded-[1.5rem] shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-black text-slate-700">
                Next Application: <span className="text-blue-600 ml-1">{nextApplicationIn}s</span>
              </span>
            </div>
          )}
        </div>

        {/* Workflow Steps Grid with Horizontal Connection Layout */}
        <div className="relative group">
          {/* Subtle Background Rail */}
          <div className="hidden lg:block absolute top-[50%] left-10 right-10 h-1 bg-slate-100/50 rounded-full" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.steps.map((step, index) => (
              <WorkflowStep
                key={step.id}
                step={step}
                index={index}
                isLast={index === workflow.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </PremiumCard>
  );
}

