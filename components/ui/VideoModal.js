/**
 * VideoModal Component
 * Sophisticated YouTube video player modal
 * - Premium glassmorphic design
 * - Smooth animations
 * - Responsive iframe
 * - Clean, rich look
 */

'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoId, title = 'Watch Demo' }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Light Transparent Backdrop with blur */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/30" />

      {/* MacBook Container */}
      <div 
        className="relative w-full max-w-6xl animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDuration: '0.4s' }}
      >
        {/* MacBook Screen */}
        <div className="relative">
          {/* Screen Bezel - Light Theme */}
          <div 
            className="relative rounded-2xl p-3 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: `
                0 50px 100px -20px rgba(0, 0, 0, 0.15),
                0 30px 60px -30px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5),
                0 0 0 1px rgba(0, 0, 0, 0.05)
              `,
            }}
          >
            {/* Notch - Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-7 bg-slate-500 rounded-b-3xl z-20 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
              <div className="w-12 h-1 rounded-full bg-slate-300"></div>
            </div>

            {/* Close Button - Light Theme */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-30 group p-2.5 rounded-full transition-all duration-200 active:scale-95"
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors" strokeWidth={2.5} />
            </button>

            {/* Screen Content - Light Frosted Glass */}
            <div 
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: `
                  inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
                  inset 0 0 20px rgba(255, 255, 255, 0.3),
                  0 20px 40px -10px rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(0, 0, 0, 0.05)
                `,
              }}
            >
              {/* Browser-like Header - Light Theme */}
              <div 
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div 
                  className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-sm text-slate-600 text-center"
                  style={{
                    background: 'rgba(0, 0, 0, 0.03)',
                  }}
                >
                  {title}
                </div>
                <div className="w-20"></div>
              </div>

              {/* Video Container with Glass Effect */}
              <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* MacBook Base - Light Theme */}
          <div className="relative h-2 mt-1">
            <div 
              className="absolute inset-x-0 h-full rounded-b-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.98))',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>

          {/* MacBook Stand - Light Theme */}
          <div className="flex justify-center">
            <div 
              className="w-32 h-1 rounded-b-lg"
              style={{
                background: 'linear-gradient(to bottom, rgba(226, 232, 240, 0.9), rgba(203, 213, 225, 0.95))',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
              }}
            />
          </div>
        </div>

        {/* Premium Glow Effects */}
        <div 
          className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl -z-10 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4), transparent 70%)',
          }}
        />
        
        {/* Keyboard Hint - Light Theme */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-slate-600">
            Press <kbd className="px-2 py-1 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200 rounded-lg backdrop-blur-sm shadow-sm">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}

