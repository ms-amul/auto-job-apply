/**
 * Settings Page
 * 
 * Manage account settings and preferences
 * 
 * ============================================
 * TODO: API INTEGRATION REQUIRED
 * ============================================
 * 
 * MOCK DATA (Lines 44-47):
 * - Replace hardcoded settings with API call
 * - Fetch user settings from: GET /api/users/[userId]/settings
 * 
 * API ENDPOINTS NEEDED:
 * 1. GET /api/users/[userId]/settings - Fetch user settings
 * 2. PUT /api/users/[userId]/settings - Update settings
 * 3. POST /api/auth/change-password - Change password
 * 4. DELETE /api/users/[userId] - Delete account
 * 
 * DATABASE FIELDS:
 * - user_settings.email_notifications
 * - user_settings.push_notifications
 * - user_settings.job_alerts
 * - user_settings.weekly_digest
 * 
 * IMPLEMENTATION STEPS:
 * 1. Load settings from API on mount
 * 2. Save settings with debounce (auto-save)
 * 3. Implement change password modal
 * 4. Add confirmation modal for delete account
 * 5. Toast notifications for all actions
 * ============================================
 */

'use client';

import { useState, useEffect } from 'react';
import { Shield, Bell, Mail, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { design } from '@/utils/design';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  
  // TODO: Replace with actual settings from API
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    jobAlerts: true,
    weeklyDigest: true,
  });

  // TODO: Load user settings from API
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // fetch(`/api/users/${user.id}/settings`)
    //   .then(res => res.json())
    //   .then(data => setSettings(data.settings));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const user = JSON.parse(localStorage.getItem('user'));
      // const response = await fetch(`/api/users/${user.id}/settings`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement change password functionality
  const handleChangePassword = () => {
    toast('Change password modal coming soon!');
    // Open modal with password change form
    // POST /api/auth/change-password with old & new password
  };

  // TODO: Implement delete account with confirmation
  const handleDeleteAccount = () => {
    toast.error('Please confirm in a modal before deleting');
    // Show confirmation modal
    // DELETE /api/users/[userId]
    // Clear localStorage and redirect to home
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notifications Settings */}
        <Card className={design.card.flat}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-5 flex items-center">
              <Bell className="w-6 h-6 mr-3 text-blue-600" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {/* TODO: Save each toggle change immediately (debounced) */}
              <ToggleOption
                label="Email Notifications"
                description="Receive notifications via email"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({ ...settings, emailNotifications: e.target.checked })
                }
              />

              <ToggleOption
                label="Push Notifications"
                description="Receive push notifications in browser"
                checked={settings.pushNotifications}
                onChange={(e) =>
                  setSettings({ ...settings, pushNotifications: e.target.checked })
                }
              />

              <ToggleOption
                label="Job Alerts"
                description="Get notified about new job matches"
                checked={settings.jobAlerts}
                onChange={(e) =>
                  setSettings({ ...settings, jobAlerts: e.target.checked })
                }
              />

              <ToggleOption
                label="Weekly Digest"
                description="Receive weekly summary of your applications"
                checked={settings.weeklyDigest}
                onChange={(e) =>
                  setSettings({ ...settings, weeklyDigest: e.target.checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className={design.card.flat}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-5 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Security
            </h2>
            <div className="space-y-2">
              {/* TODO: Implement change password modal */}
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-base font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600 mt-0.5">Update your password</p>
                  </div>
                </div>
                <span className="text-blue-600 text-sm font-medium">Change</span>
              </button>

              {/* TODO: Load actual email from user data */}
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors text-left"
                onClick={() => toast('Email update coming soon!')}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-base font-medium text-gray-900">Email Address</p>
                    <p className="text-sm text-gray-600 mt-0.5">john.doe@example.com</p>
                  </div>
                </div>
                <span className="text-blue-600 text-sm font-medium">Update</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        {/* TODO: Add confirmation modal before delete */}
        <Card className={`${design.card.flat} border-2 border-red-200`}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
            <div className="space-y-4">
              <Button
                type="button"
                variant="danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <p className="text-sm text-gray-600 leading-relaxed">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

// Toggle Option Component
function ToggleOption({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="flex-1">
        <p className="text-base font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
