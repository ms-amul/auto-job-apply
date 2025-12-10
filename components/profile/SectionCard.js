'use client';

import { theme } from '@/utils/theme';

export default function SectionCard({ title, description, children }) {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200/80 p-5 md:p-6 relative overflow-hidden"
      style={{ 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Left accent border */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: theme.getAccentGradient(180),
          opacity: 0.6,
          borderTopLeftRadius: '0.75rem',
          borderBottomLeftRadius: '0.75rem',
        }}
      />
      
      <div className="mb-5 pl-2">
        <h2 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
          {typeof title === 'string' ? (
            <>
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.accentPrimary }}
              />
              {title}
            </>
          ) : (
            title
          )}
        </h2>
        {description && (
          <div className="text-sm text-slate-600">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        )}
      </div>
      <div className="pl-2">
        {children}
      </div>
    </div>
  );
}

