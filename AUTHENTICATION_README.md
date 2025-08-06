# Authentication System

This document describes the authentication system implemented in the Food Scanner app.

## Overview

The authentication system provides:
- User registration and login
- Token-based authentication
- Automatic token validation
- Integration with onboarding flow
- Persistent authentication state

## Architecture

### Stores

1. **AuthStore** (`stores/authStore.ts`)
   - Manages authentication state (user, token, isAuthenticated)
   - Handles login, register, logout operations
   - Validates tokens with API
   - Persists authentication data using AsyncStorage

2. **UserStore** (`stores/userStore.ts`)
   - Manages local user data and preferences
   - Syncs with authenticated user data
   - Handles onboarding completion
   - Stores user profile information

3. **OnboardingStore** (`stores/onboardingStore.ts`)
   - Manages onboarding flow state
   - Handles step navigation and data collection

### Components

1. **AuthWrapper** (`components/AuthWrapper.tsx`)
   - Main authentication flow controller
   - Checks authentication status on app start
   - Routes users to appropriate screens (auth, onboarding, or main app)

2. **AuthScreen** (`components/auth/AuthScreen.tsx`)
   - Login and registration form
   - Option to start onboarding without account
   - Handles form validation and API calls

3. **OnboardingFlow** (`components/OnboardingFlow.tsx`)
   - Multi-step onboarding process
   - Collects user preferences and goals
   - Integrates with user store

## Flow

### App Startup
1. App loads with splash screen
2. AuthWrapper checks for stored token
3. If token exists, validates with API
4. If valid token and onboarding complete → Main app
5. If valid token but onboarding incomplete → Onboarding
6. If no token or invalid → Authentication screen

### Authentication
1. User can login with existing credentials
2. User can register new account
3. User can start onboarding without account
4. On successful login/register, syncs user data
5. Routes to onboarding if needed, or main app

### Onboarding
1. Collects user preferences (plan, age, weight, height, etc.)
2. Saves data to user store
3. Marks onboarding as complete
4. Routes to main app

## API Integration

### Mock API (Development)
The app currently uses a mock API service (`services/api.ts`) for development:

**Test Credentials:**
- Email: `john@example.com`, Password: `password123` (onboarding completed)
- Email: `jane@example.com`, Password: `password123` (onboarding incomplete)

### Real API Integration
To integrate with a real API:

1. Replace `services/api.ts` with actual API calls
2. Update `API_BASE_URL` in auth store
3. Ensure API endpoints match:
   - `POST /auth/login`
   - `POST /auth/register`
   - `GET /auth/verify`

## Usage

### Authentication Hooks
```typescript
import { useAppStores } from '@/hooks/useAppStores';

const { 
  authUser, 
  isAuthenticated, 
  login, 
  register, 
  logout 
} = useAppStores();
```

### User Data
```typescript
import { useUserStore } from '@/stores/userStore';

const { user, isOnboardingCompleted, updateUser } = useUserStore();
```

### Onboarding
```typescript
import { useOnboardingStore } from '@/stores/onboardingStore';

const { 
  currentStep, 
  onboardingData, 
  startOnboarding, 
  completeOnboarding 
} = useOnboardingStore();
```

## Security Features

- Tokens stored securely in AsyncStorage
- Automatic token validation on app start
- Automatic logout on invalid tokens
- Form validation and error handling
- Secure password handling

## Testing

### Development Testing
1. Use mock credentials to test login
2. Test registration with new email
3. Test onboarding flow completion
4. Test logout functionality
5. Test token persistence across app restarts

### Production Testing
1. Replace mock API with real endpoints
2. Test with real user accounts
3. Verify token security
4. Test error handling scenarios

## Future Enhancements

- Biometric authentication
- Social login (Google, Apple)
- Password reset functionality
- Email verification
- Two-factor authentication
- Session management
- Offline support

## Troubleshooting

### Common Issues

1. **Token not persisting**
   - Check AsyncStorage permissions
   - Verify storage configuration in stores

2. **Onboarding not completing**
   - Check user store sync with auth store
   - Verify onboarding data validation

3. **API calls failing**
   - Check network connectivity
   - Verify API endpoint configuration
   - Check request/response format

### Debug Mode
Enable debug logging by adding console.log statements in:
- `stores/authStore.ts` - Authentication operations
- `components/AuthWrapper.tsx` - Flow routing
- `services/api.ts` - API calls 