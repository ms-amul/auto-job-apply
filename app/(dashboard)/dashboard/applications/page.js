/**
 * Applications Page - Powerful & Classy UI
 * - Glassy card design
 * - Perfect padding and spacing
 * - Mobile responsive
 * - Track all job applications
 */

'use client';

import { useEffect, useState } from 'react';
import { FileText, Calendar, ExternalLink, Trash2, Briefcase, MapPin, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SectionLoader } from '@/components/ui/Loader';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const response = await fetch(`/api/applications/user/${user.id}`);
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
      pending: 'bg-amber-100 text-amber-700',
      interview: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          My Applications
        </h1>
        <p className="text-base text-gray-600 mt-2">Track and manage your job applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
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
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === status
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
      {loading && <SectionLoader />}

      {/* Empty State */}
      {!loading && filteredApplications.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No applications found</h3>
            <p className="text-base text-gray-600 mb-6">
              {filter === 'all' 
                ? "Start applying to jobs to see them here" 
                : `No ${filter} applications yet`}
            </p>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/dashboard/jobs'}
              className="px-8 py-3"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      )}

      {/* Applications Grid */}
      {!loading && filteredApplications.length > 0 && (
        <div className="space-y-5">
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

function ApplicationCard({ application, getStatusColor }) {
  const job = application.job;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
      <div className="space-y-5">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: Job Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {job?.title || 'Job Title'}
              </h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{job?.company || 'Company'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{job?.location || 'Location'}</span>
              </div>
            </div>
          </div>

          {/* Right: Status Badge */}
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold shrink-0 border ${getStatusColor(application.status)}`}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>

        {/* Timeline Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
          </div>
          
          {application.interviewDate && (
            <div className="flex items-center gap-2 text-blue-600">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Interview: {new Date(application.interviewDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Notes Section */}
        {application.notes && application.notes.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong className="font-semibold">Note:</strong> {application.notes[application.notes.length - 1].note}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-200/60">
          <Button 
            variant="outline" 
            className="px-5 py-2.5 flex items-center gap-2 flex-1 sm:flex-none justify-center"
            onClick={() => toast('View details coming soon!')}
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Details</span>
          </Button>
          <Button 
            variant="ghost" 
            className="px-4 py-2.5 flex items-center"
            onClick={() => toast.error('Delete application?')}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
