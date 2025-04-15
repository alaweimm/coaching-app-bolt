import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, themes } from '../theme/ThemeProvider';
import classNames from 'classnames';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={buttonRef}
          className={classNames(
            'p-3 rounded-full transition-all duration-200',
            theme === '8bit' 
              ? 'pixel-button pixel-bounce'
              : `${themes[theme].button} ${themes[theme].primary}`
          )}
          aria-label="Change theme"
        >
          <Palette className="w-6 h-6 text-white" />
        </button>
        
        {isOpen && (
          <div
            ref={menuRef}
            className={classNames(
              'absolute bottom-full right-0 mb-2 w-48',
              theme === '8bit' ? 'pixel-panel' : themes[theme].card
            )}
          >
            <div className="p-2 space-y-1">
              <ThemeOption
                theme="8bit"
                label="🎮 8-bit Theme"
                currentTheme={theme}
                onClick={() => setTheme('8bit')}
              />
              <ThemeOption
                theme="modern"
                label="💎 Modern Theme"
                currentTheme={theme}
                onClick={() => setTheme('modern')}
              />
              <ThemeOption
                theme="minimal"
                label="⚪ Minimal Theme"
                currentTheme={theme}
                onClick={() => setTheme('minimal')}
              />
              <ThemeOption
                theme="dark"
                label="🌙 Dark Theme"
                currentTheme={theme}
                onClick={() => setTheme('dark')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ThemeOptionProps {
  theme: string;
  label: string;
  currentTheme: string;
  onClick: () => void;
}

function ThemeOption({ theme, label, currentTheme, onClick }: ThemeOptionProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'w-full px-4 py-2 text-left rounded transition-colors',
        currentTheme === '8bit' ? 'pixel-hover' : 'hover:bg-gray-100',
        currentTheme === theme && 'bg-blue-100 text-blue-900'
      )}
    >
      {label}
    </button>
  );
}