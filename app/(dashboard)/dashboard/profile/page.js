/**
 * Profile Page - Premium Design
 * Classy, trendy, and professional profile management
 */

'use client';

import Input from '@/components/ui/Input';
import { theme } from '@/utils/theme';
import {
  Briefcase,
  Check,
  DollarSign,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Plane,
  Plus,
  ShieldCheck,
  Upload,
  User,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [agentStatus, setAgentStatus] = useState('none');

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
    technicalSkills: [],
    softSkills: [],
    languages: [],
    certifications: [],
    tools: [],
    ethnicity: '',
    hasDisability: null,
    isVeteran: null,
    lgbtqPlus: null,
    gender: '',
  });

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (!stored) {
          toast.error('Please sign in first');
          setInitialLoading(false);
          return;
        }
        
        const user = JSON.parse(stored);
        if (!user?.id) {
          toast.error('Invalid user data. Please sign in again.');
          setInitialLoading(false);
          return;
        }
        
        setUserId(user.id);

        const [userRes, agentRes] = await Promise.all([
          fetch(`/api/users/${user.id}`),
          fetch(`/api/agent/${user.id}`),
        ]);

        const data = await userRes.json();
        
        if (!data.success) {
          toast.error(data.error || 'Failed to load profile');
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
          ethnicity: u.ethnicity || '',
          hasDisability: u.hasDisability ?? null,
          isVeteran: u.isVeteran ?? null,
          lgbtqPlus: u.lgbtqPlus ?? null,
          gender: u.gender || '',
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
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
      {/* Profile Header Section */}
      <div 
        className="relative bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 mb-6 overflow-hidden"
        style={{ 
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Top accent border */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: theme.getAccentGradient(90),
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
          }}
        />
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
          {/* Avatar Section */}
          <div className="relative">
            <div 
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background: theme.getAccentGradient(135),
                boxShadow: `0 4px 12px ${theme.accentPrimary}25`,
              }}
            >
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {getInitials(profile.name)}
              </span>
            </div>
            {profileCompleted && (
              <div 
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                }}
              >
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          {/* User Info Section */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1.5">
                  {profile.name || 'Your Name'}
                </h1>
                <p className="text-base text-slate-600 font-medium">
                  {profile.title || 'Add your professional title'}
                </p>
              </div>
              
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2.5">
                <div 
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    profileCompleted 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${profileCompleted ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                  {profileCompleted ? 'Active' : 'Incomplete'}
                </div>
                
                <div 
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    agentStatus === 'running' 
                      ? 'border-blue-200 text-blue-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                  style={agentStatus === 'running' ? {
                    background: `${theme.accentPrimary}10`,
                    borderColor: `${theme.accentPrimary}30`,
                  } : {}}
                >
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      agentStatus === 'running' ? 'animate-pulse' : ''
                    }`}
                    style={agentStatus === 'running' ? {
                      background: theme.accentPrimary,
                    } : {
                      background: '#9ca3af',
                    }}
                  />
                  Agent {agentStatus === 'running' ? 'Running' : 'Paused'}
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-2.5 text-sm">
              {profile.email && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700 font-medium">{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700 font-medium">{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700 font-medium">{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Sections - Multi-column Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Sections */}
        <div className="lg:col-span-2 space-y-6">
        {/* Basic Information */}
        <SectionCard title="Basic Information" description="Your core details visible to recruiters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Professional Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows={4}
                placeholder="Tell us about your experience, skills, and what you're looking for..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 text-sm"
              />
            </div>
          </div>
        </SectionCard>

        {/* Career Preferences */}
        <SectionCard title="Career Preferences" description="Help us match you with the right opportunities">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
        </SectionCard>

        {/* Skills & Expertise */}
        <SectionCard title="Skills & Expertise" description="Add your skills to match with relevant opportunities">
          <div className="space-y-6">
            <SkillInput
              label="Technical Skills"
              placeholder="e.g., React, Node.js, Python, AWS"
              description="Programming languages, frameworks, and technologies"
              skills={profile.technicalSkills}
              onChange={(skills) => updateField('technicalSkills', skills)}
            />

            <SkillInput
              label="Tools & Platforms"
              placeholder="e.g., Git, Docker, Jira, Figma"
              description="Development tools, software, and platforms"
              skills={profile.tools}
              onChange={(skills) => updateField('tools', skills)}
            />

            <SkillInput
              label="Soft Skills"
              placeholder="e.g., Leadership, Communication, Problem Solving"
              description="Interpersonal and professional skills"
              skills={profile.softSkills}
              onChange={(skills) => updateField('softSkills', skills)}
            />

            <SkillInput
              label="Languages"
              placeholder="e.g., English (Native), Spanish (Fluent)"
              description="Spoken languages and proficiency level"
              skills={profile.languages}
              onChange={(skills) => updateField('languages', skills)}
            />

            <SkillInput
              label="Certifications"
              placeholder="e.g., AWS Certified, PMP, Scrum Master"
              description="Professional certifications and credentials"
              skills={profile.certifications}
              onChange={(skills) => updateField('certifications', skills)}
            />
          </div>
        </SectionCard>

        {/* US Mobility & Visa */}
        <SectionCard 
          title={
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span>US Mobility & Visa</span>
            </div>
          } 
          description="Optional information for suitable opportunities"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
        </SectionCard>

        {/* Diversity & Inclusion */}
        <SectionCard 
          title="Diversity & Inclusion" 
          description={
            <div>
              <p className="text-sm text-slate-600 mb-1">Optional information to help employers meet diversity goals</p>
              <p className="text-xs text-slate-500 italic">By continuing you agree to the definitions set by the U.S. EEOC</p>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Ethnicity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                What is your ethnicity?
              </label>
              <EthnicitySelect
                value={profile.ethnicity}
                onChange={(value) => updateField('ethnicity', value)}
              />
            </div>

            {/* Disability */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Do you have a disability?
              </label>
              <YesNoDecline
                value={profile.hasDisability}
                onChange={(value) => updateField('hasDisability', value)}
              />
            </div>

            {/* Veteran Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Are you a veteran?
              </label>
              <YesNoDecline
                value={profile.isVeteran}
                onChange={(value) => updateField('isVeteran', value)}
              />
            </div>

            {/* LGBTQ+ */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Do you identify as LGBTQ+?
              </label>
              <YesNoDecline
                value={profile.lgbtqPlus}
                onChange={(value) => updateField('lgbtqPlus', value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                What is your gender?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {['male', 'female', 'non-binary', 'decline'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
                      profile.gender === g
                        ? 'text-white border-transparent shadow-sm'
                        : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    style={profile.gender === g ? {
                      background: theme.getAccentGradient(135),
                    } : {}}
                    onClick={() => updateField('gender', g)}
                  >
                    {g === 'male' ? 'Male' : g === 'female' ? 'Female' : g === 'non-binary' ? 'Non-Binary' : 'Decline'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        </div>

        {/* Right Column - Sidebar Sections */}
        <div className="space-y-6">
          {/* Resume Section */}
          <SectionCard title="Resume" description="Upload your resume or provide a link">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer mb-4 bg-gray-50/50 transition-colors"
              style={{
                borderColor: 'rgba(148, 163, 184, 0.3)',
              }}
              onClick={() => toast('File upload coming soon!')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accentPrimary;
                e.currentTarget.style.backgroundColor = `${theme.accentPrimary}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(249, 250, 251, 0.5)';
              }}
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-white border border-gray-200 items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-700 mb-1 text-sm font-medium">
                <span style={{ color: theme.accentPrimary }} className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">PDF, DOC, DOCX (max. 5MB)</p>
            </div>

            <Input
              label="Or paste resume URL"
              placeholder="https://..."
              value={profile.resumeUrl}
              onChange={(e) => updateField('resumeUrl', e.target.value)}
            />
          </SectionCard>

          {/* Quick Stats Card */}
          <div 
            className="bg-white rounded-xl border border-gray-200/80 p-6"
            style={{ 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h3 className="text-sm font-bold text-slate-900 mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600 font-medium">Overall</span>
                  <span className="text-xs font-bold" style={{ color: theme.accentPrimary }}>65%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: '65%',
                      background: theme.getAccentGradient(90),
                    }}
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Basic Info</span>
                  <span className="font-semibold text-slate-900">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Skills</span>
                  <span className="font-semibold text-slate-900">3/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Resume</span>
                  <span className="font-semibold text-slate-900">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Full Width */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-slate-700 font-semibold transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: theme.getAccentGradient(135),
              boxShadow: `0 4px 12px ${theme.accentPrimary}30`,
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.boxShadow = `0 6px 16px ${theme.accentPrimary}40`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accentPrimary}30`;
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Section Card Component - Premium & Clean
function SectionCard({ title, description, children }) {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200/80 p-5 md:p-6 relative overflow-hidden"
      style={{ 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Left accent border */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: theme.getAccentGradient(180),
          opacity: 0.6,
          borderTopLeftRadius: '0.75rem',
          borderBottomLeftRadius: '0.75rem',
        }}
      />
      
      <div className="mb-5 pl-2">
        <h2 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
          {typeof title === 'string' ? (
            <>
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.accentPrimary }}
              />
              {title}
            </>
          ) : (
            title
          )}
        </h2>
        {description && (
          <div className="text-sm text-slate-600">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        )}
      </div>
      <div className="pl-2">
        {children}
      </div>
    </div>
  );
}

// Toggle Card Component - Interactive & Clean
function ToggleCard({ label, icon: Icon, value, onChange }) {
  const yes = value === true;
  const no = value === false;

  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-4 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        <span className="text-sm font-semibold text-slate-900">{label}</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all border ${
            yes
              ? 'text-white border-emerald-600 shadow-sm'
              : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={yes ? {
            background: 'linear-gradient(135deg, #10b981, #059669)',
          } : {}}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all border ${
            no
              ? 'text-white border-rose-600 shadow-sm'
              : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={no ? {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          } : {}}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

// Yes/No/Decline Component - Interactive
function YesNoDecline({ value, onChange }) {
  return (
    <div className="flex gap-2.5">
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === true
            ? 'text-white border-transparent shadow-sm'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        style={value === true ? {
          background: theme.getAccentGradient(135),
        } : {}}
        onClick={() => onChange(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === false
            ? 'text-white border-transparent shadow-sm'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        style={value === false ? {
          background: theme.getAccentGradient(135),
        } : {}}
        onClick={() => onChange(false)}
      >
        No
      </button>
      <button
        type="button"
        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all border ${
          value === null
            ? 'bg-gray-100 text-slate-700 border-gray-300'
            : 'bg-white border-gray-200 text-slate-700 hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => onChange(null)}
      >
        Decline
      </button>
    </div>
  );
}

// Skill Input Component
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
      <label className="block text-sm font-semibold text-slate-700 mb-1">
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
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2.5 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
          style={{
            background: theme.getAccentGradient(135),
            boxShadow: `0 2px 8px ${theme.accentPrimary}25`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accentPrimary}35`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 2px 8px ${theme.accentPrimary}25`;
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border font-medium transition-colors"
              style={{
                background: `${theme.accentPrimary}08`,
                color: theme.accentPrimary,
                borderColor: `${theme.accentPrimary}25`,
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="rounded-full p-0.5 transition-colors"
                style={{
                  color: theme.accentPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.accentPrimary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Ethnicity Select Component
function EthnicitySelect({ value = '', onChange }) {
  const ethnicities = [
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Two or More Races',
    'Decline to state',
  ];

  return (
    <div className="space-y-2">
      {ethnicities.map((ethnicity) => (
        <label
          key={ethnicity}
          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
            value === ethnicity
              ? 'border-transparent shadow-sm'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={value === ethnicity ? {
            background: `${theme.accentPrimary}08`,
            borderColor: `${theme.accentPrimary}30`,
          } : {}}
        >
          <input
            type="radio"
            name="ethnicity"
            checked={value === ethnicity}
            onChange={() => onChange(ethnicity)}
            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700 font-medium">{ethnicity}</span>
        </label>
      ))}
    </div>
  );
}
