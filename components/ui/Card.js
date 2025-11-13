/**
 * Card Component - Clean & Flexible
 */

export default function Card({ children, className = '', onClick }) {
  return (
    <div 
      className={`bg-white rounded-xl border border-gray-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
