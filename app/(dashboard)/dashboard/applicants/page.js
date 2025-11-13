/**
 * Applicants Page - Professional & Clean
 * - Fixed consistent padding
 * - No childish effects
 * - Uses theme.js colors only
 * - Mobile responsive
 */

'use client';

import { useState } from 'react';
import { Users, Search, Mail, Phone, FileText, Download, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO: Replace with actual API data from /data/recruiter-data.json
  const applicants = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Full Stack Engineer',
      status: 'pending',
      appliedDate: '2025-11-10',
      experience: '5 years',
      resumeUrl: '/resumes/john-doe.pdf',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      position: 'Frontend Developer',
      status: 'shortlisted',
      appliedDate: '2025-11-08',
      experience: '3 years',
      resumeUrl: '/resumes/jane-smith.pdf',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      position: 'UI/UX Designer',
      status: 'interviewed',
      appliedDate: '2025-11-05',
      experience: '4 years',
      resumeUrl: '/resumes/mike-johnson.pdf',
    },
  ];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border border-amber-200',
      shortlisted: 'bg-blue-50 text-blue-700 border border-blue-200',
      interviewed: 'bg-purple-50 text-purple-700 border border-purple-200',
      rejected: 'bg-red-50 text-red-700 border border-red-200',
    };
    
    return styles[status] || styles.pending;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Applicants
        </h1>
        <p className="text-base text-gray-600 mt-2">
          Review and manage job applicants
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
            />
          </div>
          
          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all min-w-[180px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-5">
        {filteredApplicants.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <div className="max-w-md mx-auto">
              <div 
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${theme.accentPrimary}15` }}
              >
                <Users className="w-10 h-10" style={{ color: theme.accentPrimary }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No applicants found</h3>
              <p className="text-base text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Applicants will appear here once they apply to your jobs'}
              </p>
            </div>
          </div>
        ) : (
          filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 card-hover"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Left: Applicant Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Avatar */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: theme.getAccentGradient(135) }}
                  >
                    <span className="text-white font-bold text-xl">
                      {applicant.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Name & Position */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{applicant.name}</h3>
                      <p className="text-base text-gray-600 mt-1">{applicant.position}</p>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="truncate">{applicant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{applicant.phone}</span>
                      </div>
                    </div>

                    {/* Status & Date */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusBadge(applicant.status)}`}>
                        {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {applicant.experience} experience
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap gap-3 lg:shrink-0">
                  <Button 
                    variant="primary" 
                    size="md" 
                    onClick={() => toast.success(`${applicant.name} shortlisted!`)}
                    className="flex-1 sm:flex-none"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Shortlist</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={() => toast('Opening resume...')}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="md"
                    onClick={() => toast.error(`Reject ${applicant.name}?`)}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
