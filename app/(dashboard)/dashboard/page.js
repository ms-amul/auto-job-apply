/**
 * Dashboard Home - Real Backend Data
 * - Fetches data from MongoDB
 * - Clean, subtle UI
 * - Role-based views
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Briefcase, Send, CheckCircle2, Clock, TrendingUp, Users, Eye, FileText,
  Building2, MapPin, DollarSign, Calendar, Target, Bot, Sparkles
} from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { theme } from '@/utils/theme';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      loadDashboardData();

      // Auto-refresh every 30 seconds to show status updates
      const refreshInterval = setInterval(() => {
        loadDashboardData();
      }, 30000); // 30 seconds

      return () => clearInterval(refreshInterval);
    }
  }, [status, session]);

  const loadDashboardData = async () => {
    if (status !== 'authenticated' || !session?.user) {
      return;
    }

    try {
      const userId = session.user.id || session.user.candidate_id?.toString();

      // Fetch real data from backend
      const [statsRes, appsRes] = await Promise.all([
        fetch(`/api/agent/${userId}/stats`),
        fetch(`/api/applications/user/${userId}`),
      ]);

      const statsData = await statsRes.json();
      const appsData = await appsRes.json();

      if (statsData.success && appsData.success) {
        // Combine agent stats with actual applications count
        const totalApplications = appsData.data?.length || 0;
        const agentStats = statsData.stats || {};

        // Count applications by status from actual applications
        const statusCounts = {
          pending: 0,
          interview: 0,
          accepted: 0,
          rejected: 0,
          today: 0,
          thisWeek: 0,
        };

        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);

        appsData.data?.forEach(app => {
          // Count by status
          if (app.status) {
            const status = app.status.toLowerCase();
            if (statusCounts.hasOwnProperty(status)) {
              statusCounts[status]++;
            }
          }

          // Count today and this week
          if (app.appliedDate) {
            const appliedDate = new Date(app.appliedDate);
            if (appliedDate >= todayStart) {
              statusCounts.today++;
            }
            if (appliedDate >= weekStart) {
              statusCounts.thisWeek++;
            }
          }
        });

        // Merge with agent stats, prioritizing actual application counts
        const mergedStats = {
          total: totalApplications,
          pending: statusCounts.pending,
          interview: statusCounts.interview,
          accepted: statusCounts.accepted,
          rejected: statusCounts.rejected,
          today: statusCounts.today,
          thisWeek: statusCounts.thisWeek,
          successRate: totalApplications > 0
            ? `${Math.round((statusCounts.accepted / totalApplications) * 100)}%`
            : '0%',
        };

        setStats(mergedStats);
      } else if (statsData.success) {
        // Fallback to agent stats only
        setStats(statsData.stats);
      }

      if (appsData.success) {
        // Get recent 5 applications
        setRecentApplications(appsData.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const user = {
    id: session?.user?.id,
    candidate_id: session?.user?.candidate_id,
    email: session?.user?.email,
    name: session?.user?.name || session?.user?.email,
  };

  return <ApplicantDashboard user={user} stats={stats} recentApplications={recentApplications} />;
}

// Applicant Dashboard
function ApplicantDashboard({ user, stats, recentApplications }) {
  const StatCard = ({ icon: Icon, label, value, gradient, trend, glowColor }) => (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 overflow-hidden"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 32px ${glowColor}`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: gradient }}></div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-slate-600 mb-2 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-xs md:text-sm text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ background: gradient }}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4 md:px-6">
      {/* Header - Premium */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-600 text-sm md:text-base">Here's your job search overview</p>
        </div>
        {/* Added Recommended Jobs Button for Quick Access */}
        <button
          onClick={() => window.location.href = '/browse-jobs'}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Recommended Jobs</span>
        </button>
      </div>

      {/* Stats Grid - Premium with Glows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats?.total || 0}
          gradient={theme.getAccentGradient(135)}
          glowColor="rgba(59, 130, 246, 0.2)"
          trend={stats?.thisWeek > 0 ? `+${stats.thisWeek} this week` : null}
        />
        <StatCard
          icon={Send}
          label="Pending"
          value={stats?.pending || 0}
          gradient="linear-gradient(135deg, #f59e0b, #d97706)"
          glowColor="rgba(245, 158, 11, 0.2)"
        />
        <StatCard
          icon={Clock}
          label="Interview"
          value={stats?.interview || 0}
          gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
          glowColor="rgba(139, 92, 246, 0.2)"
        />
        <StatCard
          icon={CheckCircle2}
          label="Accepted"
          value={stats?.accepted || 0}
          gradient="linear-gradient(135deg, #10b981, #059669)"
          glowColor="rgba(16, 185, 129, 0.2)"
          trend={stats?.accepted > 0 ? `${stats.successRate} success rate` : null}
        />
      </div>

      {/* Quick Stats - Premium Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div
          className="group relative bg-white rounded-2xl border border-gray-100 p-5 md:p-6 transition-all duration-300 overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-600 mb-1 font-medium">Today</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900">{stats?.today || 0}</p>
              <p className="text-xs text-slate-500 mt-1">Applications submitted</p>
            </div>
            <Calendar className="w-7 h-7 md:w-8 md:h-8 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div
          className="group relative bg-white rounded-2xl border border-gray-100 p-5 md:p-6 transition-all duration-300 overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-600 mb-1 font-medium">This Week</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900">{stats?.thisWeek || 0}</p>
              <p className="text-xs text-slate-500 mt-1">New applications</p>
            </div>
            <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div
          className="group relative bg-white rounded-2xl border border-gray-100 p-5 md:p-6 transition-all duration-300 overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-600 mb-1 font-medium">Success Rate</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900">{stats?.successRate || '0%'}</p>
              <p className="text-xs text-slate-500 mt-1">Acceptance rate</p>
            </div>
            <Target className="w-7 h-7 md:w-8 md:h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Recent Applications - Premium */}
      {recentApplications.length > 0 && (
        <div
          className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 relative overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Recent Applications
          </h2>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </div>
      )}

      {recentApplications.length === 0 && (
        <div
          className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="inline-flex w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center mb-4 mx-auto">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
          <p className="text-slate-600 text-sm md:text-base mb-6 max-w-md mx-auto">Start applying to jobs or configure the AI agent to automate applications</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => window.location.href = '/dashboard/jobs'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
            >
              <Briefcase className="w-4 h-4" />
              <span>Browse Jobs</span>
            </button>
            <button
              onClick={() => window.location.href = '/browse-jobs'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Recommended</span>
            </button>
            <button
              onClick={() => window.location.href = '/dashboard/agent'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 text-sm text-slate-700 font-semibold shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Configure Agent</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Application Card Component
function ApplicationCard({ application }) {
  const job = application.job;

  if (!job) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'interview': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div
      className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Company Logo */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 group-hover:shadow-md transition-shadow">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <Building2 className="w-6 h-6 text-slate-400" />
        )}
      </div>

      {/* Job Details */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm md:text-base">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs md:text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className={`px-3 py-1 rounded-xl text-xs font-semibold border shadow-sm ${getStatusColor(application.status)}`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
            <span className="text-xs text-slate-500 font-medium">{formatDate(application.appliedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Recruiter Dashboard (placeholder for now)
function RecruiterDashboard({ user, stats }) {
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4 md:px-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
          Welcome, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-600 text-sm md:text-base">Manage your recruitment pipeline</p>
      </div>

      <div
        className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="inline-flex w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center mb-4 mx-auto">
          <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Recruiter Dashboard</h3>
        <p className="text-slate-600 text-sm md:text-base">Coming soon...</p>
      </div>
    </div>
  );
}


