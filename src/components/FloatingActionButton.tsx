import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  X,
  ArrowUp
} from 'lucide-react';
import { trackUserInteraction } from '@/hooks/usePerformanceMonitoring';

interface FloatingActionButtonProps {
  onContactClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onContactClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    trackUserInteraction('scroll_to_top', 'FAB', 'Scroll to Top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneClick = () => {
    trackUserInteraction('phone_click', 'FAB', 'Phone Call');
    window.open('tel:+442012345678', '_self');
  };

  const handleEmailClick = () => {
    trackUserInteraction('email_click', 'FAB', 'Email');
    window.open('mailto:admin@novalsquad.com', '_self');
  };

  const handleContactClick = () => {
    trackUserInteraction('contact_click', 'FAB', 'Contact Form');
    onContactClick();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          onClick={handleScrollToTop}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col space-y-3 animate-in slide-in-from-bottom-4">
          <Button
            onClick={handleContactClick}
            variant="outline"
            size="sm"
            className="h-10 px-4 bg-white shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Form
          </Button>
          
          <Button
            onClick={handleEmailClick}
            variant="outline"
            size="sm"
            className="h-10 px-4 bg-white shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Us
          </Button>
          
          <Button
            onClick={handlePhoneClick}
            variant="outline"
            size="sm"
            className="h-10 px-4 bg-white shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isExpanded 
            ? 'bg-destructive hover:bg-destructive/90' 
            : 'bg-primary hover:bg-primary/90'
        } text-primary-foreground relative`}
        aria-label={isExpanded ? "Close menu" : "Open contact menu"}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
            >
              !
            </Badge>
          </>
        )}
      </Button>
    </div>
  );
};

export default FloatingActionButton;
