/**
 * Analytics Page
 * 
 * View job application statistics and insights
 */

'use client';

import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Track your job search performance</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <BarChart3 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Coming Soon</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          We're building detailed analytics to help you understand your job search performance. Stay tuned!
        </p>
      </div>
    </div>
  );
}

