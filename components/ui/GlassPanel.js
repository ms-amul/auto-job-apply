/**
 * GlassPanel
 * - Clean, professional frosted glass panel
 * - Consistent rich look with refined borders and depth
 */

export default function GlassPanel({
  children,
  className = '',
  padding = 'p-8',
  hover = false,
}) {
  return (
    <div
      className={`
        relative rounded-2xl bg-white/50
        border border-gray-200/80 backdrop-blur-2xl
        ${padding}
        ${hover ? 'transition-all duration-300 hover:shadow-xl hover:border-gray-300' : ''}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(16px) saturate(120%)',
        WebkitBackdropFilter: 'blur(16px) saturate(120%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
      }}
    >
      {children}
    </div>
  );
}

