import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelIconProps {
  icon: React.ReactNode;
  className?: string;
  spin?: boolean;
}

export function PixelIcon({ icon, className, spin }: PixelIconProps) {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        'inline-flex',
        theme === '8bit' && [
          'pixel-border',
          spin && 'animate-pixel-spin'
        ],
        className
      )}
    >
      {icon}
    </div>
  );
}