import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { getOAuthConfig } from '@/constants/OAuth';

export interface SocialAuthResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    authProvider: 'google' | 'apple';
  };
  idToken?: string; // Add ID token for backend verification
  error?: string;
}

export class SocialAuthService {
  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<SocialAuthResult> {
    try {
      const config = getOAuthConfig();
      
      // Create discovery document for Google
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };

      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: config.GOOGLE.CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: config.GOOGLE.REDIRECT_URI,
        responseType: AuthSession.ResponseType.Code,
        additionalParameters: {},
        extraParams: {},
      });

      // Perform auth request
      const result = await request.promptAsync(discovery);

      if (result.type === 'success') {
        // Exchange code for token
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: config.GOOGLE.CLIENT_ID,
            code: result.params.code,
            redirectUri: config.GOOGLE.REDIRECT_URI,
            extraParams: {
              code_verifier: request.codeChallenge!,
            },
          },
          discovery
        );

        if (tokenResult.accessToken) {
          // Get user info from Google
          const userInfo = await this.getGoogleUserInfo(tokenResult.accessToken);
          
          return {
            success: true,
            user: {
              id: userInfo.id,
              name: userInfo.name,
              email: userInfo.email,
              authProvider: 'google',
            },
            idToken: tokenResult.accessToken, // Return the access token as ID token
          };
        }
      }

      return {
        success: false,
        error: 'Google authentication was cancelled or failed',
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Google authentication failed',
      };
    }
  }

  /**
   * Sign in with Apple
   */
  static async signInWithApple(): Promise<SocialAuthResult> {
    try {
      // Apple Sign-In is only available on iOS
      if (Platform.OS !== 'ios') {
        return {
          success: false,
          error: 'Apple Sign-In is only available on iOS',
        };
      }

      const config = getOAuthConfig();

      // Create auth request for Apple
      const request = new AuthSession.AuthRequest({
        clientId: config.APPLE.CLIENT_ID,
        scopes: ['name', 'email'],
        redirectUri: config.APPLE.REDIRECT_URI,
        responseType: AuthSession.ResponseType.Code,
        additionalParameters: {
          response_mode: 'form_post',
        },
        extraParams: {},
      });

      // Perform auth request
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
        tokenEndpoint: 'https://appleid.apple.com/auth/token',
      });

      if (result.type === 'success') {
        // Exchange code for token
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: config.APPLE.CLIENT_ID,
            code: result.params.code,
            redirectUri: config.APPLE.REDIRECT_URI,
            extraParams: {
              code_verifier: request.codeChallenge!,
            },
          },
          {
            authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
            tokenEndpoint: 'https://appleid.apple.com/auth/token',
          }
        );

        if (tokenResult.accessToken) {
          // Get user info from Apple
          const userInfo = await this.getAppleUserInfo(tokenResult.accessToken);
          
          return {
            success: true,
            user: {
              id: userInfo.sub,
              name: userInfo.name || 'Apple User',
              email: userInfo.email,
              authProvider: 'apple',
            },
            idToken: tokenResult.accessToken, // Return the access token as ID token
          };
        }
      }

      return {
        success: false,
        error: 'Apple authentication was cancelled or failed',
      };
    } catch (error) {
      console.error('Apple sign-in error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Apple authentication failed',
      };
    }
  }

  /**
   * Get user info from Google
   */
  private static async getGoogleUserInfo(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Google user info');
    }

    return response.json();
  }

  /**
   * Get user info from Apple
   */
  private static async getAppleUserInfo(accessToken: string) {
    // Apple provides user info in the ID token
    // For simplicity, we'll return a basic structure
    // In production, you should decode the JWT token
    return {
      sub: `apple_${Date.now()}`,
      email: 'appleuser@example.com',
      name: 'Apple User',
    };
  }
}
