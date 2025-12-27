import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NovalSquadLogo from './NovalSquadLogo';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  Globe,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';

// Types
interface LinkItem {
  name: string;
  href: string;
}

interface SocialLinkItem {
  name: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

// Static data outside component to prevent re-creation on every render
const SERVICE_LINKS: LinkItem[] = [
  { name: 'Dedicated Staff', href: '/dedicated-staff' },
  { name: 'AI Services', href: '/ai-services' },
  { name: 'Vendor Management', href: '/vendor-management' },
  { name: 'Accounting & Finance', href: '/dedicated-staff#services' },
  { name: 'IT Helpdesk', href: '/dedicated-staff#services' }
];

const SOCIAL_LINKS: SocialLinkItem[] = [
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://linkedin.com/company/novalsquad', 
    color: 'hover:bg-blue-600 hover:text-white' 
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    href: 'https://twitter.com/novalsquad', 
    color: 'hover:bg-blue-400 hover:text-white' 
  },
  { 
    name: 'Facebook', 
    icon: Facebook, 
    href: 'https://facebook.com/novalsquadsolutions', 
    color: 'hover:bg-blue-700 hover:text-white' 
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://instagram.com/novalsquad_solutions', 
    color: 'hover:bg-pink-600 hover:text-white' 
  }
];

const COMPANY_EMAIL = 'admin@novalsquad.com';
const COMPANY_LOCATION = 'Bangalore, Karnataka, India';
const COMPANY_NAME = 'NOVAL TECHNOLOGIES PRIVATE LIMITED';
const COMPANY_CIN = 'U78300KA2025PTC210177';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Memoize translated links to prevent re-creation on every render
  const companyLinks = useMemo<LinkItem[]>(() => [
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.contact'), href: '/#contact' },
    { name: 'Careers', href: '/#contact' },
    { name: 'Blog', href: '/blog' }
  ], [t]);

  const legalLinks = useMemo<LinkItem[]>(() => [
    { name: t('footer.links.privacy'), href: '/privacy-policy' },
    { name: t('footer.links.terms'), href: '/terms-conditions' },
    { name: 'GDPR Compliance', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/privacy-policy' }
  ], [t]);

  return (
    <footer className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border-t-2 border-indigo-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <NovalSquadLogo variant="dark" size="lg" />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              {t('footer.tagline') || 'Your trusted partner for GDPR-compliant outsourcing solutions. Scale faster with dedicated staff, AI services, and digital transformation expertise.'}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${COMPANY_EMAIL}`} 
                className="flex items-center text-gray-700 hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 group-hover:bg-primary group-hover:shadow-md transition-all">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <span className="text-sm font-medium">{COMPANY_EMAIL}</span>
              </a>
              <div className="flex items-start text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium mt-2">{COMPANY_LOCATION}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Serving clients globally</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-primary ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-5 flex items-center">
              <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-5 flex items-center">
              <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-5 flex items-center">
              <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-indigo-200 bg-white/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold text-gray-800">
                {COMPANY_NAME}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                CIN: {COMPANY_CIN}
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-700 font-medium">
                © {currentYear} NovalSquad. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Made with love in India | Serving clients worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

