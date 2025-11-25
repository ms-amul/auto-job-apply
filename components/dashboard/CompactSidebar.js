/**
 * Compact Premium Sidebar
 * - Minimal, clean design with premium touches
 * - Optimized spacing for all devices
 * - Theme-based styling throughout
 * - Smooth animations and interactions
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Bot,
  Zap,
} from 'lucide-react';
import { theme } from '@/utils/theme';
import { brand, Logo } from '@/utils/brand';

export default function CompactSidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();

  // Get user initials for premium avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const applicantMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/jobs', icon: Briefcase, label: 'Browse Jobs' },
    { href: '/dashboard/applications', icon: FileText, label: 'Applications' },
    { href: '/dashboard/agent', icon: Bot, label: 'AI Agent' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const recruiterMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/jobs', icon: Briefcase, label: 'My Jobs' },
    { href: '/dashboard/applicants', icon: Users, label: 'Applicants' },
    { href: '/dashboard/agent', icon: Zap, label: 'AI Assistant' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = user?.role === 'recruiter' ? recruiterMenuItems : applicantMenuItems;
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 right-3 z-50 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-xl bg-white/90 border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        style={{
          color: theme.accentPrimary,
        }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Premium Sidebar - Reference Style */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white/90
          transition-all duration-300 ease-out z-40 flex flex-col
          border-r-8 border-gray-400/30 rounded-r-4xl
          ${isOpen ? 'w-72' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
        }}
      >

        {/* Logo Section - Compact */}
        <div className={`${isOpen ? 'px-4 py-2' : 'px-3 py-2'} border-b-2 border-gray-400/30`}>
          {isOpen ? (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex flex-col min-w-0">
                <img src="/brand.png" alt="Logo" className="w-44" />
                <span className="text-base text-slate-400 font-medium leading-none mt-0.5">
                  Powered by <span className="font-semibold text-slate-600">Nexi</span>
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/" className="w-full flex justify-center">
              <Logo size="md" theme={theme} />
            </Link>
          )}
        </div>

        {/* Navigation - Icon Only Style */}
        <nav className={`flex-1 ${isOpen ? 'px-3 py-4' : 'px-2 py-4'} space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`
                  group relative flex items-center ${isOpen ? 'gap-3 px-3 py-3' : 'justify-center px-2 py-3'} 
                  rounded-lg text-sm font-medium
                  transition-all duration-200 overflow-hidden
                  ${active
                    ? 'text-white bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                  }
                `}
                title={!isOpen ? item.label : ''}
              >
                {/* Icon */}
                <Icon
                  className={`relative z-10 shrink-0 ${isOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-transform duration-200`}
                  strokeWidth={active ? 2.5 : 2}
                />

                {/* Label */}
                {isOpen && (
                  <span className="relative z-10 text-sm font-medium tracking-wide truncate flex-1">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        {/* User Profile Section - At Top */}
        <div className={`${isOpen ? 'px-4 py-4' : 'px-3 py-4'} border-b border-gray-100`}>
          <Link
            href="/dashboard/profile"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setIsOpen(false);
              }
            }}
            className={`
              group flex items-center ${isOpen ? 'gap-3' : 'justify-center'} 
              transition-all duration-200
            `}
          >
            {/* User Avatar */}
            <div
              className={`${isOpen ? 'w-12 h-12' : 'w-14 h-14'} rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden`}
              style={{
                background: theme.getAccentGradient(135),
                boxShadow: `0 2px 8px ${theme.accentPrimary}20`
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
              <span className={`text-white font-bold relative z-10 ${isOpen ? 'text-base' : 'text-lg'} tracking-tight`}>
                {getInitials(user?.name)}
              </span>
            </div>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize font-medium mt-0.5">
                  {user?.role || 'User'}
                </p>
              </div>
            )}
          </Link>
        </div>
        {/* Logout Section */}
        <div className={`border-t border-gray-100`}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                window.location.href = '/';
              }
            }}
            className={`
              group w-full flex items-center gap-3 py-4 ${isOpen ? 'px-6' : 'px-4'}
              rounded-lg text-sm font-medium
              text-slate-600 hover:text-slate-900 hover:bg-gray-100
              transition-all duration-200 active:scale-95
            `}
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut className={`shrink-0 ${isOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-transform duration-200 group-hover:rotate-12`} strokeWidth={2} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
