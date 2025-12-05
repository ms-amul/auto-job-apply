'use client';

import { Clock } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import WorkflowStep from './WorkflowStep';

export default function LiveWorkflow({ workflow, nextApplicationIn }) {
  return (
    <GlassPanel>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Live Workflow</h3>
          {nextApplicationIn !== null && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Next in {nextApplicationIn}s
              </span>
            </div>
          )}
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
    </GlassPanel>
  );
}

