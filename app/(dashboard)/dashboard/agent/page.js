/**
 * AI Agent Page - Auto-Apply System with Live Workflow
 * 
 * Features:
 * - Timed auto-apply (1 job per minute when running)
 * - Live workflow animation synced with actual applications
 * - Applications history with timing details
 * - Real-time stats and progress tracking
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Play, Pause, Settings as SettingsIcon, Search, FileText, Send, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import AgentConfigPanel from '@/components/agent/AgentConfigPanel';
import AgentStatusOverview from '@/components/agent/AgentStatusOverview';
import LiveWorkflow from '@/components/agent/LiveWorkflow';
import DailyLimitReached from '@/components/agent/DailyLimitReached';
import ApplicationHistory from '@/components/agent/ApplicationHistory';
import CurrentConfiguration from '@/components/agent/CurrentConfiguration';
import HowItWorks from '@/components/agent/HowItWorks';
import PageHeader from '@/components/dashboard/PageHeader';

export default function AgentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [agent, setAgent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [configForm, setConfigForm] = useState({
    dailyLimit: 10,
    keywords: '',
    emailNotifications: true,
    smsNotifications: false,
    applyRecentFirst: true,
  });

  // Live workflow state
  const [isApplying, setIsApplying] = useState(false);
  const [workflow, setWorkflow] = useState({
    currentStep: 0,
    steps: [
      { id: 'search', label: 'Searching jobs', icon: Search, status: 'idle' },
      { id: 'analyze', label: 'Analyzing match', icon: Activity, status: 'idle' },
      { id: 'prepare', label: 'Preparing application', icon: FileText, status: 'idle' },
      { id: 'submit', label: 'Submitting', icon: Send, status: 'idle' },
    ],
  });

  // Applications history
  const [applicationHistory, setApplicationHistory] = useState([]);
  const [nextApplicationIn, setNextApplicationIn] = useState(null);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const intervalRef = useRef(null);
  const workflowRef = useRef(null);
  const countdownRef = useRef(null);
  const statusUpdateRef = useRef(null);

  useEffect(() => {
    if (status === 'authenticated') {
      loadAgentData();
    }
  }, [status, session]);

  // Auto-apply timer when agent is running
  useEffect(() => {
    if (agent?.status === 'running' && session?.user) {
      startAutoApply();
      startStatusUpdates();
    } else {
      stopAutoApply();
      stopStatusUpdates();
    }

    return () => {
      stopAutoApply();
      stopStatusUpdates();
    };
  }, [agent?.status, session]);

  const loadAgentData = async () => {
    if (status === 'unauthenticated' || !session?.user) {
      router.push('/');
      return;
    }

    if (status === 'loading') {
      return;
    }

    try {
      const userId = session.user.id || session.user.candidate_id?.toString();

      const [agentRes, statsRes, historyRes] = await Promise.all([
        fetch(`/api/agent/${userId}`),
        fetch(`/api/agent/${userId}/stats`),
        fetch(`/api/applications/user/${userId}`),
      ]);

      const agentData = await agentRes.json();
      const statsData = await statsRes.json();
      const historyData = await historyRes.json();

      if (agentData.success && agentData.agent) {
        setAgent(agentData.agent);
        setConfigForm({
          dailyLimit: agentData.agent.dailyLimit || 10,
          keywords: (agentData.agent.keywords || []).join(', '),
          emailNotifications: agentData.agent.emailNotifications !== undefined ? agentData.agent.emailNotifications : true,
          smsNotifications: agentData.agent.smsNotifications || false,
          applyRecentFirst: agentData.agent.applyRecentFirst !== undefined ? agentData.agent.applyRecentFirst : true,
        });
      }

      if (statsData.success) {
        setStats(statsData.stats);
      }

      if (historyData.success) {
        // Filter history to only show agent applications
        const agentHistory = (historyData.data || [])
          .filter(app => app.source === 'agent')
          .map(app => ({
            id: app.id,
            job: app.job,
            appliedAt: new Date(app.appliedDate),
            timeTaken: "2s", // Mock for existing items
            status: 'success', // For UI display
          }));
        setApplicationHistory(agentHistory);
      }
    } catch (error) {
      console.error('Error loading agent:', error);
      toast.error('Failed to load agent data');
    } finally {
      setLoading(false);
    }
  };

  const startAutoApply = () => {
    // Clear any existing intervals
    stopAutoApply();

    // MOCK: Check if there's a scheduled next application time from DB
    // Future: This will be handled by a proper job queue/scheduler
    if (agent?.nextApplicationTime) {
      const nextTime = new Date(agent.nextApplicationTime);
      const now = new Date();
      const timeUntilNext = Math.max(0, nextTime.getTime() - now.getTime());

      if (timeUntilNext > 0) {
        // Wait until the scheduled time
        console.log(`Resuming in ${Math.ceil(timeUntilNext / 1000)}s`);
        setNextApplicationIn(Math.ceil(timeUntilNext / 1000));

        setTimeout(() => {
          applyToOneJob();
          // Then continue with regular 30-second intervals
          intervalRef.current = setInterval(() => {
            applyToOneJob();
          }, 30000); // 30 seconds
        }, timeUntilNext);

        // Start countdown from remaining time
        startCountdownFrom(Math.ceil(timeUntilNext / 1000));
        return;
      }
    }

    // No scheduled time or time has passed - apply immediately
    applyToOneJob();

    // Then apply every 30 seconds
    intervalRef.current = setInterval(() => {
      applyToOneJob();
    }, 30000); // 30 seconds

    // Start countdown
    startCountdown();
  };

  const stopAutoApply = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (workflowRef.current) {
      clearTimeout(workflowRef.current);
      workflowRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setIsApplying(false);
    setNextApplicationIn(null);
    // Reset workflow
    setWorkflow(prev => ({
      ...prev,
      currentStep: 0,
      steps: prev.steps.map(s => ({ ...s, status: 'idle' })),
    }));
  };

  const startStatusUpdates = () => {
    // Update statuses immediately
    updateApplicationStatuses();

    // Then update every 30 seconds
    statusUpdateRef.current = setInterval(() => {
      updateApplicationStatuses();
    }, 30000); // 30 seconds
  };

  const stopStatusUpdates = () => {
    if (statusUpdateRef.current) {
      clearInterval(statusUpdateRef.current);
      statusUpdateRef.current = null;
    }
  };

  const updateApplicationStatuses = async () => {
    if (!session?.user) return;

    try {
      const userId = session.user.id || session.user.candidate_id?.toString();
      const response = await fetch('/api/applications/update-statuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success && data.updatedCount > 0) {
        // Refresh stats when statuses change
        const userId = session.user.id || session.user.candidate_id?.toString();
        const statsRes = await fetch(`/api/agent/${userId}/stats`);
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.stats);
        }

        // Show subtle notification
        console.log(`Updated ${data.updatedCount} application status(es)`);
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const startCountdown = () => {
    startCountdownFrom(30); // 30 seconds
  };

  const startCountdownFrom = (seconds) => {
    setNextApplicationIn(seconds);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(() => {
      setNextApplicationIn(prev => {
        if (prev === null || prev <= 1) {
          return 30; // Reset to 30 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);
  };

  const applyToOneJob = async () => {
    if (!session?.user || isApplying) return;

    setIsApplying(true);
    const startTime = Date.now();

    try {
      // NOTE: Using mock data from MongoDB for now. 
      // This simulation is temporary until the production job queue is fully ready.
      // Configs are stored in Prisma (Postgres), but application logic remains in MongoDB mock.

      // Animate workflow steps BEFORE making API call
      await animateWorkflow();

      // Call API to apply to one job
      const userId = session.user.id || session.user.candidate_id?.toString();
      const response = await fetch(`/api/agent/${userId}/apply`, {
        method: 'POST',
      });

      const data = await response.json();
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(1); // in seconds

      if (data.success) {
        // Add to application history
        const historyItem = {
          id: data.application.id,
          job: data.application.job,
          appliedAt: new Date(),
          timeTaken: `${timeTaken}s`,
          status: 'success',
        };

        setApplicationHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10

        // Refresh stats
        const userId = session.user.id || session.user.candidate_id?.toString();
        const statsRes = await fetch(`/api/agent/${userId}/stats`);
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.stats);
        }

        toast.success(`Applied to ${data.application.job.title}`);
      } else {
        // Handle errors (daily limit, no jobs, etc.)
        if (data.message === 'Daily limit reached') {
          setDailyLimitReached(true);
          stopAutoApply(); // Stop the agent gracefully

          // Update agent status to paused
          const userId = session.user.id || session.user.candidate_id?.toString();
          await fetch(`/api/agent/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'paused' }),
          });

          setAgent(prev => ({ ...prev, status: 'paused' }));
        } else if (data.message === 'No matching jobs found') {
          toast.error('No new jobs matching your keywords were found in the database.');
        }
      }
    } catch (error) {
      console.error('Auto-apply error:', error);
    } finally {
      setIsApplying(false);
    }
  };

  const animateWorkflow = () => {
    return new Promise((resolve) => {
      const steps = workflow.steps;
      let currentIndex = 0;

      const animateStep = () => {
        if (currentIndex >= steps.length) {
          // Mark last step as complete
          setWorkflow(prev => ({
            ...prev,
            steps: prev.steps.map((s, i) =>
              i === steps.length - 1 ? { ...s, status: 'complete' } : s
            ),
          }));

          // Reset after 1 second
          workflowRef.current = setTimeout(() => {
            setWorkflow(prev => ({
              ...prev,
              currentStep: 0,
              steps: prev.steps.map(s => ({ ...s, status: 'idle' })),
            }));
            resolve();
          }, 1000);
          return;
        }

        // Set current step to active
        setWorkflow(prev => ({
          ...prev,
          currentStep: currentIndex,
          steps: prev.steps.map((s, i) => {
            if (i < currentIndex) return { ...s, status: 'complete' };
            if (i === currentIndex) return { ...s, status: 'active' };
            return { ...s, status: 'idle' };
          }),
        }));

        currentIndex++;
        workflowRef.current = setTimeout(animateStep, 600); // 0.6 seconds per step (faster for 30s cycle)
      };
      animateStep();
    });
  };

  const handleToggleAgent = async () => {
    const isCurrentlyRunning = agent?.status === 'running';

    if (!isCurrentlyRunning && (!agent || !agent.keywords || agent.keywords.length === 0)) {
      toast.error('Please configure the agent first');
      setShowConfig(true);
      return;
    }

    try {
      const newStatus = agent.status === 'running' ? 'paused' : 'running';
      const userId = session?.user?.id || session?.user?.candidate_id?.toString();

      const response = await fetch(`/api/agent/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAgent({ ...agent, status: newStatus });
        // Always reset limit flag when toggling activation to allow fresh starts
        setDailyLimitReached(false);

        toast.success(newStatus === 'running' ? 'Agent Protocol Initiated' : 'Agent Protocol Terminated');
      } else {
        toast.error('Failed to update agent status');
      }
    } catch (error) {
      console.error('Error toggling agent:', error);
      toast.error('Failed to update agent');
    }
  };

  const handleSaveConfig = async () => {
    try {
      const userId = session?.user?.id || session?.user?.candidate_id?.toString();
      const response = await fetch(`/api/agent/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dailyLimit: parseInt(configForm.dailyLimit) || 10,
          keywords: configForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
          emailNotifications: configForm.emailNotifications,
          smsNotifications: configForm.smsNotifications,
          applyRecentFirst: configForm.applyRecentFirst,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAgent(data.agent);
        setShowConfig(false);
        toast.success('Agent configuration saved');
      } else {
        toast.error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Failed to save configuration');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading agent..." />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const isConfigured = agent && agent.keywords && agent.keywords.length > 0;
  const isRunning = agent?.status === 'running';

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <PageHeader
        title="Automated"
        highlight="Agent"
        description="Your AI-powered executive assistant, tirelessly navigating the job market to find and secure your next role."
      >
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="h-10 px-4 rounded-xl cursor-pointer bg-white border border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm"
        >
          <SettingsIcon className="w-5 h-5 text-slate-400" />
          <span>Configure</span>
        </button>
        <Button
          onClick={handleToggleAgent}
          variant={isRunning ? 'danger' : 'primary'}
          disabled={!isRunning && !isConfigured}
          className="h-10 px-4 rounded-xl cursor-pointer font-black text-sm uppercase tracking-widest shadow-2xl group"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 group-hover:animate-ping" />}
          <span>{isRunning ? 'Deactivate' : 'Activate Agent'}</span>
        </Button>
      </PageHeader>

      {/* Premium Configuration Panel */}
      <AgentConfigPanel
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        configForm={configForm}
        setConfigForm={setConfigForm}
        onSave={handleSaveConfig}
      />

      {/* Status Overview */}
      <AgentStatusOverview
        isRunning={isRunning}
        isConfigured={isConfigured}
        stats={stats}
      />

      {/* Live Workflow Animation or Daily Limit Reached */}
      {isRunning && !dailyLimitReached && (
        <LiveWorkflow workflow={workflow} nextApplicationIn={nextApplicationIn} />
      )}

      {/* Daily Limit Reached - Premium Status Display */}
      {dailyLimitReached && (
        <DailyLimitReached
          agent={agent}
          stats={stats}
          onRestart={() => {
            setDailyLimitReached(false);
            handleToggleAgent();
          }}
        />
      )}

      {/* Applications History - Always show if history exists */}
      <ApplicationHistory applicationHistory={applicationHistory} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Configuration */}
        <CurrentConfiguration
          agent={agent}
          isConfigured={isConfigured}
          onConfigure={() => setShowConfig(true)}
        />

        {/* How It Works */}
        <HowItWorks />
      </div>
    </div>
  );
}

