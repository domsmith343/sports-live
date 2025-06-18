// App Configuration
export const config = {
  // API Settings
  api: {
    useRealData: process.env.NEXT_PUBLIC_USE_REAL_DATA === 'true' || process.env.NODE_ENV === 'development',
    baseUrl: process.env.NEXT_PUBLIC_NFL_API_URL || 'https://site.api.espn.com/apis',
    apiKey: process.env.NEXT_PUBLIC_NFL_API_KEY,
    timeout: 10000,
  },

  // Data Service Settings
  dataService: {
    fallbackToPlaceholder: process.env.NEXT_PUBLIC_FALLBACK_TO_PLACEHOLDER !== 'false',
    cacheDuration: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300000'), // 5 minutes
  },

  // News API Settings
  news: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
    enabled: !!process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },

  // App Settings
  app: {
    name: 'Gridiron Facts',
    version: '1.0.0',
    description: 'Real-time NFL scores, stats, and news without opinions.',
  },
};

// Helper function to check if we're in development
export const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to check if we should use real data
export const shouldUseRealData = config.api.useRealData || isDevelopment;

// Helper function to get API configuration
export const getAPIConfig = () => ({
  baseUrl: config.api.baseUrl,
  apiKey: config.api.apiKey,
  timeout: config.api.timeout,
}); 