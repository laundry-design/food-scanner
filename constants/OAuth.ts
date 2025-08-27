// OAuth Configuration
// Update these values with your actual OAuth credentials

export const OAUTH_CONFIG = {
  // Google OAuth
  GOOGLE: {
    CLIENT_ID: '367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com',
    CLIENT_SECRET: 'your-google-client-secret', // Not needed for mobile apps
    REDIRECT_URI: 'realapp://auth',
    PROJECT_ID: 'foodapp-469816',
  },
  
  // Apple OAuth
  APPLE: {
    CLIENT_ID: 'com.vinayakaryahey.real-app', // iOS bundle identifier
    TEAM_ID: 'your-apple-team-id',
    KEY_ID: 'your-apple-key-id',
    PRIVATE_KEY: 'your-apple-private-key',
    REDIRECT_URI: 'realapp://auth',
  },
  
  // App Scheme (for deep linking)
  APP_SCHEME: 'realapp',
};

// Development vs Production configuration
export const isDevelopment = __DEV__;

export const getOAuthConfig = () => {
  if (isDevelopment) {
    return {
      ...OAUTH_CONFIG,
      // Override with development credentials if needed
      GOOGLE: {
        ...OAUTH_CONFIG.GOOGLE,
        CLIENT_ID: '367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com',
      },
      APPLE: {
        ...OAUTH_CONFIG.APPLE,
        CLIENT_ID: 'com.vinayakaryahey.real-app',
      },
    };
  }
  
  return OAUTH_CONFIG;
};
