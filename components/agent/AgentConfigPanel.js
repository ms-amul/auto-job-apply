'use client';

import { createPortal } from 'react-dom';
import { theme } from '@/utils/theme';
import { useEffect, useState } from 'react';
import { Activity, Clock, Mail, MessageSquare, Search, Target, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import ToggleSwitch from './ToggleSwitch';
import MinPayRate from '../ui/MinPayRate';

export default function AgentConfigPanel({
  isOpen,
  onClose,
  configForm,
  setConfigForm,
  onSave
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const isPremium = configForm.dailyLimit > 10;
  const sliderPercentage = (configForm.dailyLimit / 20) * 100;

  const modalContent = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Subtle Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Minimal Glass Modal */}
      <div className="relative w-full max-w-lg transform animate-slideUp overflow-hidden rounded-3xl shadow-2xl border border-white/40">

        {/* Glass Core */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />

        <div className="relative z-10 p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Agent Configuration
              </h2>
              <p className="text-xs font-medium text-slate-500">Configure your automated search</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Minimal Application Limit */}
          <div className="p-4 rounded-2xl bg-white/50 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-800">Daily Limit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-black ${isPremium ? 'text-blue-600' : 'text-emerald-600'}`}>
                  {configForm.dailyLimit}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Applications</span>
              </div>
            </div>

            <div className="relative px-1">
              <div className="h-2 bg-slate-200/50 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isPremium ? 'bg-blue-600' : 'bg-emerald-500'}`}
                  style={{ width: `${sliderPercentage}%` }}
                />
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={configForm.dailyLimit}
                onChange={(e) => setConfigForm({ ...configForm, dailyLimit: parseInt(e.target.value) })}
                className="absolute inset-0 w-full h-2 cursor-pointer opacity-0 z-20"
              />
              <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400">
                <span>1</span>
                <span>10 (Basic)</span>
                <span>20 (Premium)</span>
              </div>
            </div>
          </div>
          {/* Min Pay Rate */}
          <div className="p-1 rounded-2xl bg-white/50 border border-slate-100 shadow-sm my-2">
            <MinPayRate
              value={configForm.minPayRate}
              onChange={(value) => setConfigForm({ ...configForm, minPayRate: value })}
            />
          </div>
          {/* Compact Keywords */}
          <div className="space-y-1 my-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500" />
              <label className="text-sm font-bold text-slate-800">Keywords</label>
            </div>
            <input
              type="text"
              value={configForm.keywords}
              onChange={(e) => setConfigForm({ ...configForm, keywords: e.target.value })}
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/40 text-sm placeholder-slate-400 transition-all"
              placeholder="e.g. React, Python, Remote..."
            />
          </div>

          {/* Compact Toggles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <CompactToggle
              icon={Mail}
              label="Email Alerts"
              active={configForm.emailNotifications}
              onChange={(v) => setConfigForm({ ...configForm, emailNotifications: v })}
            />
            <CompactToggle
              icon={MessageSquare}
              label="SMS Alerts"
              active={configForm.smsNotifications}
              onChange={(v) => setConfigForm({ ...configForm, smsNotifications: v })}
            />
            <div className="col-span-2">
              <CompactToggle
                icon={Clock}
                label="Prioritize Newest Jobs First"
                active={configForm.applyRecentFirst}
                onChange={(v) => setConfigForm({ ...configForm, applyRecentFirst: v })}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex items-center justify-end gap-3 mt-2 p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Activity className="w-3.5 h-3.5" />
            Update Config
          </button>
        </div>

        {/* Minimal Animation Styles */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { 
            from { opacity: 0; transform: translateY(20px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function CompactToggle({ icon: Icon, label, active, onChange }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${active ? 'bg-blue-50/50 border-blue-200' : 'bg-white/50 border-slate-100 hover:border-slate-200'
        }`}
      onClick={() => onChange(!active)}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
        <span className={`text-xs font-bold ${active ? 'text-blue-900' : 'text-slate-600'}`}>
          {label}
        </span>
      </div>
      <ToggleSwitch checked={active} onChange={onChange} />
    </div>
  );
}


