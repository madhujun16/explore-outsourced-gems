import React, { createContext, useContext } from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

// Create context for Google Analytics functions
const GoogleAnalyticsContext = createContext<ReturnType<typeof useGoogleAnalytics> | null>(null);

/**
 * Provider component that makes Google Analytics tracking functions available
 * throughout the component tree via React Context
 */
export const GoogleAnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ga = useGoogleAnalytics();

  return (
    <GoogleAnalyticsContext.Provider value={ga}>
      {children}
    </GoogleAnalyticsContext.Provider>
  );
};

/**
 * Hook to access Google Analytics tracking functions from any component
 * Must be used within a GoogleAnalyticsProvider
 */
export const useGA = () => {
  const context = useContext(GoogleAnalyticsContext);
  if (!context) {
    throw new Error('useGA must be used within a GoogleAnalyticsProvider');
  }
  return context;
};

/**
 * Higher-order component to wrap components with Google Analytics tracking
 */
export const withGoogleAnalytics = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => (
    <GoogleAnalyticsProvider>
      <Component {...props} />
    </GoogleAnalyticsProvider>
  );

  WrappedComponent.displayName = `withGoogleAnalytics(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default GoogleAnalyticsProvider;

