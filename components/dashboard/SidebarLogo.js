/**
 * Sidebar Logo Component
 * - Brand logo with clean display
 * - Collapsed/Expanded states
 */

'use client';

import { theme } from '@/utils/theme';
import Link from 'next/link';

export default function SidebarLogo({ isOpen }) {
    return (
        <div className={`${isOpen ? 'px-5 py-5' : 'px-3 py-5'} relative z-10`}>
            {isOpen ? (
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex flex-col min-w-0">
                        <img src="/brand.png" alt="Logo" className="w-44" />
                        <span className="text-xs text-slate-500 font-medium leading-none mt-1.5 tracking-wide">
                            Powered by <span className="text-slate-700 font-semibold">Nexi</span>
                        </span>
                    </div>
                </Link>
            ) : (
                <Link href="/" className="w-full flex justify-center group">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg"
                        style={{
                            background: theme.getAccentGradient(135),
                            boxShadow: `0 4px 16px ${theme.accentPrimary}30`,
                        }}
                    >
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                </Link>
            )}
        </div>
    );
}
