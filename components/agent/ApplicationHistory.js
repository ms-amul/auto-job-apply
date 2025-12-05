'use client';

import GlassPanel from '@/components/ui/GlassPanel';
import ApplicationHistoryItem from './ApplicationHistoryItem';

export default function ApplicationHistory({ applicationHistory }) {
  if (!applicationHistory || applicationHistory.length === 0) return null;

  return (
    <GlassPanel>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Recent Applications</h3>
          <span className="text-sm text-slate-600">
            {applicationHistory.length} applied in this session
          </span>
        </div>

        <div className="space-y-3">
          {applicationHistory.map((item, index) => (
            <ApplicationHistoryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

