/**
 * Auto-Apply Bot Page - Premium & Professional
 * - Fixed consistent padding (p-6)
 * - Rich, premium design
 * - Uses theme.js colors only
 * - Mobile responsive
 */

'use client';

import { useEffect, useState } from 'react';
import { Bot, Zap, Play, Pause, Settings as SettingsIcon, Activity, TrendingUp, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SectionLoader } from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import botData from '@/data/bot-data.json';
import { theme } from '@/utils/theme';

export default function BotPage() {
  const [user, setUser] = useState(null);
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Load bot data from mock
      if (userData.role === 'recruiter') {
        setBot(botData.recruiterBot[userData.id]);
      } else {
        setBot(botData.applicantBot[userData.id]);
      }
    }
    setLoading(false);
  }, []);

  const toggleBot = () => {
    setBot({ ...bot, enabled: !bot.enabled });
    toast.success(bot.enabled ? 'Bot paused' : 'Bot activated');
  };

  if (loading) return <SectionLoader />;

  if (user?.role === 'recruiter') {
    return <RecruiterBotView bot={bot} toggleBot={toggleBot} />;
  }

  return <ApplicantBotView bot={bot} toggleBot={toggleBot} />;
}

// Applicant Bot View
function ApplicantBotView({ bot, toggleBot }) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Auto-Apply Bot
          </h1>
          <p className="text-base text-gray-600 mt-2">Automate your job applications with AI</p>
        </div>
        <Button
          onClick={toggleBot}
          variant={bot?.enabled ? 'danger' : 'primary'}
          size="lg"
          className="w-full sm:w-auto"
        >
          {bot?.enabled ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{bot?.enabled ? 'Pause Bot' : 'Start Bot'}</span>
        </Button>
      </div>

      {/* Status Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Bot Status</p>
              <p className="text-sm text-gray-600 mt-1">Last run: {new Date(bot?.lastRun).toLocaleString()}</p>
            </div>
          </div>
          <span 
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              bot?.enabled 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {bot?.enabled ? 'Active' : 'Paused'}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Today" 
            value={bot?.applicationsToday || 0}
            icon={TrendingUp}
            color="blue"
          />
          <StatCard 
            label="This Week" 
            value={bot?.applicationsThisWeek || 0}
            icon={Activity}
            color="indigo"
          />
          <StatCard 
            label="Total Applied" 
            value={bot?.applicationsTotal || 0}
            icon={CheckCircle}
            color="purple"
          />
          <StatCard 
            label="Success Rate" 
            value={bot?.successRate || '0%'}
            icon={TrendingUp}
            color="green"
            isPercentage
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentPrimary}15` }}
            >
              <SettingsIcon className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Bot Settings</h3>
          </div>
          
          <div className="space-y-4">
            <SettingRow label="Daily Limit" value={`${bot?.settings.dailyLimit} applications`} />
            <SettingRow label="Min Salary" value={`$${bot?.settings.salaryMin.toLocaleString()}`} />
            
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Job Types</p>
              <div className="flex flex-wrap gap-2">
                {bot?.settings.jobTypes.map((type, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Keywords</p>
              <div className="flex flex-wrap gap-2">
                {bot?.settings.keywords.map((keyword, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                    style={{ background: theme.getAccentGradient(135) }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" className="w-full" onClick={() => toast('Settings coming soon!')}>
              <SettingsIcon className="w-4 h-4" />
              <span>Configure Settings</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentPrimary}15` }}
            >
              <Activity className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          </div>
          
          <div className="space-y-3">
            {bot?.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900">{activity.jobTitle}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.company}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium shrink-0 ml-3">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Recruiter Bot View
function RecruiterBotView({ bot, toggleBot }) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            AI Recruitment Assistant
          </h1>
          <p className="text-base text-gray-600 mt-2">Automate candidate screening & engagement</p>
        </div>
        <Button
          onClick={toggleBot}
          variant={bot?.enabled ? 'danger' : 'primary'}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Zap className="w-5 h-5" />
          <span>{bot?.enabled ? 'Pause AI' : 'Activate AI'}</span>
        </Button>
      </div>

      {/* Status Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">AI Status</p>
              <p className="text-sm text-gray-600 mt-1">Last run: {new Date(bot?.lastRun).toLocaleString()}</p>
            </div>
          </div>
          <span 
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              bot?.enabled 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {bot?.enabled ? 'Active' : 'Paused'}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard 
            label="Candidates Screened" 
            value={bot?.candidatesScreened || 0}
            icon={Activity}
            color="blue"
          />
          <StatCard 
            label="Shortlisted" 
            value={bot?.candidatesShortlisted || 0}
            icon={CheckCircle}
            color="green"
          />
          <StatCard 
            label="Messages Sent" 
            value={bot?.messagesSent || 0}
            icon={TrendingUp}
            color="indigo"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentPrimary}15` }}
            >
              <SettingsIcon className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">AI Settings</h3>
          </div>
          
          <div className="space-y-4">
            <ToggleRow 
              label="Auto Screen" 
              enabled={bot?.settings.autoScreen}
            />
            <ToggleRow 
              label="Auto Message" 
              enabled={bot?.settings.autoMessage}
            />
            <SettingRow 
              label="Min Experience" 
              value={`${bot?.settings.screeningCriteria.minExperience} years`}
            />
            <SettingRow 
              label="Required Skills" 
              value={bot?.settings.screeningCriteria.requiredSkills.join(', ')}
            />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" className="w-full" onClick={() => toast('Settings coming soon!')}>
              <SettingsIcon className="w-4 h-4" />
              <span>Configure AI Settings</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentPrimary}15` }}
            >
              <Activity className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          </div>
          
          <div className="space-y-3">
            {bot?.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900">{activity.applicantName}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                </div>
                <p className="text-xs text-gray-500 shrink-0 ml-4">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon: Icon, color, isPercentage }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <div 
          className={`w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br ${colors[color]}`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className={`text-3xl font-bold ${isPercentage && value !== '0%' ? 'text-green-600' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
}

// Setting Row Component
function SettingRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}

// Toggle Row Component
function ToggleRow({ label, enabled }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span 
        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
          enabled 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}
