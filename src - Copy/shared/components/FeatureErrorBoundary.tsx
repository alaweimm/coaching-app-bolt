import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  feature?: string;
}

function ErrorFallback({ error, resetErrorBoundary, feature }: ErrorFallbackProps) {
  return (
    <div className="rounded-lg bg-red-50 p-6">
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 text-red-600" />
        <h3 className="ml-3 text-lg font-medium text-red-800">
          {feature ? `${feature} Error` : 'Something went wrong'}
        </h3>
      </div>
      <div className="mt-4">
        <p className="text-sm text-red-700">
          {error.message}
        </p>
      </div>
      <div className="mt-6">
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

interface FeatureErrorBoundaryProps {
  children: React.ReactNode;
  feature?: string;
  onReset?: () => void;
}

export function FeatureErrorBoundary({
  children,
  feature,
  onReset
}: FeatureErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          feature={feature}
        />
      )}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}