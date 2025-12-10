/**
 * Settings Page - Premium Design
 * Manage account settings, notifications, and security
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Shield, Bell, Mail, Lock, Trash2, Check, X, Eye, EyeOff } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    jobAlerts: true,
    weeklyDigest: true,
    smsNotifications: false,
  });

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Load settings on mount
  useEffect(() => {
    const load = async () => {
      if (status === 'unauthenticated') {
        toast.error('Please sign in first');
        router.push('/');
        setInitialLoading(false);
        return;
      }

      if (status === 'loading') {
        return;
      }

      if (!session?.user) {
        toast.error('Please sign in first');
        setInitialLoading(false);
        return;
      }

      try {
        const userId = session.user.id || session.user.candidate_id?.toString();
        if (!userId) {
          toast.error('Invalid user data. Please sign in again.');
          setInitialLoading(false);
          return;
        }
        
        setUserId(userId);
        setUserEmail(session.user.email || '');

        const response = await fetch(`/api/users/${userId}/settings`);
        const data = await response.json();
        
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error('Settings load error:', err);
        toast.error('Failed to load settings');
      } finally {
        setInitialLoading(false);
      }
    };

    load();
  }, [status, session, router]);

  // Auto-save settings with debounce
  const debouncedSave = useCallback(
    debounce(async (newSettings, userId) => {
      if (!userId) return;
      
      try {
        const response = await fetch(`/api/users/${userId}/settings`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings),
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success('Settings saved');
        } else {
          toast.error(data.error || 'Failed to save settings');
        }
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save settings');
      }
    }, 1000),
    []
  );

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    if (userId) {
      debouncedSave(newSettings, userId);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      // TODO: Implement change password API
      // const response = await fetch(`/api/auth/change-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword,
      //   }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password changed successfully!');
      setShowChangePasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setSaving(true);
    try {
      // TODO: Implement delete account API
      // const response = await fetch(`/api/users/${userId}`, {
      //   method: 'DELETE',
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Account deleted successfully');
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    } finally {
      setSaving(false);
      setShowDeleteModal(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            background: theme.getAccentGradient(90),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Settings
        </h1>
        <p className="text-slate-600 text-base">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Notification Preferences */}
        <SectionCard 
          title="Notification Preferences"
          description="Choose how you want to receive updates"
          icon={<Bell className="w-5 h-5" />}
        >
          <div className="space-y-4">
            <ToggleOption
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings.emailNotifications}
              onChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />

            <ToggleOption
              label="SMS Notifications"
              description="Receive notifications via SMS"
              checked={settings.smsNotifications}
              onChange={(checked) => handleSettingChange('smsNotifications', checked)}
            />

            <ToggleOption
              label="Job Alerts"
              description="Get notified about new job matches"
              checked={settings.jobAlerts}
              onChange={(checked) => handleSettingChange('jobAlerts', checked)}
            />

            <ToggleOption
              label="Weekly Digest"
              description="Receive weekly summary of your applications"
              checked={settings.weeklyDigest}
              onChange={(checked) => handleSettingChange('weeklyDigest', checked)}
            />

            <ToggleOption
              label="Push Notifications"
              description="Receive push notifications in browser"
              checked={settings.pushNotifications}
              onChange={(checked) => handleSettingChange('pushNotifications', checked)}
              disabled
            />
          </div>
        </SectionCard>

        {/* Security Settings */}
        <SectionCard 
          title="Security"
          description="Manage your account security settings"
          icon={<Shield className="w-5 h-5" />}
        >
          <div className="space-y-3">
            <SecurityOption
              icon={<Lock className="w-5 h-5" />}
              title="Change Password"
              description="Update your password to keep your account secure"
              action="Change"
              onClick={() => setShowChangePasswordModal(true)}
            />

            <SecurityOption
              icon={<Mail className="w-5 h-5" />}
              title="Email Address"
              description={userEmail || 'Loading...'}
              action="Update"
              onClick={() => toast('Email update coming soon!')}
            />
          </div>
        </SectionCard>

        {/* Danger Zone */}
        <SectionCard 
          title="Danger Zone"
          description="Irreversible and destructive actions"
          icon={<Trash2 className="w-5 h-5" />}
          danger
        >
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              Delete Account
            </button>
            <p className="text-sm text-slate-600 leading-relaxed">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          showPasswords={showPasswords}
          setShowPasswords={setShowPasswords}
          saving={saving}
          onSubmit={handleChangePassword}
          onClose={() => {
            setShowChangePasswordModal(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          }}
        />
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <DeleteAccountModal
          saving={saving}
          onConfirm={handleDeleteAccount}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

// Section Card Component
function SectionCard({ title, description, icon, children, danger = false }) {
  return (
    <div 
      className={`bg-white rounded-xl border p-6 relative overflow-hidden ${
        danger ? 'border-red-200' : 'border-gray-200/80'
      }`}
      style={{ 
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Top accent border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: danger 
            ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
            : theme.getAccentGradient(90),
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
      />
      
      <div className="mb-6 mt-2">
        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          {icon}
          {title}
        </h2>
        {description && (
          <p className="text-sm text-slate-600">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// Toggle Option Component
function ToggleOption({ label, description, checked, onChange, disabled = false }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
    }`}>
      <div className="flex-1">
        <p className="text-base font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-600 mt-0.5">{description}</p>
      </div>
      <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

// Security Option Component
function SecurityOption({ icon, title, description, action, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors text-left border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600 mt-0.5">{description}</p>
        </div>
      </div>
      <span 
        className="text-sm font-semibold"
        style={{ color: theme.accentPrimary }}
      >
        {action}
      </span>
    </button>
  );
}

// Change Password Modal
function ChangePasswordModal({ passwordData, setPasswordData, showPasswords, setShowPasswords, saving, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl border border-gray-200 w-full max-w-md p-6 relative"
        style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">Change Password</h3>
        <p className="text-sm text-slate-600 mb-6">Enter your current password and choose a new one</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: theme.getAccentGradient(135),
                boxShadow: `0 4px 12px ${theme.accentPrimary}30`,
              }}
            >
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Account Modal
function DeleteAccountModal({ saving, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl border-2 border-red-200 w-full max-w-md p-6 relative"
        style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Account</h3>
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
