/**
 * Sidebar Navigation Component
 * - Menu items with elegant hover states
 * - Active indicators with gradients
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function SidebarNav({ menuItems, isOpen, setIsOpen }) {
    const pathname = usePathname();
    const isActive = (href) => pathname === href;

    return (
        <nav className={`flex-1 ${isOpen ? 'px-3 py-4' : 'px-2 py-4'} space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent relative z-10`}>
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
              group relative flex items-center ${isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-2 py-3'} 
              rounded-xl text-sm font-medium
              transition-all duration-200 overflow-hidden
              ${active
                                ? 'text-white'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                            }
            `}
                        title={!isOpen ? item.label : ''}
                    >
                        {/* Active background with gradient */}
                        {active && (
                            <div
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    background: theme.getAccentGradient(135),
                                    boxShadow: `0 4px 16px ${theme.accentPrimary}25`,
                                }}
                            />
                        )}

                        {/* Hover indicator */}
                        {!active && (
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full group-hover:h-6 transition-all duration-200"
                                style={{ background: theme.getAccentGradient(180) }}
                            />
                        )}

                        {/* Icon */}
                        <Icon
                            className={`relative z-10 shrink-0 ${isOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-200 ${active ? '' : 'group-hover:scale-110'}`}
                            strokeWidth={active ? 2.5 : 2}
                        />

                        {/* Label */}
                        {isOpen && (
                            <span className="relative z-10 text-sm font-medium tracking-wide truncate flex-1">
                                {item.label}
                            </span>
                        )}

                        {/* Badge */}
                        {isOpen && item.badge && (
                            <span
                                className="relative z-10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)',
                                }}
                            >
                                {item.badge}
                            </span>
                        )}

                        {/* Hover arrow indicator */}
                        {isOpen && !active && (
                            <ChevronRight className="relative z-10 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
