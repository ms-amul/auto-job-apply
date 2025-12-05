'use client';

import { Loader2, CheckCircle } from 'lucide-react';

export default function WorkflowStep({ step, index }) {
  const Icon = step.icon;
  
  const getStatusColor = () => {
    switch (step.status) {
      case 'active': return 'border-blue-500 bg-blue-50';
      case 'complete': return 'border-emerald-500 bg-emerald-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getIconColor = () => {
    switch (step.status) {
      case 'active': return 'text-blue-600';
      case 'complete': return 'text-emerald-600';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="relative">
      <div className={`border-2 rounded-xl p-4 transition-all duration-300 ${getStatusColor()}`}>
        <div className="flex items-center gap-3 mb-2">
          {step.status === 'active' ? (
            <Loader2 className={`w-5 h-5 animate-spin ${getIconColor()}`} />
          ) : step.status === 'complete' ? (
            <CheckCircle className={`w-5 h-5 ${getIconColor()}`} />
          ) : (
            <Icon className={`w-5 h-5 ${getIconColor()}`} />
          )}
          <span className={`text-sm font-semibold ${
            step.status === 'idle' ? 'text-slate-500' : 'text-slate-900'
          }`}>
            Step {index + 1}
          </span>
        </div>
        <p className={`text-sm ${
          step.status === 'idle' ? 'text-slate-500' : 'text-slate-700'
        }`}>
          {step.label}
        </p>
      </div>
    </div>
  );
}

