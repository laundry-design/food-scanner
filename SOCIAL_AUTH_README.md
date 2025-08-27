# Social Authentication Setup Guide

This guide explains how to set up Google and Apple authentication for your Food Scanner app.

## Overview

The app now supports three authentication methods:
1. **Email/Password** - Traditional authentication
2. **Google Sign-In** - OAuth 2.0 with Google
3. **Apple Sign-In** - OAuth 2.0 with Apple (iOS only)

## Prerequisites

- Expo development environment
- Google Cloud Console account
- Apple Developer account (for Apple Sign-In)
- React Native development setup

## Google Authentication Setup

### 1. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Add authorized redirect URIs:
   - `https://auth.expo.io/@your-expo-username/your-app-slug`
   - `your-app-scheme://auth` (for production)
7. Copy the Client ID and Client Secret

### 2. Update Configuration

Update `constants/OAuth.ts`:

```typescript
export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: 'your-actual-google-client-id.apps.googleusercontent.com',
    CLIENT_SECRET: 'your-actual-google-client-secret',
    REDIRECT_URI: 'your-app-scheme://auth',
  },
  // ... other config
};
```

### 3. Expo Configuration

Add to `app.json`:

```json
{
  "expo": {
    "scheme": "your-app-scheme",
    "android": {
      "package": "com.yourcompany.yourapp"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    }
  }
}
```

## Apple Authentication Setup

### 1. Apple Developer Console Configuration

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Create a new App ID or select existing one
4. Enable "Sign In with Apple" capability
5. Go to "Keys" → "Create a new key"
6. Enable "Sign In with Apple"
7. Download the private key (.p8 file)
8. Note the Key ID and Team ID

### 2. Update Configuration

Update `constants/OAuth.ts`:

```typescript
export const OAUTH_CONFIG = {
  APPLE: {
    CLIENT_ID: 'com.yourcompany.yourapp',
    TEAM_ID: 'your-apple-team-id',
    KEY_ID: 'your-apple-key-id',
    PRIVATE_KEY: 'your-apple-private-key-content',
    REDIRECT_URI: 'your-app-scheme://auth',
  },
  // ... other config
};
```

### 3. iOS Configuration

Add to `ios/yourapp/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>auth</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>your-app-scheme</string>
    </array>
  </dict>
</array>
```

## Backend Integration

### 1. Add Social Auth Endpoints

Add these endpoints to your backend:

```typescript
// POST /api/auth/google
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  // Verify Google ID token
  // Create or update user
  // Return JWT tokens
});

// POST /api/auth/apple
router.post('/apple', async (req, res) => {
  const { idToken } = req.body;
  // Verify Apple ID token
  // Create or update user
  // Return JWT tokens
});
```

### 2. Update API Service

Replace mock API calls in `services/api.ts` with real backend calls:

```typescript
loginWithGoogle: async () => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  return response.json();
},
```

## Testing

### 1. Development Testing

1. Use Expo Go app for testing
2. Test with mock API first
3. Verify OAuth flow works correctly
4. Test error handling

### 2. Production Testing

1. Test with real OAuth credentials
2. Verify token validation
3. Test user creation/update flow
4. Test error scenarios

## Security Considerations

### 1. Token Storage

- Store tokens securely using AsyncStorage
- Implement token refresh logic
- Clear tokens on logout

### 2. OAuth Security

- Use HTTPS for all OAuth calls
- Validate OAuth tokens on backend
- Implement proper error handling
- Use PKCE for OAuth 2.0

### 3. User Data

- Only request necessary OAuth scopes
- Handle user data securely
- Implement proper user privacy controls

## Troubleshooting

### Common Issues

1. **Redirect URI Mismatch**
   - Ensure redirect URIs match exactly
   - Check for typos in configuration

2. **OAuth Scope Issues**
   - Verify requested scopes are enabled
   - Check API permissions

3. **Platform-Specific Issues**
   - Apple Sign-In only works on iOS
   - Android requires different setup

4. **Token Validation Errors**
   - Check backend token verification
   - Verify OAuth configuration

### Debug Steps

1. Check console logs for errors
2. Verify OAuth configuration
3. Test OAuth flow step by step
4. Check network requests
5. Verify redirect URIs

## Production Deployment

### 1. Environment Variables

Use environment variables for sensitive data:

```typescript
export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  // ... other config
};
```

### 2. App Store Requirements

- Follow Apple's App Store guidelines
- Implement proper privacy policy
- Handle user data deletion requests

### 3. Google Play Requirements

- Follow Google Play policies
- Implement proper OAuth consent
- Handle user data requests

## Support

For issues and questions:
1. Check Expo documentation
2. Review OAuth provider documentation
3. Check React Native community forums
4. Review security best practices

## Additional Resources

- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)
