import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  navigate?: (path: string) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

// Base ErrorBoundary class that doesn't require navigation
export class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate unique error ID for tracking
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to monitoring service
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
          error_id: this.state.errorId
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.group('🚨 Error Details');
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
        console.error('Error ID:', this.state.errorId);
        console.groupEnd();
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when route changes
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
    if (this.props.navigate) {
      this.props.navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  handleGoBack = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
    if (window.history.length > 1) {
      window.history.back();
    } else {
      if (this.props.navigate) {
        this.props.navigate('/');
      } else {
        window.location.href = '/';
      }
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl border-2 border-destructive/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl text-destructive">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-muted p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium mb-2">Error Details (Development)</summary>
                  <pre className="text-xs text-muted-foreground overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              
              {this.state.errorId && (
                <p className="text-xs text-muted-foreground">
                  Error ID: {this.state.errorId}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={this.handleGoBack}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
                <Button 
                  onClick={this.handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Default export - doesn't use router navigation (for outer error boundary)
const ErrorBoundary: React.FC<Omit<Props, 'navigate'>> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;
