/**
 * Profile Page
 * 
 * Manage user profile and resume
 * 
 * ============================================
 * TODO: API INTEGRATION REQUIRED
 * ============================================
 * 
 * MOCK DATA (Lines 14-20):
 * - Replace hardcoded profile data with API call
 * - Fetch user data from: GET /api/users/[userId]
 * 
 * API ENDPOINTS NEEDED:
 * 1. GET /api/users/[userId] - Fetch user profile
 * 2. PUT /api/users/[userId] - Update profile
 * 3. POST /api/upload/avatar - Upload profile picture
 * 4. POST /api/upload/resume - Upload resume
 * 
 * DATABASE FIELDS:
 * - user.name, user.email, user.phone
 * - user.location, user.title, user.bio
 * - user.avatar_url, user.resume_url
 * 
 * IMPLEMENTATION STEPS:
 * 1. useEffect to fetch user from localStorage
 * 2. API call to load profile data
 * 3. Form validation before submit
 * 4. File upload handling with FormData
 * 5. Success/error toast notifications
 * ============================================
 */

'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  
  // TODO: Replace with actual user data from API
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    bio: 'Passionate software engineer with 5+ years of experience...',
  });

  // TODO: Load user profile from API
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // fetch(`/api/users/${user.id}`)
    //   .then(res => res.json())
    //   .then(data => setProfile(data.user));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const user = JSON.parse(localStorage.getItem('user'));
      // const response = await fetch(`/api/users/${user.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profile),
      // });
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Profile Settings
        </h1>
        <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            {/* TODO: Display actual user avatar from profile.avatar_url */}
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              {/* TODO: Implement file upload functionality */}
              <Button
                type="button"
                variant="primary"
                icon={<Upload className="w-4 h-4" />}
                onClick={() => toast('File upload coming soon!')}
              >
                Upload Photo
              </Button>
              <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              icon={<Phone className="w-5 h-5" />}
            />

            <Input
              label="Location"
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              icon={<MapPin className="w-5 h-5" />}
            />

            <div className="md:col-span-2">
              <Input
                label="Professional Title"
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                icon={<Briefcase className="w-5 h-5" />}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Resume Upload */}
        {/* TODO: Implement resume upload with file storage (S3, Cloudinary, etc.) */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Resume</h2>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => toast('File upload coming soon!')}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX (max. 5MB)</p>
          </div>
        </Card>

        {/* Action Buttons */}
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
