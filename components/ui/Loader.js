/**
 * Reusable Loader Component
 * Uses theme.js for consistent styling
 */

'use client';

export default function Loader({ size = 'md', fullScreen = false, text }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size]}
          border-blue-600 border-t-transparent
          rounded-full animate-spin
        `}
      />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="lg" text="Loading..." />
    </div>
  );
}

export function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader size="md" />
    </div>
  );
}

