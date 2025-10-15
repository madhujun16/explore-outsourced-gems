import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // Send to analytics
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(entry.startTime),
                event_category: 'Web Vitals'
              });
            }
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Fallback for browsers that don't support LCP
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fid = entry.processingStart - entry.startTime;
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(fid),
                event_category: 'Web Vitals'
              });
            }
          }
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support FID
        console.debug('FID observation not supported');
      }

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        }
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals'
          });
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Fallback for browsers that don't support CLS
        console.debug('CLS observation not supported');
      }

      return () => {
        observer.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  // Track page load time
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            value: loadTime,
            event_category: 'Performance'
          });
        }
      });
    }
  }, []);
};

// Track user interactions
export const trackUserInteraction = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Form',
      event_label: formName,
      value: success ? 1 : 0
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'Engagement',
      value: depth
    });
  }
};
