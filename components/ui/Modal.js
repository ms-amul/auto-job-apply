'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'md', // 'sm', 'md', 'lg', 'xl', '2xl', 'full'
  showCloseButton = true,
  closeOnBackdropClick = true,
  zIndex = 100,
  className = '',
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 animate-modal-fadeIn"
      onClick={handleBackdropClick}
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"></div>

      {/* Modal */}
      <div 
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white/90 backdrop-blur-3xl rounded-3xl shadow-2xl border-2 border-white/60 overflow-hidden animate-modal-slideUp ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 2px 0 0 rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Multi-layer glass reflections */}
        <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/60 to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-linear-to-tl from-white/40 via-transparent to-transparent opacity-50"></div>
        
        {/* Top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1500"></div>
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group"
            style={{
              boxShadow: '0 4px 12px -3px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent rounded-xl"></div>
            <X className="w-5 h-5 text-gray-700 relative z-10 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

