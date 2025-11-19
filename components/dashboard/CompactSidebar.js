/**
 * Premium Professional Sidebar
 * - Rich, classy design with subtle premium touches
 * - Logo aligned left
 * - Hamburger icon right-top on mobile
 * - Enhanced animations and interactions
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
  User,
  Users,
  Bot,
  Zap,
  ChevronRight,
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
      {/* Premium Mobile Toggle Button - Fixed Top Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center backdrop-blur-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        style={{
          color: theme.accentPrimary,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay - Premium */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full backdrop-blur-2xl bg-white/95
          transition-all duration-300 ease-in-out z-40 flex flex-col
          border-r-2 border-gray-200/80 rounded-r-3xl
          ${isOpen ? 'w-72' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          boxShadow: '6px 0 32px rgba(0, 0, 0, 0.06), 2px 0 12px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Premium Logo Section */}
        <div className="h-20 flex items-center px-5 border-b border-gray-100 relative">          
          {isOpen ? (
            <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <Logo size="md" theme={theme} className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <img
                  src="/brand.png"
                  alt="Brand Logo"
                  className="transition-all duration-700 ease-out object-contain h-8"
                  style={{
                    width: 'auto',
                  }}
                />
                <span className="text-[10px] text-slate-500 font-medium leading-none mt-1.5">
                  Powered by <span className="font-bold text-slate-700">Nexi</span>
                </span>
              </div>
            </Link>
          ) : (
            <Logo size="md" theme={theme} className="cursor-pointer group-hover:scale-105 transition-transform" />
          )}
        </div>

        {/* Premium Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`
                  group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold
                  transition-all duration-300 overflow-hidden
                  ${active
                    ? 'text-white shadow-lg'
                    : 'text-slate-700 hover:bg-gray-50/80 hover:text-slate-900'
                  }
                  ${!isOpen && 'justify-center'}
                `}
                style={active ? { 
                  background: theme.getAccentGradient(135),
                  boxShadow: `0 4px 20px ${theme.accentPrimary}40`
                } : {}}
                title={!isOpen ? item.label : ''}
              >
                {/* Subtle hover glow for inactive items */}
                {!active && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.accentPrimary}05, ${theme.accentSecondary}05)` 
                    }}
                  ></div>
                )}
                
                {/* Icon with enhanced styling */}
                <div className={`relative z-10 ${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
                </div>
                
                {/* Label with chevron indicator */}
                {isOpen && (
                  <div className="flex items-center justify-between flex-1 relative z-10">
                    <span className="tracking-wide">{item.label}</span>
                    {active && (
                      <ChevronRight className="w-4 h-4 opacity-80 animate-pulse" strokeWidth={2.5} />
                    )}
                  </div>
                )}
                
                {/* Active indicator bar */}
                {active && !isOpen && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Premium Account Section */}
        <div className="border-t border-gray-100 p-4 bg-gradient-to-b from-transparent to-gray-50/50">
          {/* Premium User Profile Card */}
          <Link
            href="/dashboard/profile"
            className={`
              group relative flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 mb-3
              border border-gray-100 bg-white hover:border-gray-200
              ${!isOpen && 'justify-center'}
            `}
            style={{ 
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
            }}
          >
            {/* Premium Avatar with Initials */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <span className="text-white font-bold text-base relative z-10 tracking-tight">
                {getInitials(user?.name)}
              </span>
            </div>
            
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize font-medium mt-0.5">
                  {user?.role || 'User'}
                </p>
              </div>
            )}
            
            {/* Subtle hover indicator */}
            {isOpen && (
              <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>

          {/* Premium Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
            className={`
              group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
              text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300
              transition-all duration-300 active:scale-95 relative overflow-hidden
              ${!isOpen && 'justify-center'}
            `}
            style={{ 
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)',
            }}
            title={!isOpen ? 'Logout' : ''}
          >
            {/* Subtle hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-50 to-rose-50"></div>
            
            <LogOut className="w-5 h-5 shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
            {isOpen && <span className="relative z-10">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
