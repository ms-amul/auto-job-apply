'use client';

import { Loader2, CheckCircle } from 'lucide-react';

export default function WorkflowStep({ step, index, isLast }) {
  const Icon = step.icon;

  const statusConfig = {
    active: {
      container: 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-105 z-10',
      icon: 'text-blue-600',
      text: 'text-blue-700',
      label: 'current'
    },
    complete: {
      container: 'bg-emerald-500/5 border-emerald-500/30 grayscale-0',
      icon: 'text-emerald-600',
      text: 'text-slate-900',
      label: 'complete'
    },
    idle: {
      container: 'bg-white/40 border-slate-200/60 opacity-60 grayscale',
      icon: 'text-slate-400',
      text: 'text-slate-500',
      label: 'pending'
    }
  };

  const config = statusConfig[step.status];

  return (
    <div className="relative flex-1">
      {/* Step Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[60%] right-[-40%] h-0.5 bg-slate-200">
          <div
            className={`h-full bg-emerald-500 transition-all duration-1000 ${step.status === 'complete' ? 'w-full' : 'w-0'}`}
          />
        </div>
      )}

      <div className={`
        relative flex flex-col items-center text-center p-5 rounded-[1.5rem] border transition-all duration-300
        ${config.container.replace('scale-105', '')}
      `}>
        <div className={`
          w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-white shadow-sm border border-slate-100 transition-all duration-300
        `}>
          {step.status === 'active' ? (
            <div className="relative">
              <Loader2 className={`w-8 h-8 animate-spin ${config.icon}`} />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
            </div>
          ) : step.status === 'complete' ? (
            <CheckCircle className={`w-8 h-8 ${config.icon}`} />
          ) : (
            <Icon className={`w-8 h-8 ${config.icon}`} />
          )}
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block opacity-50">
            Phase 0{index + 1}
          </span>
          <p className={`text-sm font-bold tracking-tight ${config.text}`}>
            {step.label}
          </p>
        </div>
      </div>
    </div>
  );
}

