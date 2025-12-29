import { useNavigate } from 'react-router-dom';
import { ErrorBoundaryClass } from './ErrorBoundary';
import { ReactNode } from 'react';
import { ErrorInfo } from 'react';

interface RouterErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error boundary that can use React Router navigation
 * Must be used inside a BrowserRouter component
 */
const RouterErrorBoundary: React.FC<RouterErrorBoundaryProps> = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundaryClass {...props} navigate={navigate} />;
};

export default RouterErrorBoundary;

