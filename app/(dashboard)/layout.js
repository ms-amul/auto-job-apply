/**
 * Dashboard Layout
 * - Clean sidebar
 * - No topbar
 * - Readable spacing
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompactSidebar from '@/components/dashboard/CompactSidebar';
import { PageLoader } from '@/components/ui/Loader';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      router.push('/');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push('/');
      return;
    }

    setLoading(false);

    // Auto-collapse sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Sidebar */}
      <CompactSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />
      
      {/* Main Content Area */}
      <div 
        className={`${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-200 ease-in-out`}
      >
        {/* Page Content */}
        <main className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
