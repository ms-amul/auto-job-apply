import { Building2, Calendar, ExternalLink, MapPin, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

export default function ApplicationCard({ application, getStatusColor }) {
    const job = application.job;

    return (
        <div className="neu-card p-6">
            <div className="space-y-5">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Left: Job Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Company Logo - Neumorphic Icon Container */}
                        <div className="neu-icon w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                            <Building2 className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {job?.title || 'Job Title'}
                                </h3>
                                {/* Source Badge */}
                                {application.source === 'agent' && (
                                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-200">
                                        Agent Applied
                                    </span>
                                )}
                            </div>
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
