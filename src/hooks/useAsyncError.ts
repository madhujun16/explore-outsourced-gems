import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AsyncErrorOptions {
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
  logError?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Hook for handling async operations with proper error handling
 */
export const useAsyncError = () => {
  const { toast } = useToast();

  const handleAsyncError = useCallback(
    (error: unknown, options: AsyncErrorOptions = {}) => {
      const {
        showToast = true,
        toastTitle = 'Error',
        toastDescription,
        logError = true,
        onError
      } = options;

      // Log error details
      if (logError) {
        console.error('Async error:', error);
      }

      // Extract error message
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }

      // Show toast notification
      if (showToast) {
        toast({
          title: toastTitle,
          description: toastDescription || errorMessage,
          variant: 'destructive',
        });
      }

      // Call custom error handler
      if (onError) {
        onError(error);
      }

      // Log to monitoring service if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: errorMessage,
          fatal: false
        });
      }

      return errorMessage;
    },
    [toast]
  );

  /**
   * Wrapper for async functions that automatically handles errors
   */
  const withErrorHandling = useCallback(
    <T extends (...args: any[]) => Promise<any>>(
      asyncFn: T,
      options?: AsyncErrorOptions
    ): T => {
      return (async (...args: Parameters<T>) => {
        try {
          return await asyncFn(...args);
        } catch (error) {
          handleAsyncError(error, options);
          throw error; // Re-throw to allow caller to handle if needed
        }
      }) as T;
    },
    [handleAsyncError]
  );

  return {
    handleAsyncError,
    withErrorHandling
  };
};

export default useAsyncError;

