'use client';

import Button from '@/components/ui/Button';
import { Activity, Bell, Clock, Crown, Mail, MessageSquare, Search, X } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

export default function AgentConfigPanel({
  isOpen,
  onClose,
  configForm,
  setConfigForm,
  onSave
}) {
  if (!isOpen) return null;

  const isPremium = configForm.dailyLimit > 10;
  const sliderPercentage = (configForm.dailyLimit / 20) * 100;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden">
      {/* Sleek premium indicator */}
      {isPremium && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
      )}

      <div className="p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Agent Configuration</h2>
            <p className="text-sm text-slate-500 mt-1">Customize your AI agent settings</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Daily Application Limit */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <label className="text-sm font-medium text-slate-700">
                Daily Application Limit
              </label>
              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border transition-all duration-300 ${isPremium
                  ? 'bg-blue-50/80 border-blue-300/60 shadow-lg shadow-blue-500/20 backdrop-blur-sm'
                  : 'bg-emerald-50/80 border-emerald-300/60 shadow-sm'
                }`}
              >
                <span className={`text-2xl font-semibold ${isPremium ? 'text-blue-600' : 'text-emerald-700'
                  }`}>
                  {configForm.dailyLimit}
                </span>
                <span className={`text-sm font-medium ${isPremium ? 'text-blue-600/70' : 'text-emerald-600/70'
                  }`}>
                  / day
                </span>
                {isPremium && (
                  <>
                    <Crown className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">Premium</span>
                  </>
                )}
              </div>
            </div>

            {/* Premium Horizontal Slider - Pure Tailwind */}
            <div className="relative py-1">

              {/* Slider Track Container */}
              <div className="relative">
                {/* Background Track */}
                <div className="h-2 bg-slate-200 rounded-full">
                  {/* Progress Fill */}
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${isPremium
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                    style={{ width: `${sliderPercentage}%` }}
                  />
                </div>

                {/* Native Range Input */}
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={configForm.dailyLimit}
                  onChange={(e) => setConfigForm({ ...configForm, dailyLimit: parseInt(e.target.value) })}
                  className="slider-input absolute top-0 left-0 w-full h-2 cursor-pointer z-20"
                />
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Job Keywords
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={configForm.keywords}
                onChange={(e) => setConfigForm({ ...configForm, keywords: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-slate-900 placeholder-slate-400 text-sm transition-all"
                placeholder="React, Node.js, Python, TypeScript"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-slate-100/80 flex items-center justify-center">
                <Bell className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Notification Settings</h3>
            </div>

            <div className="space-y-3">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-500 mt-0.5">Get notified via email when jobs are applied</p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={configForm.emailNotifications}
                  onChange={(checked) => setConfigForm({ ...configForm, emailNotifications: checked })}
                />
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">SMS Notifications</p>
                    <p className="text-xs text-slate-500 mt-0.5">Receive text alerts for job applications</p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={configForm.smsNotifications}
                  onChange={(checked) => setConfigForm({ ...configForm, smsNotifications: checked })}
                />
              </div>
            </div>
          </div>

          {/* Application Preferences */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-slate-100/80 flex items-center justify-center">
                <Activity className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Application Preferences</h3>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Apply Most Recent Jobs First</p>
                  <p className="text-xs text-slate-500 mt-0.5">Prioritize newly posted positions</p>
                </div>
              </div>
              <ToggleSwitch
                checked={configForm.applyRecentFirst}
                onChange={(checked) => setConfigForm({ ...configForm, applyRecentFirst: checked })}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-slate-200/60">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all"
          >
            <span>Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

