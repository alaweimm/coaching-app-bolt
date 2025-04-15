import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { ErrorBoundary } from './ErrorBoundary';
import { useTheme } from '../theme/ThemeProvider';
import classNames from 'classnames';

export function Layout() {
  const { theme } = useTheme();

  return (
    <div className={classNames(
      'min-h-screen transition-colors',
      {
        'bg-yellow-50 font-pixel': theme === '8bit',
        'bg-gray-50': theme === 'modern',
        'bg-white': theme === 'minimal',
        'bg-gray-900 text-gray-100': theme === 'dark',
      }
    )}>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}