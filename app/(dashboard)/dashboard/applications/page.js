/**
 * Applications Page - Powerful & Classy UI
 * - Glassy card design
 * - Perfect padding and spacing
 * - Mobile responsive
 * - Track all job applications
 */

'use client';

import ToggleSwitch from '@/components/agent/ToggleSwitch';
import ApplicationCard from '@/components/applications/ApplicationCard';
import PageHeader from '@/components/dashboard/PageHeader';
import JobGridSkeleton from '@/components/jobs/JobGridSkeleton';
import Button from '@/components/ui/Button';
import { FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ApplicationsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAgentView, setIsAgentView] = useState(true); // false = Manual, true = Agent

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

  const filteredApplications = applications.filter(app =>
    isAgentView ? app.source === 'agent' : (app.source === 'manual' || !app.source)
  );

  return (
    <div className="space-y-8">
      {/* Header with Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="My"
          highlight="Applications"
          description="Track and manage your job applications"
        />

        <div className="flex items-center gap-4 bg-white p-2 md:p-3 rounded-2xl border border-gray-200 shadow-sm self-start md:self-auto">
          <span className={`text-sm font-semibold transition-colors ${!isAgentView ? 'text-blue-600' : 'text-slate-400'}`}>
            Manual
          </span>
          <ToggleSwitch
            checked={isAgentView}
            onChange={setIsAgentView}
          />
          <span className={`text-sm font-semibold transition-colors ${isAgentView ? 'text-blue-600' : 'text-slate-400'}`}>
            Agent Applied
          </span>
        </div>
      </div>

      {/* Loading State */}
      {(status === 'loading' || loading) && (
        <JobGridSkeleton count={4} className="grid grid-cols-1 gap-6" />
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
              {isAgentView
                ? "No agent-submitted applications found yet"
                : "You haven't manually applied to any jobs yet"}
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
