import { ApiResponse } from './common';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface AppleAuthRequest {
  idToken: string;
}

export interface LoginResponse extends ApiResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      plan: string;
      age?: number;
      weight?: number;
      weightUnit: string;
      height?: number;
      heightUnit: string;
      gender?: string;
      fitnessGoal?: string;
      gymActivity?: string;
      dietFocus?: string;
      isOnboardingCompleted: boolean;
      authProvider?: 'email' | 'google' | 'apple';
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse extends ApiResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      isOnboardingCompleted: boolean;
      authProvider?: 'email' | 'google' | 'apple';
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse extends ApiResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LogoutResponse extends ApiResponse {
  message: string;
}

export interface VerifyTokenResponse extends ApiResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      plan: string;
      age?: number;
      weight?: number;
      weightUnit: string;
      height?: number;
      heightUnit: string;
      gender?: string;
      fitnessGoal?: string;
      gymActivity?: string;
      dietFocus?: string;
      isOnboardingCompleted: boolean;
      authProvider?: 'email' | 'google' | 'apple';
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
  iat: number;
  exp: number;
}

export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  picture: string;
  locale: string;
}

export interface AppleUserInfo {
  sub: string;
  email: string;
  email_verified: string;
  is_private_email: string;
  name?: {
    firstName: string;
    lastName: string;
  };
}
