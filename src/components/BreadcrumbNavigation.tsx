import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors duration-200"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          {item.current ? (
            <span 
              className="text-foreground font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : item.href ? (
            <Link 
              to={item.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;
