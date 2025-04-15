import { toast } from 'react-hot-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): AppError {
  console.error('Error details:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return error;
  }

  if (error instanceof Error) {
    const appError = new AppError(error.message);
    toast.error(error.message);
    return appError;
  }

  const appError = new AppError('An unexpected error occurred');
  toast.error(appError.message);
  return appError;
}

export function assertError(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new AppError(message);
  }
}