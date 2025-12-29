import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface NavigationContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const lastActiveSectionRef = useRef('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          
          // Only update isScrolled if it actually changed
          const newIsScrolled = scrollTop > 20;
          if (newIsScrolled !== isScrolledRef.current) {
            isScrolledRef.current = newIsScrolled;
            setIsScrolled(newIsScrolled);
          }

          // Determine active section based on scroll position
          const sections = ['services', 'digital', 'industries', 'contact'];
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          }) || '';
          
          // Only update if section actually changed
          if (currentSection !== lastActiveSectionRef.current) {
            lastActiveSectionRef.current = currentSection;
            setActiveSection(currentSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationContext.Provider value={{
      activeSection,
      setActiveSection,
      isScrolled,
      setIsScrolled
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
