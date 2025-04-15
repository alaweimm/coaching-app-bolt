import React, { createContext, useContext, useState, useEffect } from 'react';
import classNames from 'classnames';

export type Theme = '8bit' | 'modern' | 'minimal' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  '8bit': {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-200 hover:bg-gray-300',
    card: 'border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    input: 'border-4 border-gray-900 focus:ring-4 focus:ring-blue-500',
    button: 'border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all',
    text: 'font-pixel',
    heading: 'font-pixel uppercase tracking-wide',
  },
  modern: {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    secondary: 'bg-gray-100',
    card: 'shadow-lg rounded-xl bg-white/80 backdrop-blur-sm',
    input: 'rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500',
    button: 'rounded-lg shadow-md hover:shadow-lg transition-shadow',
    text: 'font-sans',
    heading: 'font-sans font-bold',
  },
  minimal: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-100',
    card: 'border border-gray-200',
    input: 'border-b-2 border-gray-200 focus:border-gray-900',
    button: 'border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors',
    text: 'font-sans',
    heading: 'font-sans font-light',
  },
  dark: {
    primary: 'bg-gray-800',
    secondary: 'bg-gray-700',
    card: 'bg-gray-800 border border-gray-700',
    input: 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500',
    button: 'bg-gray-700 hover:bg-gray-600 text-white',
    text: 'text-gray-300',
    heading: 'text-white font-bold',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('modern');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      <div className={classNames(
        'min-h-screen transition-colors duration-300',
        {
          'bg-yellow-50 font-pixel': theme === '8bit',
          'bg-gradient-to-br from-gray-50 to-gray-100 font-sans': theme === 'modern',
          'bg-white font-sans': theme === 'minimal',
          'bg-gray-900 text-gray-100 font-sans': theme === 'dark',
        }
      )}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}