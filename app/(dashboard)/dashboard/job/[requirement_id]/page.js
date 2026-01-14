
'use client';

import Loader from '@/components/ui/Loader';
import {
    Briefcase
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import JobDetails from '@/components/jobs/JobDetails';

export default function JobDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const { requirement_id } = params;
    const source_id = searchParams.get('source_id');

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (requirement_id && source_id) {
            fetchJobDetails();
        }
    }, [requirement_id, source_id]);

    const fetchJobDetails = async () => {
        try {
            const res = await fetch(`/api/jobs/${requirement_id}?source_id=${source_id}`);

            if (!res.ok) throw new Error("Failed to fetch job details");

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setJob(data);
        } catch (err) {
            console.error(err);
            setError("Job not found or unavailable.");
        } finally {
            setTimeout(() => setLoading(false), 400);
        }
    };

    const handleApply = async () => {
        if (!session?.user) {
            toast.error('Please sign in to apply');
            router.push('/');
            return;
        }

        setApplying(true);
        try {
            const candidateId = session.user.candidate_id || session.user.id;

            const response = await fetch('/api/apply-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cand_id: parseInt(candidateId),
                    requirement_id: parseInt(requirement_id),
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Application submitted successfully!');
                router.push('/dashboard/applications');
            } else {
                toast.error(data.message || 'Failed to submit application');
            }
        } catch (error) {
            console.error('Error applying:', error);
            toast.error('Failed to submit application');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <Loader size="lg" text="Loading opportunity..." />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Unavailable</h2>
                    <p className="text-slate-500 mb-6">{error || "This job is no longer available."}</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <JobDetails
            job={job}
            applying={applying}
            handleApply={handleApply}
            onBack={() => router.back()}
        />
    );
}
