/**
 * Dashboard Layout
 * - Clean sidebar
 * - No topbar
 * - Readable spacing
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CompactSidebar from '@/components/dashboard/CompactSidebar';
import { PageLoader } from '@/components/ui/Loader';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

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
  }, [status, router]);

  if (status === 'loading') {
    return <PageLoader />;
  }

  if (!session?.user) {
    return null;
  }

  // Format user data for sidebar
  const user = {
    id: session.user.id,
    candidate_id: session.user.candidate_id,
    email: session.user.email,
    name: session.user.name || session.user.email,
  };

  return (
    <div className="min-h-screen">
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

      <div className="gradient"></div>

      {/* Sidebar */}
      <CompactSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />

      {/* Main Content Area */}
      <div
        className={`min-h-screen transition-all duration-200 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}
      >
        {/* Page Content */}
        <main className="px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
