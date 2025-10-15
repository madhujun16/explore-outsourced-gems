import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Mail, 
  MessageCircle,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';
import NovalSquadLogo from './NovalSquadLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { trackUserInteraction } from '@/hooks/usePerformanceMonitoring';
import { useNavigation } from '@/contexts/NavigationContext';

interface EnhancedNavigationProps {
  onContactClick: () => void;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ onContactClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, isScrolled } = useNavigation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigationItems = [
    {
      id: 'services',
      label: t('navigation.services'),
      href: '#services',
      icon: Users,
      description: 'Our core services'
    },
    {
      id: 'digital',
      label: 'Digital',
      href: '#digital',
      icon: Star,
      description: 'Digital solutions',
      badge: 'New'
    },
    {
      id: 'industries',
      label: t('navigation.industries'),
      href: '#industries',
      icon: Award,
      description: 'Industries we serve'
    },
    {
      id: 'contact',
      label: t('navigation.contact'),
      href: '#contact',
      icon: MessageCircle,
      description: 'Get in touch'
    }
  ];

  const handleNavClick = (href: string, label: string) => {
    trackUserInteraction('nav_click', 'Navigation', label);
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page with hash
      window.location.href = `/${href}`;
    }
  };

  const handleContactClick = () => {
    trackUserInteraction('cta_click', 'Navigation', 'Contact CTA');
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/contact') {
      // If already on contact page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Call the provided onContactClick handler
      onContactClick();
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-indigo-200/50' 
        : 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <NovalSquadLogo variant="dark" size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.href, item.label)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher />
            
            {/* Contact Info */}
            <div className="hidden xl:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>admin@novalsquad.com</span>
              </div>
            </div>

            <Button 
              onClick={handleContactClick}
              className="group relative bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 h-9 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              
              {/* Content */}
              <span className="relative z-10 flex items-center">
                <span className="">{t('hero.cta')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 relative"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-indigo-200/50 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="px-4 py-3 border-t border-gray-200/50 mt-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>admin@novalsquad.com</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleContactClick}
                  className="group relative w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="">{t('hero.cta')}</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnhancedNavigation;
