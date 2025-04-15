import React from 'react';
import { useTheme, themes } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props
}: PixelButtonProps) {
  const { theme } = useTheme();

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-900',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-900',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-900',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-900',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center font-medium transition-all',
        theme === '8bit' && [
          'border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
          'hover:translate-x-[2px] hover:translate-y-[2px]',
          'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
          'active:translate-x-[4px] active:translate-y-[4px]',
          'active:shadow-none',
          variantStyles[variant]
        ],
        theme !== '8bit' && themes[theme].button,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}