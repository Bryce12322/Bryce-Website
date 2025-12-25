import { track } from '@vercel/analytics/react';

// Initialize Analytics (handled by <Analytics /> component in App.tsx)
export const initAnalytics = () => {
  // No-op for Vercel Analytics as it is initialized via component
};

// Track a custom event
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Vercel Analytics track function
    track(eventName, properties);
    
    // Optional: Log to console in development
    if (import.meta.env.DEV) {
       console.log(`[Analytics] Event: ${eventName}`, properties);
    }
  }
};

// Hook for using analytics
export const useAnalytics = () => {
  return {
    trackEvent,
  };
};
