import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId?: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Custom hook to track page views with Google Analytics
 * Automatically tracks route changes in React Router
 */
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Track page view
      window.gtag('config', 'G-BEBSCERBB3', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });

      // Also send a page_view event for better tracking
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });

      console.log('GA Page View Tracked:', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    } else {
      console.warn('Google Analytics (gtag) not available');
    }
  }, [location]);

  // Return utility functions for custom event tracking
  return {
    trackEvent: (eventName: string, parameters?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
        console.log('GA Event Tracked:', eventName, parameters);
      }
    },
    
    trackCustomEvent: (eventName: string, eventCategory: string, eventLabel?: string, value?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          event_category: eventCategory,
          event_label: eventLabel,
          value: value,
        });
        console.log('GA Custom Event Tracked:', {
          event: eventName,
          category: eventCategory,
          label: eventLabel,
          value: value,
        });
      }
    },

    trackConversion: (conversionId: string, parameters?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: conversionId,
          ...parameters,
        });
        console.log('GA Conversion Tracked:', conversionId, parameters);
      }
    },

    trackFormSubmission: (formName: string, success: boolean = true) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          form_name: formName,
          success: success,
          page_path: location.pathname,
        });
        console.log('GA Form Submission Tracked:', formName, success);
      }
    },

    trackButtonClick: (buttonName: string, buttonLocation?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'button',
          event_label: buttonName,
          button_location: buttonLocation,
          page_path: location.pathname,
        });
        console.log('GA Button Click Tracked:', buttonName, buttonLocation);
      }
    },

    trackFileDownload: (fileName: string, fileType?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'file_download', {
          file_name: fileName,
          file_type: fileType,
          page_path: location.pathname,
        });
        console.log('GA File Download Tracked:', fileName, fileType);
      }
    },

    trackOutboundLink: (url: string, linkText?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'outbound_link',
          event_label: url,
          link_text: linkText,
          page_path: location.pathname,
        });
        console.log('GA Outbound Link Tracked:', url, linkText);
      }
    },

    trackVideoPlay: (videoTitle: string, videoDuration?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'video_play', {
          video_title: videoTitle,
          video_duration: videoDuration,
          page_path: location.pathname,
        });
        console.log('GA Video Play Tracked:', videoTitle, videoDuration);
      }
    },

    trackSearch: (searchTerm: string, searchResults?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'search', {
          search_term: searchTerm,
          search_results: searchResults,
          page_path: location.pathname,
        });
        console.log('GA Search Tracked:', searchTerm, searchResults);
      }
    },
  };
};

export default useGoogleAnalytics;

