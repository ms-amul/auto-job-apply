'use client';

import { Activity, Clock } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import TimelineStep from './TimelineStep';

export default function HowItWorks() {
  return (
    <GlassPanel>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-50">
          <Activity className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">How It Works</h3>
      </div>
      
      <div className="space-y-4">
        <TimelineStep 
          number="1" 
          title="Configure Preferences" 
          description="Set job preferences, keywords, and daily limits"
        />
        <TimelineStep 
          number="2" 
          title="Start Agent" 
          description="Activate the agent to begin auto-applying"
        />
        <TimelineStep 
          number="3" 
          title="Timed Applications" 
          description="Agent applies to 1 job every minute automatically"
        />
        <TimelineStep 
          number="4" 
          title="Track Progress" 
          description="Monitor applications in real-time"
        />
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Timing</p>
              <p className="text-sm text-blue-800">
                The agent applies to 1 job per minute to simulate natural application patterns and respect rate limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

