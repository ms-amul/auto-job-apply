/**
 * Profile Page - Tab-Based Design
 * Clean, organized profile management with separate sections
 */

'use client';

import Loader, { PageLoader } from '@/components/ui/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Profile Components
import ProfileCompletion from '@/components/profile/ProfileCompletion';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ResumeUploadSection from '@/components/profile/ResumeUploadSection';

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

  /* 
   * Reusable fetch function to reload profile data 
   * passed down to children components 
   */
  const fetchProfile = async () => {
    if (!userId) return;

    try {
      // Load minimal profile data for header
      const [userRes, agentRes] = await Promise.all([
        fetch(`/api/users/${userId}`),
        fetch(`/api/agent/${userId}`),
      ]);

      const data = await userRes.json();

      if (!data.success) {
        toast.error(data.error || 'Failed to load profile');
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
      if (initialLoading) setInitialLoading(false);
    }
  };

  // Initial Auth Check & User ID Setup
  useEffect(() => {
    const init = async () => {
      if (status === 'unauthenticated') {
        toast.error('Please sign in first');
        router.push('/');
        setInitialLoading(false);
        return;
      }

      if (status === 'loading') return;

      if (!session?.user) {
        toast.error('Please sign in first');
        setInitialLoading(false);
        return;
      }

      const uid = session.user.id || session.user.candidate_id?.toString();
      if (!uid) {
        toast.error('Invalid user data. Please sign in again.');
        setInitialLoading(false);
        return;
      }

      setUserId(uid);
    };

    init();
  }, [status, session, router]);

  // Fetch data when userId is ready
  useEffect(() => {
    if (userId) {
      fetchProfile().finally(() => setInitialLoading(false));
    }
  }, [userId]);

  const handleUploadSuccess = () => {
    // Reload profile data after resume upload
    fetchProfile();
  };

  const renderTabContent = () => {
    // Pass onUpdate callback to children so they can refresh parent data
    const commonProps = {
      userId,
      onUpdate: fetchProfile
    };

    switch (activeTab) {
      case 'general':
        return <GeneralTab {...commonProps} />;
      case 'preferences':
        return <PreferencesTab {...commonProps} />;
      case 'skills':
        return <SkillsExperienceTab {...commonProps} />;
      case 'work':
        return <WorkExperienceProjectsTab {...commonProps} />;
      default:
        return <GeneralTab {...commonProps} />;
    }
  };

  if (initialLoading) {
    return (
      <PageLoader text="Loading profile..." />
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
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
