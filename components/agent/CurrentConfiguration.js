'use client';

import { Settings as SettingsIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import PremiumCard from '@/components/ui/PremiumCard';
import ConfigRow from './ConfigRow';

export default function CurrentConfiguration({ agent, isConfigured, onConfigure }) {
  return (
    <PremiumCard>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
            <SettingsIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Config</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global parameters</p>
          </div>
        </div>

        {isConfigured && (
          <button
            onClick={onConfigure}
            className="p-2 hover:bg-white/60 cursor-pointer rounded-xl border border-white/60 transition-colors shadow-sm"
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {isConfigured ? (
        <div className="space-y-6">
          <div className="bg-white/40 border border-white/60 p-5 rounded-3xl">
            <ConfigRow label="Daily Limit" value={`${agent.dailyLimit} Apps`} />
            <ConfigRow
              label="Email Sync"
              value={agent.emailNotifications !== false ? 'Connected' : 'Paused'}
            />
            <ConfigRow
              label="SMS Link"
              value={agent.smsNotifications ? 'Active' : 'Inactive'}
            />
            <ConfigRow
              label="Strict Mode"
              value={agent.applyRecentFirst !== false ? 'Priority' : 'General'}
            />
            <ConfigRow
              label="Min Pay Rate"
              value={agent.minPayRate ? `$${agent.minPayRate}/hr` : 'Not Set'}
            />
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Target Keywords</p>
            <div className="flex flex-wrap gap-2">
              {agent.keywords?.map((keyword, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-black tracking-tight shadow-lg transition-transform hover:scale-110"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <SettingsIcon className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">Agent not initialized</p>
          <Button variant="primary" onClick={onConfigure} className="h-12 px-8">
            <SettingsIcon className="w-4 h-4" />
            <span>Bootstrap Agent</span>
          </Button>
        </div>
      )}
    </PremiumCard>
  );
}

