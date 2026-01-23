/**
 * Premium Compact Sidebar
 * - Light theme with glassmorphism
 * - Rounded right corners with shadow
 * - Clean structure
 */

'use client';

import dynamic from 'next/dynamic';
import {
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
  Sparkles,
} from 'lucide-react';

// Dynamic imports for optimization
const SidebarBackground = dynamic(() => import('./SidebarBackground'), { ssr: false });
const SidebarLogo = dynamic(() => import('./SidebarLogo'));
const SidebarNav = dynamic(() => import('./SidebarNav'));
const SidebarProfile = dynamic(() => import('./SidebarProfile'));

export default function CompactSidebar({ isOpen, setIsOpen, user }) {

  const applicantMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/all-jobs', icon: Briefcase, label: 'All Jobs' },
    { href: '/dashboard/recommendations', icon: Sparkles, label: 'Recommendations', badge: 'AI' },
    { href: '/dashboard/applications', icon: FileText, label: 'Applications' },
    { href: '/dashboard/agent', icon: Bot, label: 'AI Agent' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const recruiterMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/all-jobs', icon: Briefcase, label: 'All Jobs' },
    { href: '/dashboard/applicants', icon: Users, label: 'Applicants' },
    { href: '/dashboard/agent', icon: Sparkles, label: 'AI Assistant' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = user?.role === 'recruiter' ? recruiterMenuItems : applicantMenuItems;

  return (
    <>
      {/* Mobile Toggle Button - Floating Top Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        className={`
            lg:hidden fixed top-4 right-4 z-[60] w-10 h-10 rounded-xl flex items-center justify-center 
            backdrop-blur-xl bg-white/80 border border-white/50 shadow-md hover:shadow-lg 
            transition-all duration-300 active:scale-95
        `}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-700" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Desktop Toggle Button - Sidebar Border */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        className={`
            hidden lg:flex fixed z-50 w-8 h-8 rounded-full items-center justify-center 
            bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-slate-800 hover:shadow-md
            transition-all duration-300 ease-in-out
            top-8
        `}
        style={{
          left: isOpen ? '17rem' : '5rem',
        }}
      >
        {isOpen ? (
          <Menu className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Premium Sidebar - Responsive Behavior */}
      <aside
        className={`
          fixed left-0 top-0 h-full py-4 pl-4
          transition-all duration-300 ease-out z-40 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'w-72' : 'w-72 lg:w-24'}
        `}
      >
        <div
          className={`
                h-full w-full 
                backdrop-blur-2xl bg-white/20
                rounded-3xl border border-white/60
                flex flex-col relative overflow-hidden
                shadow-[8px_0_32px_rgba(0,0,0,0.08)]
                transition-all duration-300
            `}
        >
          {/* Animated Background */}
          <SidebarBackground />

          {/* Logo Section with Classy Separation */}
          <div className="relative">
            <SidebarLogo isOpen={isOpen} />
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-hidden flex flex-col pt-4">
            <SidebarNav menuItems={menuItems} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Footer Section - Merged Profile & Logout */}
          <div className="relative mt-auto">
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent mb-2" />
            <SidebarProfile user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </aside>
    </>
  );
}
