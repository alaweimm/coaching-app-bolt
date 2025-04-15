import React from 'react';
import { useTheme, themes } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function PixelCard({ children, variant = 'primary', className }: PixelCardProps) {
  const { theme } = useTheme();

  const variantStyles = {
    primary: 'bg-white border-gray-900',
    secondary: 'bg-gray-100 border-gray-700',
    success: 'bg-green-100 border-green-900',
    warning: 'bg-yellow-100 border-yellow-900',
    danger: 'bg-red-100 border-red-900',
  };

  return (
    <div
      className={classNames(
        'p-4',
        theme === '8bit' && [
          'border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
          variantStyles[variant]
        ],
        theme !== '8bit' && themes[theme].card,
        className
      )}
    >
      {children}
    </div>
  );
}