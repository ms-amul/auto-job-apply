/**
 * Dashboard Home - Real Backend Data
 * - Fetches data from MongoDB
 * - Clean, subtle UI
 * - Role-based views
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, Send, CheckCircle2, Clock, TrendingUp, Users, Eye, FileText,
  Building2, MapPin, DollarSign
} from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import Badge from '@/components/ui/Badge';
import { theme } from '@/utils/theme';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();

    // Auto-refresh every 30 seconds to show status updates
    const refreshInterval = setInterval(() => {
      loadDashboardData();
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/');
        return;
      }

      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Fetch real data from backend
      const [statsRes, appsRes] = await Promise.all([
        fetch(`/api/agent/${userData.id}/stats`),
        fetch(`/api/applications/user/${userData.id}`),
      ]);

      const statsData = await statsRes.json();
      const appsData = await appsRes.json();

      if (statsData.success) {
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.role === 'recruiter') {
    return <RecruiterDashboard user={user} stats={stats} />;
  }

  return <ApplicantDashboard user={user} stats={stats} recentApplications={recentApplications} />;
}

// Applicant Dashboard
function ApplicantDashboard({ user, stats, recentApplications }) {
  const StatCard = ({ icon: Icon, label, value, gradient, trend }) => (
    <GlassPanel padding="p-6" hover={false}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: gradient }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </GlassPanel>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-slate-600 mt-2">Here's your job search overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats?.total || 0}
          gradient={theme.getAccentGradient(135)}
          trend={stats?.thisWeek > 0 ? `+${stats.thisWeek} this week` : null}
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
          gradient="linear-gradient(135deg, #10b981, #059669)"
          trend={stats?.accepted > 0 ? `${stats.successRate} success rate` : null}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel padding="p-6" hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Today</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.today || 0}</p>
              <p className="text-xs text-slate-500 mt-1">Applications submitted</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </GlassPanel>
        
        <GlassPanel padding="p-6" hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">This Week</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.thisWeek || 0}</p>
              <p className="text-xs text-slate-500 mt-1">New applications</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </GlassPanel>

        <GlassPanel padding="p-6" hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.successRate || '0%'}</p>
              <p className="text-xs text-slate-500 mt-1">Acceptance rate</p>
            </div>
            <Target className="w-8 h-8 text-indigo-600" />
          </div>
        </GlassPanel>
      </div>

      {/* Recent Applications */}
      {recentApplications.length > 0 && (
        <GlassPanel padding="p-6" hover={false}>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Applications</h2>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </GlassPanel>
      )}

      {recentApplications.length === 0 && (
        <GlassPanel padding="p-12" hover={false}>
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h3>
            <p className="text-slate-600 mb-6">Start applying to jobs or configure the AI agent to automate applications</p>
            <div className="flex justify-center gap-3">
              <Button variant="primary" onClick={() => window.location.href = '/dashboard/jobs'}>
                <Briefcase className="w-4 h-4" />
                <span>Browse Jobs</span>
              </Button>
              <Button variant="secondary" onClick={() => window.location.href = '/dashboard/agent'}>
                <Bot className="w-4 h-4" />
                <span>Configure Agent</span>
              </Button>
            </div>
          </div>
        </GlassPanel>
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
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
      {/* Company Logo */}
      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
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
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{job.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
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
          
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(application.status)}`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
            <span className="text-xs text-slate-500">{formatDate(application.appliedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Recruiter Dashboard (placeholder for now)
function RecruiterDashboard({ user, stats }) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-slate-600 mt-2">Manage your recruitment pipeline</p>
      </div>

      <GlassPanel padding="p-12" hover={false}>
        <div className="text-center">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Recruiter Dashboard</h3>
          <p className="text-slate-600">Coming soon...</p>
        </div>
      </GlassPanel>
    </div>
  );
}

// Button Component (inline for now)
function Button({ children, variant = 'primary', onClick }) {
  const baseClasses = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Import missing icons
import { Calendar, Target, Bot } from 'lucide-react';
