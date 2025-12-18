"use client";
import React, { useState } from 'react';

export default function DevelopmentBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed top-4 right-4 group z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      <div className="relative flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-full shadow-lg shadow-red-200/50 transition-all duration-300 hover:shadow-red-300/60 hover:border-red-400 cursor-pointer">
        {/* Animated pulse dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Badge text */}
        <span className="text-xs font-semibold text-red-700 tracking-wide uppercase">
          Beta
        </span>
      </div>

      {/* Hover tooltip */}
      <div 
        className={`absolute top-full right-0 mt-2 w-64 p-4 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 ${
          isHovered 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* Tooltip arrow */}
        <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
        
        {/* Tooltip content */}
        <div className="relative z-10">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Under Active Development
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                This feature is currently being developed. You may encounter bugs or unexpected behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}