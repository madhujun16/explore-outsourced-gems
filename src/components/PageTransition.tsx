import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location.pathname);
  const [transitionStage, setTransitionStage] = useState<'entering' | 'entered' | 'exiting'>('entered');

  useEffect(() => {
    if (location.pathname !== displayLocation) {
      setTransitionStage('exiting');
    }
  }, [location.pathname, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'exiting') {
      // Wait for exit animation to complete
      const timer = setTimeout(() => {
        setDisplayLocation(location.pathname);
        setTransitionStage('entering');
        // Wait for enter animation to start
        setTimeout(() => {
          setTransitionStage('entered');
        }, 50);
      }, 300); // Match CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [transitionStage, location.pathname]);

  return (
    <div
      className={`page-transition-wrapper ${
        transitionStage === 'exiting' ? 'page-exit' : 
        transitionStage === 'entering' ? 'page-enter' : 
        'page-entered'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;

