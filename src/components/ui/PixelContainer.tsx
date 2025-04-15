import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelContainer({ children, className }: PixelContainerProps) {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        'container mx-auto px-4',
        theme === '8bit' && 'pixel-grid',
        className
      )}
    >
      {children}
    </div>
  );
}