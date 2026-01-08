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
import PageHeader from '@/components/dashboard/PageHeader';
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
  const StatCard = ({ icon: Icon, label, value, trend, trendColor }) => (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>

          {trend && (
            <div className={`flex items-center mt-2 text-xs font-semibold ${trendColor || 'text-slate-500'}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>

        {/* Neumorphic Icon */}
        <div className="neu-icon w-12 h-12 flex items-center justify-center rounded-xl text-slate-600">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Welcome back,"
        highlight={user?.name?.split(' ')[0]}
        description="Your job search activity at a glance"
      />

      {/* Stats Grid - Clean & Minimal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats?.total || 0}
          trend={stats?.thisWeek > 0 ? `+${stats.thisWeek} this week` : null}
          trendColor="text-blue-600"
          gradient="rgba(59, 130, 246, 0.1)"
        />
        <StatCard
          icon={Send}
          label="Pending"
          value={stats?.pending || 0}
          trend="Awaiting review"
          trendColor="text-amber-600"
          gradient="rgba(245, 158, 11, 0.1)"
        />
        <StatCard
          icon={Clock}
          label="Interviews"
          value={stats?.interview || 0}
          trend="Action required"
          trendColor="text-purple-600"
          gradient="rgba(147, 51, 234, 0.1)"
        />
        <StatCard
          icon={CheckCircle2}
          label="Offers"
          value={stats?.accepted || 0}
          trend={stats?.accepted > 0 ? `${stats.successRate} success rate` : null}
          trendColor="text-emerald-600"
          gradient="rgba(16, 185, 129, 0.1)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2 space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>
            <button
              onClick={() => window.location.href = '/dashboard/applications'}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all
            </button>
          </div>

          {recentApplications.length > 0 ? (
            <div className="space-y-1">
              {recentApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
              <div className="neu-icon w-16 h-16 flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">No applications yet</h3>
              <p className="text-sm text-slate-500 mt-1 mb-8">Start applying to see your history here.</p>
              <button
                onClick={() => window.location.href = '/dashboard/jobs'}
                className="neu-btn px-8 py-3 text-slate-700 hover:text-blue-600 font-bold transition-all"
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions / Side Status */}
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-800">Quick Stats</h2>

          <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Today's Activity</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.today || 0}</p>
              </div>
              <div className="neu-icon w-12 h-12 flex items-center justify-center text-blue-500">
                <Target className="w-6 h-6" />
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">This Week</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.thisWeek || 0}</p>
              </div>
              <div className="neu-icon w-12 h-12 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div>
              <button
                onClick={() => window.location.href = '/dashboard/agent'}
                className="w-full neu-btn py-3 text-slate-700 font-bold hover:text-blue-600 transition-all"
              >
                Configure Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal Application Card
function ApplicationCard({ application }) {
  const job = application.job;
  if (!job) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'interview': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-amber-600 bg-amber-50 border-amber-100';
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      {/* Neumorphic Icon Placeholder */}
      <div className="neu-icon w-12 h-12 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors">
        <Building2 className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors truncate">{job.title}</h4>
            <p className="text-xs text-slate-500 mt-1">{job.company}</p>
          </div>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(application.status)}`}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Recruiter Dashboard (placeholder for now)
function RecruiterDashboard({ user, stats }) {
  return (
    <div className="space-y-6 md:space-y-8">
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


