/**
 * Dashboard Home - Clean & Readable
 * - Better sizing
 * - Role-based views
 * - Uses mock data from /data
 */

'use client';

import { useEffect, useState } from 'react';
import { Briefcase, Send, CheckCircle2, Clock, TrendingUp, Users, Eye, FileText } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { SectionLoader } from '@/components/ui/Loader';
import statsData from '@/data/stats.json';
import applicationsData from '@/data/applications.json';
import jobsData from '@/data/jobs.json';
import recruiterData from '@/data/recruiter-data.json';
import { theme } from '@/utils/theme';
import { design } from '@/utils/design';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.role === 'recruiter') {
        setStats(statsData.recruiterStats[userData.id]);
      } else {
        setStats(statsData.applicantStats[userData.id]);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <SectionLoader />;

  if (user?.role === 'recruiter') {
    return <RecruiterDashboard user={user} stats={stats} />;
  }

  return <ApplicantDashboard user={user} stats={stats} />;
}

// Applicant Dashboard
function ApplicantDashboard({ user, stats }) {
  const recentApplications = applicationsData.applications.slice(0, 5);

  const StatCard = ({ icon: Icon, label, value, change, gradient }) => (
    <Card className={design.card.neo}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+{change}% this week</span>
              </div>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: gradient }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-2">Here's your job search overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats?.totalApplications || 0}
          change={12}
          gradient={theme.getAccentGradient(135)}
        />
        <StatCard
          icon={Send}
          label="Pending"
          value={stats?.pending || 0}
          gradient="linear-gradient(135deg, #f59e0b, #d97706)"
        />
        <StatCard
          icon={Clock}
          label="Interview"
          value={stats?.interview || 0}
          gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
        />
        <StatCard
          icon={CheckCircle2}
          label="Accepted"
          value={stats?.accepted || 0}
          change={50}
          gradient="linear-gradient(135deg, #10b981, #059669)"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className={design.card.flat}>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.profileViews || 0}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className={design.card.flat}>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.responseRate || '0%'}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className={design.card.flat}>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.avgResponseTime || '0 days'}</p>
            </div>
            <Clock className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className={design.card.flat}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {recentApplications.map((app) => {
              const job = jobsData.jobs.find(j => j.id === app.jobId);
              return (
                <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{job?.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{job?.company}</p>
                  </div>
                  <Badge variant={app.status === 'interview' ? 'primary' : 'warning'}>
                    {app.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

// Recruiter Dashboard
function RecruiterDashboard({ user, stats }) {
  const recentApplicants = recruiterData.applicants.slice(0, 5);

  const StatCard = ({ icon: Icon, label, value, gradient }) => (
    <Card className={design.card.neo}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: gradient }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Welcome, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 mt-2">Manage your recruitment pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Briefcase}
          label="Active Jobs"
          value={stats?.activeJobs || 0}
          gradient={theme.getAccentGradient(135)}
        />
        <StatCard
          icon={Users}
          label="Total Applications"
          value={stats?.totalApplications || 0}
          gradient="linear-gradient(135deg, #f59e0b, #d97706)"
        />
        <StatCard
          icon={FileText}
          label="Shortlisted"
          value={stats?.shortlisted || 0}
          gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
        />
        <StatCard
          icon={CheckCircle2}
          label="Hired"
          value={stats?.hired || 0}
          gradient="linear-gradient(135deg, #10b981, #059669)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Pipeline */}
        <Card className={design.card.flat}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring Pipeline</h3>
            <div className="space-y-3">
              <PipelineItem label="Total Applications" value={recruiterData.pipeline.totalApplications} />
              <PipelineItem label="Pending Review" value={recruiterData.pipeline.pending} />
              <PipelineItem label="Shortlisted" value={recruiterData.pipeline.shortlisted} />
              <PipelineItem label="Interviewed" value={recruiterData.pipeline.interviewed} />
            </div>
          </div>
        </Card>

        {/* Recent Applicants */}
        <Card className={design.card.flat}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applicants</h3>
            <div className="space-y-3">
              {recentApplicants.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
                      style={{ background: theme.getAccentGradient(135) }}
                    >
                      {applicant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{applicant.name}</p>
                      <p className="text-sm text-gray-600">{applicant.jobTitle}</p>
                    </div>
                  </div>
                  <Badge variant={applicant.status === 'shortlisted' ? 'success' : 'warning'}>
                    {applicant.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PipelineItem({ label, value }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900 text-lg">{value}</span>
    </div>
  );
}
