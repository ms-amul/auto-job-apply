/**
 * Notifications Page
 * 
 * View all notifications and updates
 */

'use client';

import { Bell, Check, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Application Submitted',
      message: 'Your application to Tech Corp was successfully submitted.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'You have an interview with StartupXYZ tomorrow at 10 AM.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'update',
      title: 'Profile Updated',
      message: 'Your profile information was updated successfully.',
      time: '1 day ago',
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Stay updated with your applications</p>
        </div>
        <button className="px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 hover:bg-gray-50 transition-colors ${
              !notification.read ? 'bg-orange-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {!notification.read && (
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

