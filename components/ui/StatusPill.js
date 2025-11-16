/**
 * StatusPill
 * - Small rounded status badge
 * - Used for profile / agent status
 */

export default function StatusPill({ 
  children, 
  label, 
  variant = 'neutral', 
  tone, 
  className = '' 
}) {
  // Support both 'variant' and 'tone' props for backwards compatibility
  const activeVariant = variant || tone || 'neutral';
  
  const variants = {
    neutral: 'bg-slate-50 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    primary: 'bg-blue-50 text-blue-700 border border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    muted: 'bg-slate-100 text-slate-500 border border-slate-200/80',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
        ${variants[activeVariant] || variants.neutral}
        ${className}
      `}
    >
      {children || label}
    </span>
  );
}


