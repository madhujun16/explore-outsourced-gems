import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
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
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    trackUserInteraction('cta_click', 'Navigation', 'Contact CTA');
    onContactClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NovalSquadLogo variant="dark" size="sm" />
          </div>

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
                <Phone className="h-3 w-3" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>admin@novalsquad.com</span>
              </div>
            </div>

            <Button 
              onClick={handleContactClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 h-9 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
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
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
