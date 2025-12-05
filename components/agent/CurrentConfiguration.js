'use client';

import { Settings as SettingsIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import ConfigRow from './ConfigRow';

export default function CurrentConfiguration({ agent, isConfigured, onConfigure }) {
  return (
    <GlassPanel>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
          <SettingsIcon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Current Configuration</h3>
      </div>
      
      {isConfigured ? (
        <div className="space-y-4">
          <ConfigRow label="Daily Limit" value={`${agent.dailyLimit} applications/day`} />
          <ConfigRow 
            label="Email Notifications" 
            value={agent.emailNotifications !== false ? 'Enabled' : 'Disabled'} 
          />
          <ConfigRow 
            label="SMS Notifications" 
            value={agent.smsNotifications ? 'Enabled' : 'Disabled'} 
          />
          <ConfigRow 
            label="Apply Recent First" 
            value={agent.applyRecentFirst !== false ? 'Enabled' : 'Disabled'} 
          />
          
          <div className="pt-2">
            <p className="text-sm font-medium text-slate-700 mb-3">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {agent.keywords?.map((keyword, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">Agent not configured yet</p>
          <Button variant="primary" onClick={onConfigure}>
            <SettingsIcon className="w-4 h-4" />
            <span>Configure Now</span>
          </Button>
        </div>
      )}
    </GlassPanel>
  );
}

