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
import { 
  Bot, Play, Pause, Settings as SettingsIcon, Activity, 
  TrendingUp, CheckCircle, Calendar, Target, Clock,
  Search, FileText, Send, Loader2, Check, X, Building2, MapPin, DollarSign
} from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import { theme } from '@/utils/theme';

export default function AgentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [agent, setAgent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [configForm, setConfigForm] = useState({
    dailyLimit: 10,
    keywords: '',
    locations: '',
    minSalary: '',
    maxSalary: '',
    remoteOnly: false,
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
    loadAgentData();
  }, []);

  // Auto-apply timer when agent is running
  useEffect(() => {
    if (agent?.status === 'running' && user) {
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
  }, [agent?.status, user]);

  const loadAgentData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/');
        return;
      }

      const userData = JSON.parse(storedUser);
      setUser(userData);

      const [agentRes, statsRes] = await Promise.all([
        fetch(`/api/agent/${userData.id}`),
        fetch(`/api/agent/${userData.id}/stats`),
      ]);

      const agentData = await agentRes.json();
      const statsData = await statsRes.json();

      if (agentData.success && agentData.agent) {
        setAgent(agentData.agent);
        setConfigForm({
          dailyLimit: agentData.agent.dailyLimit || 10,
          keywords: (agentData.agent.keywords || []).join(', '),
          locations: (agentData.agent.locations || []).join(', '),
          minSalary: agentData.agent.minSalary || '',
          maxSalary: agentData.agent.maxSalary || '',
          remoteOnly: agentData.agent.remoteOnly || false,
        });
      }

      if (statsData.success) {
        setStats(statsData.stats);
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
    if (!user) return;

    try {
      const response = await fetch('/api/applications/update-statuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (data.success && data.updatedCount > 0) {
        // Refresh stats when statuses change
        const statsRes = await fetch(`/api/agent/${user.id}/stats`);
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
    if (!user || isApplying) return;

    setIsApplying(true);
    const startTime = Date.now();

    try {
      // Animate workflow steps BEFORE making API call
      await animateWorkflow();

      // Call API to apply to one job
      const response = await fetch(`/api/agent/${user.id}/apply`, {
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
        const statsRes = await fetch(`/api/agent/${user.id}/stats`);
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
          await fetch(`/api/agent/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'paused' }),
          });
          
          setAgent(prev => ({ ...prev, status: 'paused' }));
        } else if (data.message === 'No matching jobs found') {
          console.log('No matching jobs found');
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
    if (!agent || !agent.keywords || agent.keywords.length === 0) {
      toast.error('Please configure the agent first');
      setShowConfig(true);
      return;
    }

    try {
      const newStatus = agent.status === 'running' ? 'paused' : 'running';
      
      const response = await fetch(`/api/agent/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAgent({ ...agent, status: newStatus });
        if (newStatus === 'paused') {
          setApplicationHistory([]); // Clear history when paused
          setDailyLimitReached(false); // Reset limit flag
        } else {
          setDailyLimitReached(false); // Reset when starting
        }
        toast.success(newStatus === 'running' ? 'Agent activated' : 'Agent paused');
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
      const response = await fetch(`/api/agent/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dailyLimit: parseInt(configForm.dailyLimit) || 10,
          keywords: configForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
          locations: configForm.locations.split(',').map(l => l.trim()).filter(Boolean),
          minSalary: configForm.minSalary,
          maxSalary: configForm.maxSalary,
          remoteOnly: configForm.remoteOnly,
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading agent..." />
      </div>
    );
  }

  const isConfigured = agent && agent.keywords && agent.keywords.length > 0;
  const isRunning = agent?.status === 'running';

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Job Agent</h1>
          <p className="text-slate-600 mt-2">Intelligent automated job applications</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowConfig(!showConfig)}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Configure</span>
          </Button>
          <Button
            onClick={handleToggleAgent}
            variant={isRunning ? 'danger' : 'primary'}
            disabled={!isConfigured}
            size="lg"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isRunning ? 'Pause Agent' : 'Start Agent'}</span>
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      {showConfig && (
        <GlassPanel>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Agent Configuration</h2>
              <Button variant="ghost" onClick={() => setShowConfig(false)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Daily Application Limit"
                type="number"
                value={configForm.dailyLimit}
                onChange={(e) => setConfigForm({ ...configForm, dailyLimit: e.target.value })}
                placeholder="10"
              />

              <Input
                label="Keywords (comma-separated)"
                value={configForm.keywords}
                onChange={(e) => setConfigForm({ ...configForm, keywords: e.target.value })}
                placeholder="React, Node.js, Python"
              />

              <Input
                label="Preferred Locations (comma-separated)"
                value={configForm.locations}
                onChange={(e) => setConfigForm({ ...configForm, locations: e.target.value })}
                placeholder="Remote, San Francisco, New York"
              />

              <Input
                label="Minimum Salary (USD)"
                type="number"
                value={configForm.minSalary}
                onChange={(e) => setConfigForm({ ...configForm, minSalary: e.target.value })}
                placeholder="100000"
              />

              <Input
                label="Maximum Salary (USD)"
                type="number"
                value={configForm.maxSalary}
                onChange={(e) => setConfigForm({ ...configForm, maxSalary: e.target.value })}
                placeholder="200000"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remoteOnly"
                  checked={configForm.remoteOnly}
                  onChange={(e) => setConfigForm({ ...configForm, remoteOnly: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remoteOnly" className="text-sm font-medium text-slate-700">
                  Remote positions only
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setShowConfig(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveConfig}>
                Save Configuration
              </Button>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Status Overview */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">Agent Status</p>
              <p className="text-sm text-slate-600 mt-1">
                {isRunning ? 'Actively searching and applying to jobs' : 'Agent is paused'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-sm font-semibold text-slate-700">
                {isRunning ? 'Running' : 'Paused'}
              </span>
            </div>
            {!isConfigured && (
              <span className="text-xs text-amber-600 flex items-center gap-1">
                <X className="w-3 h-3" />
                Not configured
              </span>
            )}
            {isConfigured && (
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Configured
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Today" 
            value={stats?.today || 0}
            icon={Calendar}
            color="blue"
          />
          <StatCard 
            label="This Week" 
            value={stats?.thisWeek || 0}
            icon={TrendingUp}
            color="indigo"
          />
          <StatCard 
            label="Total Applied" 
            value={stats?.total || 0}
            icon={CheckCircle}
            color="purple"
          />
          <StatCard 
            label="Success Rate" 
            value={stats?.successRate || '0%'}
            icon={Target}
            color="green"
          />
        </div>
      </GlassPanel>

      {/* Live Workflow Animation or Daily Limit Reached */}
      {isRunning && !dailyLimitReached && (
        <GlassPanel>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Live Workflow</h3>
              {nextApplicationIn !== null && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Next in {nextApplicationIn}s
                  </span>
                </div>
              )}
            </div>

            {/* Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {workflow.steps.map((step, index) => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === workflow.steps.length - 1}
                />
              ))}
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Daily Limit Reached - Premium Status Display */}
      {dailyLimitReached && (
        <GlassPanel>
          <div className="relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 opacity-60" />
            
            {/* Content */}
            <div className="relative space-y-6 py-8">
              {/* Icon and Title */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Daily Limit Reached
                </h3>
                <p className="text-slate-600 max-w-md">
                  You've reached your daily application limit of {agent?.dailyLimit || 10} applications. 
                  The agent has been paused automatically.
                </p>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {stats?.today || 0}
                  </div>
                  <div className="text-sm text-slate-600">Applied Today</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {stats?.thisWeek || 0}
                  </div>
                  <div className="text-sm text-slate-600">This Week</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stats?.successRate || '0%'}
                  </div>
                  <div className="text-sm text-slate-600">Success Rate</div>
                </div>
              </div>

              {/* Action Message */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-full">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span className="text-sm font-medium text-amber-900">
                    Agent will resume tomorrow or you can restart it manually
                  </span>
                </div>
                
                <div className="flex justify-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => window.location.href = '/dashboard/applications'}
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Applications</span>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDailyLimitReached(false);
                      handleToggleAgent();
                    }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Restart Agent</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Applications History */}
      {isRunning && applicationHistory.length > 0 && (
        <GlassPanel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Recent Applications</h3>
              <span className="text-sm text-slate-600">
                {applicationHistory.length} applied in this session
              </span>
            </div>

            <div className="space-y-3">
              {applicationHistory.map((item, index) => (
                <ApplicationHistoryItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </GlassPanel>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Configuration */}
        <GlassPanel>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
              <SettingsIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Current Configuration</h3>
          </div>
          
          {isConfigured ? (
            <div className="space-y-4">
              <ConfigRow label="Daily Limit" value={`${agent.dailyLimit} applications/day`} />
              <ConfigRow label="Min Salary" value={agent.minSalary ? `$${parseInt(agent.minSalary).toLocaleString()}` : 'Not set'} />
              <ConfigRow label="Max Salary" value={agent.maxSalary ? `$${parseInt(agent.maxSalary).toLocaleString()}` : 'Not set'} />
              <ConfigRow label="Remote Only" value={agent.remoteOnly ? 'Yes' : 'No'} />
              
              <div className="pt-2">
                <p className="text-sm font-medium text-slate-700 mb-3">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {agent.keywords?.map((keyword, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              {agent.locations && agent.locations.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-slate-700 mb-3">Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.locations.map((location, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600 mb-4">Agent not configured yet</p>
              <Button variant="primary" onClick={() => setShowConfig(true)}>
                <SettingsIcon className="w-4 h-4" />
                <span>Configure Now</span>
              </Button>
            </div>
          )}
        </GlassPanel>

        {/* How It Works */}
        <GlassPanel>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-50">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">How It Works</h3>
          </div>
          
          <div className="space-y-4">
            <TimelineStep 
              number="1" 
              title="Configure Preferences" 
              description="Set job preferences, keywords, and daily limits"
            />
            <TimelineStep 
              number="2" 
              title="Start Agent" 
              description="Activate the agent to begin auto-applying"
            />
            <TimelineStep 
              number="3" 
              title="Timed Applications" 
              description="Agent applies to 1 job every minute automatically"
            />
            <TimelineStep 
              number="4" 
              title="Track Progress" 
              description="Monitor applications in real-time"
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Timing</p>
                  <p className="text-sm text-blue-800">
                    The agent applies to 1 job per minute to simulate natural application patterns and respect rate limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

// Application History Item Component
function ApplicationHistoryItem({ item, index }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl animate-fadeIn">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold shrink-0">
        {index + 1}
      </div>
      
      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
        {item.job.companyLogo ? (
          <img 
            src={item.job.companyLogo} 
            alt={item.job.company}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <Building2 className="w-6 h-6 text-slate-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 truncate">{item.job.title}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            {item.job.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {item.job.location}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-lg">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-xs font-semibold text-emerald-700">Applied</span>
        </div>
        <span className="text-xs text-slate-500">{item.timeTaken}</span>
      </div>
    </div>
  );
}

// Workflow Step Component
function WorkflowStep({ step, index }) {
  const Icon = step.icon;
  
  const getStatusColor = () => {
    switch (step.status) {
      case 'active': return 'border-blue-500 bg-blue-50';
      case 'complete': return 'border-emerald-500 bg-emerald-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getIconColor = () => {
    switch (step.status) {
      case 'active': return 'text-blue-600';
      case 'complete': return 'text-emerald-600';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="relative">
      <div className={`border-2 rounded-xl p-4 transition-all duration-300 ${getStatusColor()}`}>
        <div className="flex items-center gap-3 mb-2">
          {step.status === 'active' ? (
            <Loader2 className={`w-5 h-5 animate-spin ${getIconColor()}`} />
          ) : step.status === 'complete' ? (
            <CheckCircle className={`w-5 h-5 ${getIconColor()}`} />
          ) : (
            <Icon className={`w-5 h-5 ${getIconColor()}`} />
          )}
          <span className={`text-sm font-semibold ${
            step.status === 'idle' ? 'text-slate-500' : 'text-slate-900'
          }`}>
            Step {index + 1}
          </span>
        </div>
        <p className={`text-sm ${
          step.status === 'idle' ? 'text-slate-500' : 'text-slate-700'
        }`}>
          {step.label}
        </p>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
    green: 'bg-emerald-500',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

// Config Row Component
function ConfigRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

// Timeline Step Component
function TimelineStep({ number, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
        style={{ background: theme.getAccentGradient(135) }}
      >
        {number}
      </div>
      <div>
        <p className="font-semibold text-slate-900 mb-1">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
