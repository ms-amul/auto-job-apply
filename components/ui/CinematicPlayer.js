'use client';

import { useEffect, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

export default function CinematicPlayer({ isOpen, onClose, videoId, title = 'Watch Demo' }) {
    const [isExpanded, setIsExpanded] = useState(true);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] animate-modalPop ${isExpanded ? 'w-[calc(100vw-3rem)] md:w-[800px]' : 'w-[calc(100vw-3rem)] md:w-[420px]'
                }`}
            role="dialog"
            aria-label="Video Player"
            aria-modal="false"
        >
            {/* Premium Glass Container */}
            <div
                className="relative rounded-[1.5rem] md:rounded-[2rem] p-1.5 overflow-hidden shadow-2xl group"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                    boxShadow: `
            0 30px 60px -12px rgba(0, 0, 0, 0.3),
            0 18px 36px -18px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
                }}
            >
                {/* Internal Content Area */}
                <div className="bg-black/95 rounded-xl md:rounded-[1.3rem] overflow-hidden relative shadow-2xl aspect-video">

                    {/* Header Overlay (Revels on hover) */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white/90 font-medium text-xs md:text-sm tracking-wide line-clamp-1 pr-10">
                            {title}
                        </h3>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-8 h-8 hidden md:flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-90"
                                title={isExpanded ? "Restore" : "Expand"}
                                aria-label={isExpanded ? "Restore video size" : "Expand video size"}
                            >
                                {isExpanded ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
                            </button>

                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md border border-red-500/30 transition-all active:scale-90"
                                aria-label="Close video player"
                            >
                                <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    {/* Persistent Close Button for Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-30 w-7 h-7 flex md:hidden items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10"
                        aria-label="Close video player"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    {/* Video Iframe */}
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* Cinematic Ambient Glow */}
            <div
                className="absolute -inset-10 rounded-full opacity-30 blur-[80px] -z-10 group-hover:opacity-50 transition-opacity duration-1000 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.3), transparent 70%)',
                }}
            />
        </div>
    );
}
