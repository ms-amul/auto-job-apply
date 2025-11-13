/**
 * Reusable Empty State Component
 */

'use client';

import Button from './Button';

export default function EmptyState({
  icon,
  title,
  description,
  action,
  actionText,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className="w-16 h-16 text-gray-300 mb-4">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && actionText && (
        <Button onClick={action} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
}

