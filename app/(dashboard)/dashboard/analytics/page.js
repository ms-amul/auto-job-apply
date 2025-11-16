/**
 * Premium Analytics Page
 * Advanced visualizations with mock data analysis
 */

'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Calendar, Clock, Target, 
  CheckCircle2, XCircle, MessageSquare, Zap, Award, Activity
} from 'lucide-react';
import { theme } from '@/utils/theme';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [animationProgress, setAnimationProgress] = useState(0);

  // Generate mock data for demonstrations
  const mockData = generateMockAnalytics();

  useEffect(() => {
    // Animate charts on load
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setAnimationProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [timeRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 pb-16">
      {/* Premium Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 text-sm md:text-base">Advanced insights into your job search performance</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['7d', '30d', '90d', 'all'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              timeRange === range
                ? 'text-white shadow-lg'
                : 'bg-white border border-gray-200 text-slate-700 hover:border-gray-300'
            }`}
            style={timeRange === range ? {
              background: theme.getAccentGradient(135),
              boxShadow: `0 4px 20px ${theme.accentPrimary}40`
            } : {}}
          >
            {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : range === '90d' ? 'Last 90 Days' : 'All Time'}
          </button>
        ))}
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Activity}
          label="Application Rate"
          value={mockData.applicationRate}
          change="+12%"
          trend="up"
          color="blue"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Success Rate"
          value={mockData.successRate}
          change="+8%"
          trend="up"
          color="green"
        />
        <MetricCard
          icon={Clock}
          label="Avg Response Time"
          value={mockData.avgResponseTime}
          change="-2 days"
          trend="up"
          color="purple"
        />
        <MetricCard
          icon={Target}
          label="Interview Rate"
          value={mockData.interviewRate}
          change="+5%"
          trend="up"
          color="orange"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Timeline */}
        <ChartCard title="Applications Over Time" subtitle="Daily application activity">
          <ApplicationTimelineChart data={mockData.timeline} progress={animationProgress} />
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Application Status" subtitle="Current status breakdown">
          <StatusDonutChart data={mockData.statusDistribution} progress={animationProgress} />
        </ChartCard>
      </div>

      {/* Activity Heatmap */}
      <ChartCard title="Weekly Activity Heatmap" subtitle="Application patterns by day and time">
        <ActivityHeatmap data={mockData.activityHeatmap} progress={animationProgress} />
      </ChartCard>

      {/* Response Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <ChartCard title="Response Time Analysis" subtitle="Days to first response">
          <ResponseTimeChart data={mockData.responseTime} progress={animationProgress} />
        </ChartCard>

        {/* Success Funnel */}
        <ChartCard title="Application Funnel" subtitle="Conversion at each stage">
          <FunnelChart data={mockData.funnel} progress={animationProgress} />
        </ChartCard>
      </div>

      {/* Industry Performance */}
      <ChartCard title="Performance by Category" subtitle="Success rates across job categories">
        <IndustryPerformanceChart data={mockData.industryPerformance} progress={animationProgress} />
      </ChartCard>
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon: Icon, label, value, change, trend, color }) {
  const colors = {
    blue: { bg: 'from-blue-500 to-blue-600', glow: 'rgba(59, 130, 246, 0.2)' },
    green: { bg: 'from-emerald-500 to-green-600', glow: 'rgba(16, 185, 129, 0.2)' },
    purple: { bg: 'from-purple-500 to-indigo-600', glow: 'rgba(139, 92, 246, 0.2)' },
    orange: { bg: 'from-orange-500 to-amber-600', glow: 'rgba(249, 115, 22, 0.2)' },
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-300 overflow-hidden"
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 32px ${colors[color].glow}`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, ${colors[color].bg})` }}></div>
      
      <div className="flex items-start justify-between mb-3">
        <div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${colors[color].bg} group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      
      <div>
        <p className="text-xs text-slate-600 font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

// Chart Card Wrapper
function ChartCard({ title, subtitle, children }) {
  return (
    <div 
      className="bg-white rounded-2xl border border-gray-100 p-6 relative overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// Application Timeline Chart
function ApplicationTimelineChart({ data, progress }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100 * (progress / 100);
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end justify-center h-48">
              <div 
                className="w-full rounded-t-lg relative overflow-hidden transition-all duration-500 group cursor-pointer"
                style={{ 
                  height: `${height}%`,
                  background: theme.getAccentGradient(135),
                  boxShadow: `0 -4px 20px ${theme.accentPrimary}20`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </div>
              </div>
            </div>
            <div className="text-xs font-medium text-slate-600">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Status Donut Chart
function StatusDonutChart({ data, progress }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360 * (progress / 100);
            const largeArc = angle > 180 ? 1 : 0;
            
            const startX = 100 + 70 * Math.cos((currentAngle * Math.PI) / 180);
            const startY = 100 + 70 * Math.sin((currentAngle * Math.PI) / 180);
            const endX = 100 + 70 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const endY = 100 + 70 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            
            const pathData = `M 100 100 L ${startX} ${startY} A 70 70 0 ${largeArc} 1 ${endX} ${endY} Z`;
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
            );
          })}
          <circle cx="100" cy="100" r="50" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">{total}</div>
            <div className="text-xs text-slate-600 font-medium">Total</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900">{item.value}</div>
              <div className="text-xs text-slate-500">{Math.round((item.value / total) * 100)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Activity Heatmap
function ActivityHeatmap({ data, progress }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['12am', '4am', '8am', '12pm', '4pm', '8pm'];
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="flex gap-2 mb-2">
          <div className="w-12"></div>
          {hours.map((hour, i) => (
            <div key={i} className="flex-1 text-center text-xs font-medium text-slate-600">{hour}</div>
          ))}
        </div>
        {days.map((day, dayIndex) => (
          <div key={day} className="flex gap-2 mb-2">
            <div className="w-12 text-xs font-medium text-slate-600 flex items-center">{day}</div>
            {hours.map((_, hourIndex) => {
              const value = data[dayIndex]?.[hourIndex] || 0;
              const opacity = Math.min((value / 10) * (progress / 100), 1);
              return (
                <div
                  key={hourIndex}
                  className="flex-1 aspect-square rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer relative group"
                  style={{ 
                    background: theme.getAccentGradient(135),
                    opacity: opacity * 0.8 + 0.1,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-xs">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Response Time Chart
function ResponseTimeChart({ data, progress }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const width = (item.value / maxValue) * 100 * (progress / 100);
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="font-bold text-slate-900">{item.value} days</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ 
                  width: `${width}%`,
                  background: theme.getAccentGradient(90),
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Funnel Chart
function FunnelChart({ data, progress }) {
  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const width = (item.value / data[0].value) * 100 * (progress / 100);
        return (
          <div 
            key={index} 
            className="relative"
            style={{ paddingLeft: `${index * 10}px`, paddingRight: `${index * 10}px` }}
          >
            <div 
              className="rounded-2xl p-4 transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ 
                background: theme.getAccentGradient(135),
                opacity: 1 - (index * 0.15),
                boxShadow: `0 4px 20px ${theme.accentPrimary}30`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">{item.label}</span>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{item.value}</div>
                  <div className="text-white/80 text-xs">{item.percentage}%</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Industry Performance Chart
function IndustryPerformanceChart({ data, progress }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => {
        const percentage = item.successRate * (progress / 100);
        return (
          <div 
            key={index}
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-all duration-300"
            style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.category}</h4>
                <p className="text-xs text-slate-600">{item.applications} applications</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{
                  backgroundImage: theme.getAccentGradient(90)
                }}>
                  {Math.round(percentage)}%
                </div>
                <div className="text-xs text-slate-600">success</div>
              </div>
            </div>
            
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{ 
                  width: `${percentage}%`,
                  background: theme.getAccentGradient(90),
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Generate Mock Analytics Data
function generateMockAnalytics() {
  return {
    applicationRate: '4.2/day',
    successRate: '28%',
    avgResponseTime: '5 days',
    interviewRate: '18%',
    
    timeline: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 19 },
      { label: 'Wed', value: 15 },
      { label: 'Thu', value: 25 },
      { label: 'Fri', value: 22 },
      { label: 'Sat', value: 8 },
      { label: 'Sun', value: 5 },
    ],
    
    statusDistribution: [
      { label: 'Pending', value: 45, color: '#f59e0b' },
      { label: 'Interview', value: 18, color: '#8b5cf6' },
      { label: 'Accepted', value: 12, color: '#10b981' },
      { label: 'Rejected', value: 30, color: '#ef4444' },
    ],
    
    activityHeatmap: [
      [2, 3, 5, 8, 6, 3],
      [3, 5, 7, 10, 8, 4],
      [4, 6, 9, 12, 10, 5],
      [5, 7, 10, 9, 7, 4],
      [4, 5, 8, 11, 9, 6],
      [2, 2, 3, 4, 3, 2],
      [1, 1, 2, 2, 2, 1],
    ],
    
    responseTime: [
      { label: 'Technology', value: 4 },
      { label: 'Healthcare', value: 7 },
      { label: 'Finance', value: 6 },
      { label: 'Retail', value: 3 },
      { label: 'Education', value: 8 },
    ],
    
    funnel: [
      { label: 'Applications Sent', value: 127, percentage: 100 },
      { label: 'Profile Viewed', value: 89, percentage: 70 },
      { label: 'Interviews Scheduled', value: 23, percentage: 18 },
      { label: 'Offers Received', value: 8, percentage: 6 },
    ],
    
    industryPerformance: [
      { category: 'Technology', applications: 45, successRate: 32 },
      { category: 'Healthcare', applications: 28, successRate: 25 },
      { category: 'Finance', applications: 22, successRate: 28 },
      { category: 'Automotive', applications: 18, successRate: 22 },
      { category: 'Retail', applications: 14, successRate: 30 },
      { category: 'Education', applications: 20, successRate: 35 },
    ],
  };
}
