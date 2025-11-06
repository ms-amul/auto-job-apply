'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';

export default function NotificationStack() {
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Demo: Add sample notification (remove in production)
  useEffect(() => {
    const demoNotifications = [
      { id: 1, type: 'success', title: 'Welcome!', message: 'Your account has been created successfully.', timestamp: Date.now() },
      { id: 2, type: 'info', title: 'New Feature', message: 'Check out our new job matching algorithm.', timestamp: Date.now() + 1000 },
    ];
    
    setTimeout(() => {
      setNotifications(demoNotifications);
    }, 2000);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-orange-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification, index) => {
        const isExpanded = expandedId === notification.id;
        
        return (
          <div
            key={notification.id}
            className={`
              ${getColors(notification.type)}
              border rounded-xl shadow-lg backdrop-blur-lg
              transition-all duration-300 ease-out
              ${isExpanded ? 'w-96' : 'w-80'}
              overflow-hidden
              animate-slideIn
            `}
            style={{
              animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
            }}
            onMouseEnter={() => setExpandedId(notification.id)}
            onMouseLeave={() => setExpandedId(null)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`${getIconColor(notification.type)} shrink-0 mt-0.5`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">
                    {notification.title}
                  </h4>
                  <p className={`text-xs transition-all duration-300 ${
                    isExpanded ? 'line-clamp-none' : 'line-clamp-2'
                  }`}>
                    {notification.message}
                  </p>
                  
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-current/10">
                      <p className="text-xs opacity-60">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Hook to add notifications from anywhere
export function useNotification() {
  const addNotification = (notification) => {
    // This would dispatch to a global state manager (Redux, Zustand, Context)
    // For now, it's a placeholder
    console.log('Add notification:', notification);
  };

  return { addNotification };
}

