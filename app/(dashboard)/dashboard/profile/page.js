/**
 * Profile Page - Tab-Based Design
 * Clean, organized profile management with separate sections
 */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

// Profile Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ResumeUploadSection from '@/components/profile/ResumeUploadSection';
import ProfileCompletion from '@/components/profile/ProfileCompletion';

// Tab Components
import GeneralTab from '@/components/profile/tabs/GeneralTab';
import PreferencesTab from '@/components/profile/tabs/PreferencesTab';
import SkillsExperienceTab from '@/components/profile/tabs/SkillsExperienceTab';
import WorkExperienceProjectsTab from '@/components/profile/tabs/WorkExperienceProjectsTab';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [agentStatus, setAgentStatus] = useState('none');

  const [profile, setProfile] = useState({
    // Basic Info for header
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    phone: '',
    location: '',
    
    // Resume Info
    resume_file_name: '',
    resume_upload_date: null,
    resume_parsed_at: null,
    
    // Professional Summary for header
    professional_summary: '',
  });

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

        // Load minimal profile data for header
        const [userRes, agentRes] = await Promise.all([
          fetch(`/api/users/${userId}`),
          fetch(`/api/agent/${userId}`),
        ]);

        const data = await userRes.json();
        
        if (!data.success) {
          toast.error(data.error || 'Failed to load profile');
          setInitialLoading(false);
          return;
        }

        const u = data.user || {};
        const parsedResume = u.parsed_resume || {};
        
        // Determine if profile is completed
        const isCompleted = !!(u.first_name && u.last_name && u.email);
        setProfileCompleted(isCompleted);

        // Set minimal profile data for header
        setProfile({
          first_name: u.first_name || '',
          last_name: u.last_name || '',
          full_name: u.full_name || '',
          email: u.email || '',
          phone: u.phone || u.mobile || u.home || '',
          location: u.location || '',
          resume_file_name: u.resume_file_name || '',
          resume_upload_date: u.resume_upload_date || null,
          resume_parsed_at: u.resume_parsed_at || null,
          professional_summary: parsedResume.professional_summary || '',
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
  }, [status, session, router]);

  const handleUploadSuccess = () => {
    // Reload profile data after resume upload
    window.location.reload();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab userId={userId} />;
      case 'preferences':
        return <PreferencesTab userId={userId} />;
      case 'skills':
        return <SkillsExperienceTab userId={userId} />;
      case 'work':
        return <WorkExperienceProjectsTab userId={userId} />;
      default:
        return <GeneralTab userId={userId} />;
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
      <ProfileHeader 
        profile={profile}
        profileCompleted={profileCompleted}
        agentStatus={agentStatus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="">
            {renderTabContent()}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ResumeUploadSection 
            profile={profile} 
            userId={userId}
            onUploadSuccess={handleUploadSuccess}
          />

          {/* Profile Completion Card */}
          <ProfileCompletion userId={userId} />
        </div>
      </div>
    </div>
  );
}
