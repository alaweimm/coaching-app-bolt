import React from 'react';
import { useTheme, themes } from '../../theme/ThemeProvider';
import classNames from 'classnames';

interface PixelHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function PixelHeading({ children, level = 1, className }: PixelHeadingProps) {
  const { theme } = useTheme();
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames(
        theme === '8bit' && 'font-pixel uppercase tracking-wide',
        theme !== '8bit' && themes[theme].heading,
        {
          'text-4xl': level === 1,
          'text-3xl': level === 2,
          'text-2xl': level === 3,
          'text-xl': level === 4,
          'text-lg': level === 5,
          'text-base': level === 6,
        },
        className
      )}
    >
      {children}
    </Tag>
  );
}