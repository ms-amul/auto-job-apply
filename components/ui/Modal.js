'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { theme } from '@/utils/theme';

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
      {/* Premium Backdrop with Blur */}
      <div 
        className="absolute inset-0 backdrop-blur-xl transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      ></div>

      {/* Modal Container */}
      <div 
        className={`relative w-full ${maxWidthClasses[maxWidth]} rounded-3xl overflow-hidden animate-modal-slideUp ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glassmorphic Background */}
        <div 
          className="absolute inset-0 bg-white/95 backdrop-blur-3xl"
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px ${theme.accentPrimary}10`,
          }}
        ></div>

        {/* Subtle Accent Gradient Top Border */}
        <div 
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: theme.getAccentGradient(90),
            opacity: 0.6,
          }}
        ></div>

        {/* Glass Reflection Layers */}
        <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white to-transparent opacity-60"></div>

        {/* Subtle Ambient Glow */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{
            background: theme.getAccentGradient(135),
          }}
        ></div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            style={{
              boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <X className="w-4 h-4 text-gray-600 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
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

