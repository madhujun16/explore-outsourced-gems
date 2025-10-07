import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  X,
  ArrowUp,
  Bot
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


  const handleEmailClick = () => {
    trackUserInteraction('email_click', 'FAB', 'Email');
    window.open('mailto:admin@novalsquad.com', '_self');
  };

  const handleContactClick = () => {
    trackUserInteraction('contact_click', 'FAB', 'Contact Form');
    onContactClick();
    setIsExpanded(false);
  };

  const handleChatClick = () => {
    trackUserInteraction('chat_click', 'FAB', 'Chat');
    // For now, just scroll to contact form - you can integrate a chat widget later
    onContactClick();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start space-y-3">
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          onClick={handleScrollToTop}
          size="icon"
          className="group relative h-12 w-12 rounded-full shadow-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 hover:scale-110 overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full"></div>
          
          <ArrowUp className="h-5 w-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
        </Button>
      )}

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col space-y-3 animate-in slide-in-from-bottom-4 items-start">
          <Button
            onClick={handleChatClick}
            variant="outline"
            size="sm"
            className="h-10 px-4 bg-white shadow-lg hover:bg-purple-500 hover:text-white transition-all duration-200"
          >
            <Bot className="h-4 w-4 mr-2" />
            Chat with us
          </Button>
          
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
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className={`group relative h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden ${
          isExpanded 
            ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
            : 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
        } text-white relative`}
        aria-label={isExpanded ? "Close menu" : "Open contact menu"}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full"></div>
        
        {isExpanded ? (
          <X className="h-6 w-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse z-20"
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
