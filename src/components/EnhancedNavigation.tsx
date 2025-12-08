import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Mail, 
  MessageCircle,
  ArrowRight,
  Users,
  Award,
  Brain,
  Code2,
  Megaphone,
  Database,
  Home,
  LucideIcon,
  Wrench,
  ClipboardList,
  Monitor,
  Shield,
  Package
} from 'lucide-react';
import NovalSquadLogo from './NovalSquadLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { trackUserInteraction } from '@/hooks/usePerformanceMonitoring';
import { useNavigation } from '@/contexts/NavigationContext';

interface EnhancedNavigationProps {
  onContactClick: () => void;
}

interface DropdownItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  badge?: string;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ onContactClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState<boolean>(false);
  const { activeSection, isScrolled } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const servicesDropdownItems: DropdownItem[] = [
    {
      id: 'dedicated-staff',
      label: 'Dedicated Staff',
      href: '/dedicated-staff',
      icon: Users,
      description: 'All outsourcing services in detail'
    },
    {
      id: 'ai-services',
      label: 'AI Services',
      href: '/ai-services',
      icon: Brain,
      description: 'AI & LLM solutions',
      badge: 'New'
    },
    {
      id: 'software-development',
      label: 'Software & Tools Development',
      href: '#digital',
      icon: Code2,
      description: 'Custom software & tool development'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      href: '#digital',
      icon: Megaphone,
      description: 'SEO, ads & content strategy'
    },
    {
      id: 'data-crm',
      label: 'Data/CRM',
      href: '#digital',
      icon: Database,
      description: 'GDPR-ready CRM & analytics'
    }
  ];

  const toolsDropdownItems: DropdownItem[] = [
    {
      id: 'vendor-management',
      label: 'VMtool - Vendor Management',
      href: '/vendor-management',
      icon: ClipboardList,
      description: 'Centralise vendors, compliance & payments',
      badge: 'New'
    },
    {
      id: 'asset-management',
      label: 'Asset Management',
      href: '#',
      icon: Package,
      description: 'Track & manage company assets',
      badge: 'Coming Soon'
    },
    {
      id: 'it-software-tools',
      label: 'IT Software & Tools Management',
      href: '#',
      icon: Monitor,
      description: 'Manage software licenses & IT tools',
      badge: 'Coming Soon'
    },
    {
      id: 'compliance-grc',
      label: 'Compliance GRC Tools',
      href: '#',
      icon: Shield,
      description: 'Governance, Risk & Compliance management',
      badge: 'Coming Soon'
    }
  ];

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: t('navigation.home'),
      href: '/',
      icon: Home,
      description: 'Home page'
    },
    {
      id: 'services',
      label: t('navigation.services'),
      href: '#services',
      icon: Users,
      description: 'Our services',
      hasDropdown: true,
      dropdownItems: servicesDropdownItems
    },
    {
      id: 'tools',
      label: 'Tools',
      href: '#tools',
      icon: Wrench,
      description: 'Business management tools',
      hasDropdown: true,
      dropdownItems: toolsDropdownItems,
      badge: 'New'
    },
    {
      id: 'contact',
      label: t('navigation.contact'),
      href: '#contact',
      icon: MessageCircle,
      description: 'Get in touch'
    },
    {
      id: 'about',
      label: t('navigation.about'),
      href: '/about',
      icon: Award,
      description: 'About our team'
    }
  ];

  const handleNavClick = (href: string, label: string) => {
    trackUserInteraction('nav_click', 'Navigation', label);
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setToolsDropdownOpen(false);
    
    // Check if it's a page route (starts with /)
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
    } else if (isHomePage) {
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
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <NovalSquadLogo variant="dark" size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    if (item.id === 'services') setServicesDropdownOpen(true);
                    if (item.id === 'tools') setToolsDropdownOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    if (item.id === 'services') setServicesDropdownOpen(false);
                    if (item.id === 'tools') setToolsDropdownOpen(false);
                  }
                }}
              >
                <button
                  onClick={() => !item.hasDropdown && handleNavClick(item.href, item.label)}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      ((servicesDropdownOpen && item.id === 'services') || (toolsDropdownOpen && item.id === 'tools')) ? 'rotate-180' : ''
                    }`} />
                  )}
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && ((servicesDropdownOpen && item.id === 'services') || (toolsDropdownOpen && item.id === 'tools')) && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {item.dropdownItems?.map((dropdownItem: DropdownItem) => (
                          <button
                            key={dropdownItem.id}
                            onClick={() => dropdownItem.badge !== 'Coming Soon' && handleNavClick(dropdownItem.href, dropdownItem.label)}
                            disabled={dropdownItem.badge === 'Coming Soon'}
                            className={`flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                              dropdownItem.badge === 'Coming Soon' 
                                ? 'opacity-60 cursor-not-allowed' 
                                : 'hover:bg-primary/5'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <dropdownItem.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 text-sm">{dropdownItem.label}</span>
                                {dropdownItem.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs px-1.5 py-0.5 ${
                                      dropdownItem.badge === 'Coming Soon' 
                                        ? 'bg-amber-100 text-amber-700 border-amber-200' 
                                        : ''
                                    }`}
                                  >
                                    {dropdownItem.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{dropdownItem.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tooltip - only show if no dropdown */}
                {!item.hasDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap group-hover:opacity-100">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
                <div key={item.id}>
                  {!item.hasDropdown ? (
                    <button
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
                  ) : (
                    <div>
                      <button
                        onClick={() => {
                          if (item.id === 'services') setServicesDropdownOpen(!servicesDropdownOpen);
                          if (item.id === 'tools') setToolsDropdownOpen(!toolsDropdownOpen);
                        }}
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
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          (item.id === 'services' && servicesDropdownOpen) || (item.id === 'tools' && toolsDropdownOpen) ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {((item.id === 'services' && servicesDropdownOpen) || (item.id === 'tools' && toolsDropdownOpen)) && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems?.map((dropdownItem: DropdownItem) => (
                            <button
                              key={dropdownItem.id}
                              onClick={() => dropdownItem.badge !== 'Coming Soon' && handleNavClick(dropdownItem.href, dropdownItem.label)}
                              disabled={dropdownItem.badge === 'Coming Soon'}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                                dropdownItem.badge === 'Coming Soon' 
                                  ? 'opacity-60 cursor-not-allowed' 
                                  : 'hover:bg-primary/5'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <dropdownItem.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900 text-sm">{dropdownItem.label}</span>
                                  {dropdownItem.badge && (
                                    <Badge 
                                      variant="secondary" 
                                      className={`text-xs px-1.5 py-0.5 ${
                                        dropdownItem.badge === 'Coming Soon' 
                                          ? 'bg-amber-100 text-amber-700 border-amber-200' 
                                          : ''
                                      }`}
                                    >
                                      {dropdownItem.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{dropdownItem.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
