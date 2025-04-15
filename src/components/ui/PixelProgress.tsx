import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PixelProgress({
  value,
  max = 100,
  variant = 'primary',
  showLabel = false,
  size = 'md',
  className,
}: PixelProgressProps) {
  const { theme } = useTheme();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  return (
    <div className={className}>
      <div
        className={classNames(
          'w-full bg-gray-200 overflow-hidden',
          theme === '8bit' ? 'border-4 border-gray-900' : 'rounded-full',
          sizeStyles[size]
        )}
      >
        <div
          className={classNames(
            'transition-all duration-300',
            theme === '8bit' ? 'h-full' : 'h-full rounded-full',
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600">
          {value} / {max}
        </div>
      )}
    </div>
  );
}