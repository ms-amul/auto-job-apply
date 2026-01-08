/**
 * Applications Page - Powerful & Classy UI
 * - Glassy card design
 * - Perfect padding and spacing
 * - Mobile responsive
 * - Track all job applications
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FileText, Calendar, ExternalLink, Trash2, Briefcase, MapPin, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';
import PageHeader from '@/components/dashboard/PageHeader';
import ApplicationCard from '@/components/applications/ApplicationCard';

export default function ApplicationsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'authenticated') {
      loadApplications();

      // Auto-refresh every 30 seconds to show status updates
      const refreshInterval = setInterval(() => {
        loadApplications();
      }, 30000); // 30 seconds

      return () => clearInterval(refreshInterval);
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, session, router]);

  const loadApplications = async () => {
    if (!session?.user) return;

    setLoading(true);
    try {
      const userId = session.user.id || session.user.candidate_id?.toString();
      const response = await fetch(`/api/applications/user/${userId}`);
      const data = await response.json();

      if (data.success) {
        setApplications(data.data);
      } else {
        toast.error('Failed to load applications');
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      interview: 'bg-blue-100 text-blue-700 border-blue-200',
      accepted: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="My"
        highlight="Applications"
        description="Track and manage your job applications"
      />

      {/* Filter Tabs */}
      <div className="bg-white border border-gray-200 rounded-2xl p-2">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'interview', 'accepted', 'rejected'].map((status) => {
            const count = status === 'all'
              ? applications.length
              : applications.filter(a => a.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={filter === status ? { background: theme.getAccentGradient(135) } : {}}
                className={`px-4 cursor-pointer py-2.5 rounded-xl text-sm font-medium transition-all ${filter === status
                  ? 'text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1.5 opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {(status === 'loading' || loading) && (
        <div className="flex items-center justify-center py-20">
          <Loader size="lg" text="Loading applications..." />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredApplications.length === 0 && (
        <div className="neu-pressed rounded-3xl p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="neu-icon w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-blue-400">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No applications found</h3>
            <p className="text-base text-slate-500 mb-8">
              {filter === 'all'
                ? "Start applying to jobs to see them here"
                : `No ${filter} applications yet`}
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/dashboard/jobs')}
              className="px-8 py-3 shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      )}

      {/* Applications Grid */}
      {!loading && filteredApplications.length > 0 && (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
