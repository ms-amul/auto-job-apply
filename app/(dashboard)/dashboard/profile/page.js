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
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  Globe2,
  ShieldCheck,
  Plane,
  DollarSign,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import GlassPanel from '@/components/ui/GlassPanel';
import StatusPill from '@/components/ui/StatusPill';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

export default function ProfilePage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [agentStatus, setAgentStatus] = useState('none'); // 'none' | 'paused' | 'running'

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    willingToMoveToUS: null,
    hasVisa: null,
    needsVisaSponsorship: null,
    yearsOfExperience: '',
    preferredLocations: '',
    salaryExpectation: '',
    resumeUrl: '',
    // Skills
    technicalSkills: [],
    softSkills: [],
    languages: [],
    certifications: [],
    tools: [],
  });

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (!stored) {
          console.log('No user in localStorage');
          toast.error('Please sign in first');
          setInitialLoading(false);
          return;
        }
        
        const user = JSON.parse(stored);
        console.log('User from localStorage:', user);
        
        if (!user?.id) {
          console.log('No user ID found');
          toast.error('Invalid user data. Please sign in again.');
          setInitialLoading(false);
          return;
        }
        
        setUserId(user.id);
        console.log('Fetching profile for user ID:', user.id);

        const [userRes, agentRes] = await Promise.all([
          fetch(`/api/users/${user.id}`),
          fetch(`/api/agent/${user.id}`),
        ]);

        console.log('User API response status:', userRes.status);
        const data = await userRes.json();
        console.log('User API response data:', data);
        
        if (!data.success) {
          toast.error(data.error || 'Failed to load profile');
          console.error('API error:', data.error);
          setInitialLoading(false);
          return;
        }

        const u = data.user || {};
        setProfileCompleted(u.profileCompleted ?? false);

        setProfile({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          location: u.location || '',
          title: u.title || '',
          bio: u.bio || '',
          willingToMoveToUS: u.willingToMoveToUS ?? null,
          hasVisa: u.hasVisa ?? null,
          needsVisaSponsorship: u.needsVisaSponsorship ?? null,
          yearsOfExperience: u.yearsOfExperience || '',
          preferredLocations: (u.preferredLocations || []).join(', '),
          salaryExpectation: u.salaryExpectation || '',
          resumeUrl: u.resumeUrl || '',
          technicalSkills: u.technicalSkills || [],
          softSkills: u.softSkills || [],
          languages: u.languages || [],
          certifications: u.certifications || [],
          tools: u.tools || [],
        });

        const agentData = await agentRes.json();
        if (agentData?.success && agentData.agent) {
          setAgentStatus(agentData.agent.status === 'running' ? 'running' : 'paused');
        } else {
          setAgentStatus('none');
        }
      } catch (err) {
        console.error('Profile load error:', err);
        toast.error(`Failed to load profile: ${err.message}`);
      } finally {
        setInitialLoading(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          preferredLocations: profile.preferredLocations
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || 'Failed to update profile');
        setSaving(false);
        return;
      }

      toast.success('Profile updated successfully!');
      setProfileCompleted(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Profile Header */}
      <GlassPanel>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Left: Avatar & Info */}
          <div className="flex items-start gap-6">
            <div className="relative shrink-0">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: theme.getAccentGradient(135) }}
              >
                <span className="text-3xl font-bold text-white">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {profile.name || 'Your Name'}
              </h1>
              <p className="text-base text-slate-600 mb-4">
                {profile.title || 'Add your professional title'}
              </p>
              
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Status Indicators */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${profileCompleted ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium text-slate-700">
                {profileCompleted ? 'Profile Active' : 'Profile Incomplete'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${agentStatus === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium text-slate-700">
                {agentStatus === 'running' ? 'Agent Running' : 'Agent Paused'}
              </span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <GlassPanel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Basic Information</h2>
            <p className="text-sm text-slate-600">
              Your core details that will be visible to recruiters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              value={profile.name}
              onChange={(e) => updateField('name', e.target.value)}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => updateField('email', e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              value={profile.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              icon={<Phone className="w-5 h-5" />}
            />

            <Input
              label="Location"
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
              placeholder="e.g., San Francisco, CA"
            />

            <div className="md:col-span-2">
              <Input
                label="Professional Title"
                type="text"
                value={profile.title}
                onChange={(e) => updateField('title', e.target.value)}
                icon={<Briefcase className="w-5 h-5" />}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Professional Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows={4}
                placeholder="Tell us about your experience, skills, and what you're looking for..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900"
              />
            </div>
          </div>
        </GlassPanel>

        {/* Career Preferences */}
        <GlassPanel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Career Preferences</h2>
            <p className="text-sm text-slate-600">
              Help us match you with the right opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Years of Experience"
              value={profile.yearsOfExperience}
              onChange={(e) => updateField('yearsOfExperience', e.target.value)}
              placeholder="e.g., 5+ years"
            />
            <Input
              label="Preferred Locations"
              placeholder="e.g., Remote, NYC, SF"
              value={profile.preferredLocations}
              onChange={(e) => updateField('preferredLocations', e.target.value)}
            />
            <Input
              label="Salary Expectation"
              icon={<DollarSign className="w-4 h-4" />}
              value={profile.salaryExpectation}
              onChange={(e) => updateField('salaryExpectation', e.target.value)}
              placeholder="e.g., $120,000 - $150,000"
            />
          </div>
        </GlassPanel>

        {/* Skills & Expertise */}
        <GlassPanel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Skills & Expertise</h2>
            <p className="text-sm text-slate-600">
              Add your skills to help us match you with relevant job opportunities
            </p>
          </div>

          <div className="space-y-6">
            {/* Technical Skills */}
            <SkillInput
              label="Technical Skills"
              placeholder="e.g., React, Node.js, Python, AWS"
              description="Programming languages, frameworks, and technologies"
              skills={profile.technicalSkills}
              onChange={(skills) => updateField('technicalSkills', skills)}
            />

            {/* Tools & Platforms */}
            <SkillInput
              label="Tools & Platforms"
              placeholder="e.g., Git, Docker, Jira, Figma"
              description="Development tools, software, and platforms you use"
              skills={profile.tools}
              onChange={(skills) => updateField('tools', skills)}
            />

            {/* Soft Skills */}
            <SkillInput
              label="Soft Skills"
              placeholder="e.g., Leadership, Communication, Problem Solving"
              description="Interpersonal and professional skills"
              skills={profile.softSkills}
              onChange={(skills) => updateField('softSkills', skills)}
            />

            {/* Languages */}
            <SkillInput
              label="Languages"
              placeholder="e.g., English (Native), Spanish (Fluent)"
              description="Spoken languages and proficiency level"
              skills={profile.languages}
              onChange={(skills) => updateField('languages', skills)}
            />

            {/* Certifications */}
            <SkillInput
              label="Certifications"
              placeholder="e.g., AWS Certified, PMP, Scrum Master"
              description="Professional certifications and credentials"
              skills={profile.certifications}
              onChange={(skills) => updateField('certifications', skills)}
            />
          </div>
        </GlassPanel>

        {/* US Mobility & Visa */}
        <GlassPanel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-600" />
              US Mobility & Visa
            </h2>
            <p className="text-sm text-slate-600">
              Optional information to help match you with suitable opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ToggleCard
              label="Willing to relocate to US"
              icon={Plane}
              value={profile.willingToMoveToUS}
              onChange={(v) => updateField('willingToMoveToUS', v)}
            />
            <ToggleCard
              label="Already have US visa"
              icon={ShieldCheck}
              value={profile.hasVisa}
              onChange={(v) => updateField('hasVisa', v)}
            />
            <ToggleCard
              label="Need visa sponsorship"
              icon={Globe2}
              value={profile.needsVisaSponsorship}
              onChange={(v) => updateField('needsVisaSponsorship', v)}
            />
          </div>
        </GlassPanel>

        {/* Resume */}
        <GlassPanel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Resume</h2>
            <p className="text-sm text-slate-600">
              Upload your resume or provide a link to your online resume
            </p>
          </div>
          
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer mb-6"
            onClick={() => toast('File upload coming soon!')}
          >
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-slate-700 mb-1">
              <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-500">PDF, DOC, DOCX (max. 5MB)</p>
          </div>

          <Input
            label="Or paste resume URL"
            placeholder="https://..."
            value={profile.resumeUrl}
            onChange={(e) => updateField('resumeUrl', e.target.value)}
          />
        </GlassPanel>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
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
            loading={saving}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

function ToggleCard({ label, icon: Icon, value, onChange }) {
  const yes = value === true;
  const no = value === false;

  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-slate-600" />}
        <span className="text-sm font-medium text-slate-900">{label}</span>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            yes
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
          }`}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            no
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
          }`}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

function SkillInput({ label, placeholder, description, skills, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-slate-500 mb-3">{description}</p>
      )}
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
