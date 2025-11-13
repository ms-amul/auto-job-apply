/**
 * Professional Sidebar
 * - Logo aligned left
 * - Hamburger icon right-top on mobile
 * - Clean, professional layout
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
} from 'lucide-react';
import { theme } from '@/utils/theme';

export default function CompactSidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();

  const applicantMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/jobs', icon: Briefcase, label: 'Browse Jobs' },
    { href: '/dashboard/applications', icon: FileText, label: 'Applications' },
    { href: '/dashboard/bot', icon: Bot, label: 'Auto-Apply Bot' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const recruiterMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/jobs', icon: Briefcase, label: 'My Jobs' },
    { href: '/dashboard/applicants', icon: Users, label: 'Applicants' },
    { href: '/dashboard/bot', icon: Zap, label: 'AI Assistant' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = user?.role === 'recruiter' ? recruiterMenuItems : applicantMenuItems;
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button - Fixed Top Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 rounded-xl bg-white border border-gray-300 flex items-center justify-center shadow-lg"
        style={{ 
          color: theme.accentPrimary,
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white
          transition-all duration-300 ease-in-out z-40 flex flex-col
          border-r border-gray-200
          ${isOpen ? 'w-64' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section - Aligned Left */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          {isOpen ? (
            <Link href="/" className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: theme.getAccentGradient(135) }}
              >
                <span className="text-white font-bold text-base">JV</span>
              </div>
              <span className="text-lg font-bold" style={{ color: theme.accentPrimary }}>
                JobVita
              </span>
            </Link>
          ) : (
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <span className="text-white font-bold text-base">JV</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
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
                  flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                  transition-all duration-200
                  ${active
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                  ${!isOpen && 'justify-center'}
                `}
                style={active ? { background: theme.getAccentGradient(135) } : {}}
                title={!isOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Account Section - Bottom */}
        <div className="border-t border-gray-200 p-4">
          {/* User Profile */}
          <Link
            href="/dashboard/profile"
            className={`
              flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors mb-3
              ${!isOpen && 'justify-center'}
            `}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: theme.getAccentGradient(135) }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name?.split(' ')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate capitalize">
                  {user?.role || 'User'}
                </p>
              </div>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
              text-red-600 border border-red-200 hover:bg-red-50
              transition-colors duration-200
              ${!isOpen && 'justify-center'}
            `}
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
