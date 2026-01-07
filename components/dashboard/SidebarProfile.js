/**
 * Sidebar Profile & Logout Combo
 * - Merged user profile and logout for cleaner UI
 * - minimal logout button at the end
 * - Confirmation prompt integration
 */

'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { LogOut, Power, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { theme } from '@/utils/theme';

export default function SidebarProfile({ user, isOpen, setIsOpen }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Get user initials
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        await signOut({ callbackUrl: '/' });
    };

    const cancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div className={`${isOpen ? 'px-3 pb-4' : 'px-2 pb-4'} relative z-20 mt-auto`}>
                <div
                    className={`
                group relative flex items-center 
                ${isOpen ? 'p-1.5 pr-2 gap-2' : 'justify-center p-2'} 
                bg-white/50 hover:bg-white/80 backdrop-blur-md
                border border-slate-200/50 hover:border-slate-300/80
                rounded-2xl transition-all duration-300
                shadow-sm hover:shadow-md
            `}
                >
                    {/* Profile Link Area */}
                    <Link
                        href="/dashboard/profile"
                        onClick={() => {
                            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                setIsOpen(false);
                            }
                        }}
                        className={`
                flex items-center flex-1 min-w-0 
                ${isOpen ? 'gap-3' : 'justify-center'}
                cursor-pointer
            `}
                    >
                        {/* Avatar */}
                        <div
                            className={`
                ${isOpen ? 'w-10 h-10' : 'w-10 h-10'} 
                rounded-xl flex items-center justify-center shrink-0 
                relative overflow-hidden transition-transform duration-300 
                shadow-sm
              `}
                            style={{
                                background: theme.getAccentGradient(135),
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <span className="text-white font-bold text-sm relative z-10 tracking-tight">
                                {getInitials(user?.name)}
                            </span>
                        </div>

                        {/* User Info (Expanded) */}
                        {isOpen && (
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <p className="text-sm font-bold text-slate-800 truncate leading-tight">
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-[10px] text-slate-500 truncate font-semibold uppercase tracking-wider mt-0.5">
                                    {user?.role || 'Applicant'}
                                </p>
                            </div>
                        )}
                    </Link>

                    {/* Logout Button (Right End) */}
                    {isOpen && (
                        <button
                            onClick={handleLogoutClick}
                            className="
                    w-8 h-8 flex items-center justify-center rounded-lg
                    text-slate-400 hover:text-red-500 hover:bg-red-50
                    transition-all duration-200 shrink-0
                "
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal - Portaled to body */}
            {showConfirm && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden scale-100 animate-scaleIn border border-white/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping opacity-20"></div>
                                <Power className="w-8 h-8 text-red-500" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out?</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                Are you sure you want to end your session? You'll need to sign in again to access the dashboard.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={cancelLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-slate-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                                </button>
                            </div>
                        </div>

                        {/* Decorative bottom line */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-red-400 via-orange-400 to-red-400 opacity-20" />
                    </div>
                </div>,
                document.body
            )}

            {/* Styles for animations */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
        </>
    );
}
