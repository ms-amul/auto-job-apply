'use client';

import { createPortal } from 'react-dom';
import { theme } from '@/utils/theme';
import { useEffect, useState } from 'react';
import { Activity, Bell, Clock, Crown, Mail, MessageSquare, Search, Target, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import ToggleSwitch from './ToggleSwitch';

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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Super Premium Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Glassmorphic Modal Container */}
      <div className="relative w-full max-w-2xl transform animate-slideUp overflow-hidden rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/40">

        {/* Dynamic Glass Core */}
        <div
          className="absolute inset-0 bg-white/60 backdrop-blur-2xl saturate-[1.8]"
          style={{ WebkitBackdropFilter: 'blur(40px) saturate(1.8)' }}
        />

        {/* Decorative Internal Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Glass Reflection Layers */}
        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent" />

        <div className="relative z-10 p-4 lg:p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-3">
                <Activity className="w-3 h-3 text-blue-600" />
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Automation Settings</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Agent <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.getAccentGradient(90) }}>Configuration</span>
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Personalize your AI job search assistant</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-white/50 border border-slate-200/50 hover:bg-white rounded-full transition-all duration-300 hover:rotate-90 shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Daily Application Limit Card */}
            <div className="relative p-4 rounded-[2rem] bg-white/40 border border-white/60 shadow-xl overflow-hidden group">
              {/* Inner glass shine */}
              <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 tracking-tight">Daily Application Limit</label>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Jobs per day</p>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-500 ${isPremium
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/30'
                    : 'bg-emerald-500 text-white border-emerald-400 shadow-xl shadow-emerald-500/20'
                    }`}
                  >
                    <span className="text-2xl font-black">{configForm.dailyLimit}</span>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase leading-none">Max</span>
                      <span className="text-[9px] font-black uppercase leading-none opacity-70">Daily</span>
                    </div>
                    {isPremium && <Crown className="w-5 h-5 fill-white/20" />}
                  </div>
                </div>

                {/* Custom Slider */}
                <div className="relative py-4">
                  <div className="h-4 bg-slate-200/40 rounded-full overflow-hidden border border-white/60 backdrop-blur-sm">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isPremium
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600'
                        : 'bg-gradient-to-r from-emerald-500 to-blue-600'
                        }`}
                      style={{ width: `${sliderPercentage}%` }}
                    >
                      <div className="w-full h-full animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={configForm.dailyLimit}
                    onChange={(e) => setConfigForm({ ...configForm, dailyLimit: parseInt(e.target.value) })}
                    className="slider-input absolute top-0 left-0 w-full h-12 cursor-pointer z-20 opacity-0"
                  />
                  <div className="flex justify-between mt-3 px-1">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-200 rounded-full mb-1" />
                      <span className="text-[10px] font-black text-slate-400">1</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-blue-200 rounded-full mb-1" />
                      <span className="text-[10px] font-black text-blue-500">10 (Basic)</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-indigo-200 rounded-full mb-1" />
                      <span className="text-[10px] font-black text-indigo-500">20 (Premium)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <Search className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Job Search Keywords</h3>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 blur-xl group-focus-within:bg-blue-500/10 transition-colors rounded-3xl" />
                <input
                  type="text"
                  value={configForm.keywords}
                  onChange={(e) => setConfigForm({ ...configForm, keywords: e.target.value })}
                  className="relative z-10 w-full pl-6 pr-6 py-5 bg-white/50 border border-slate-200/80 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 text-slate-900 font-bold placeholder-slate-400 transition-all shadow-sm"
                  placeholder="React, Node.js, Python, TypeScript..."
                />
              </div>
            </div>

            {/* Preferences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2 flex items-center gap-3 mt-4 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <Bell className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Preferences & Alerts</h3>
              </div>

              <PremiumToggle
                icon={Mail}
                label="Email Alerts"
                subtext="Status updates"
                active={configForm.emailNotifications}
                onChange={(v) => setConfigForm({ ...configForm, emailNotifications: v })}
                color="blue"
              />
              <PremiumToggle
                icon={MessageSquare}
                label="SMS Alerts"
                subtext="Instant notifications"
                active={configForm.smsNotifications}
                onChange={(v) => setConfigForm({ ...configForm, smsNotifications: v })}
                color="indigo"
              />
              <PremiumToggle
                icon={Clock}
                label="Recent First"
                subtext="Newest opportunities"
                active={configForm.applyRecentFirst}
                onChange={(v) => setConfigForm({ ...configForm, applyRecentFirst: v })}
                color="violet"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-2 border-t border-slate-200/40">
            <button
              onClick={onClose}
              className="px-8 py-4 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Discard Changes
            </button>
            <Button
              variant="primary"
              onClick={onSave}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-[0_15px_30px_-5px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-3 group"
            >
              <Activity className="w-5 h-5 group-hover:animate-pulse" />
              <span>Update Configuration</span>
            </Button>
          </div>
        </div>

        {/* Animation Styles */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { 
            from { opacity: 0; transform: translateY(40px) scale(0.95); } 
            to { opacity: 1; transform: translateY(0) scale(1); } 
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
          .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-shimmer { animation: shimmer 2.5s infinite linear; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function PremiumToggle({ icon: Icon, label, subtext, active, onChange, color }) {
  const colors = {
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500'
  };

  return (
    <div className="flex items-center justify-between p-5 bg-white/40 border border-white/60 rounded-3xl hover:bg-white/60 transition-all group cursor-pointer" onClick={() => onChange(!active)}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-2xl bg-white border border-slate-200 group-hover:border-${color}-200 transition-colors shadow-sm flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${active ? 'text-' + color + '-600' : 'text-slate-600'}`} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 leading-none">{label}</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{subtext}</p>
        </div>
      </div>
      <ToggleSwitch checked={active} onChange={onChange} />
    </div>
  );
}


