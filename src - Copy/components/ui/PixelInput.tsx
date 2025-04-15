import React from 'react';
import { useTheme, themes } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function PixelInput({
  label,
  error,
  icon,
  className,
  ...props
}: PixelInputProps) {
  const { theme } = useTheme();

  return (
    <div className="space-y-1">
      {label && (
        <label className={classNames(
          'block text-sm font-medium',
          theme === '8bit' ? 'font-pixel' : themes[theme].text
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={classNames(
            'w-full',
            icon && 'pl-10',
            theme === '8bit' ? [
              'border-4 border-gray-900',
              'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
              'focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
              'focus:translate-x-[2px] focus:translate-y-[2px]',
              'transition-all px-4 py-2',
              error && 'border-red-900 bg-red-50'
            ] : themes[theme].input,
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className={classNames(
          'text-sm text-red-600',
          theme === '8bit' && 'font-pixel'
        )}>
          {error}
        </p>
      )}
    </div>
  );
}