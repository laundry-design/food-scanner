# OAuth Implementation in FoodScanner Backend

This document describes the OAuth authentication implementation for Google and Apple Sign-In in the FoodScanner backend.

## Overview

The backend now supports three authentication methods:
1. **Email/Password** - Traditional authentication with bcrypt hashing
2. **Google OAuth** - OAuth 2.0 with Google using google-auth-library
3. **Apple OAuth** - OAuth 2.0 with Apple (basic implementation)

## Architecture

### 1. Authentication Flow

```
Client App → OAuth Provider (Google/Apple) → Backend → Database → JWT Tokens
```

### 2. Components

- **AuthService**: Core authentication logic
- **AuthController**: HTTP request handling
- **User Model**: Database schema with OAuth fields
- **Validation**: Request validation using Zod
- **Routes**: OAuth endpoints

## Implementation Details

### Google OAuth

#### Dependencies
```bash
npm install google-auth-library
```

#### Configuration
```typescript
// config/environment.ts
GOOGLE_CLIENT_ID: 'your-google-client-id.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET: 'your-google-client-secret' // Optional for mobile apps
```

#### Flow
1. Client sends Google ID token to `/api/v1/auth/google`
2. Backend verifies token with Google
3. Extracts user information (name, email, etc.)
4. Creates/updates user in database
5. Returns JWT access and refresh tokens

#### Code Example
```typescript
// services/authService.ts
static async authenticateWithGoogle(googleAuth: GoogleAuthRequest): Promise<LoginResponse> {
  // Verify Google token
  const googleUser = await this.verifyGoogleToken(googleAuth.idToken);
  
  // Find or create user
  let user = await models.User.findOne({ where: { email: googleUser.email } });
  
  if (!user) {
    user = await models.User.create({
      name: googleUser.name,
      email: googleUser.email,
      googleId: googleUser.sub,
      authProvider: 'google',
      // ... other fields
    });
  }
  
  // Generate JWT tokens
  const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.name);
  
  return { success: true, data: { user, accessToken, refreshToken } };
}
```

### Apple OAuth

#### Configuration
```typescript
// config/environment.ts
APPLE_CLIENT_ID: 'com.yourcompany.yourapp'
APPLE_TEAM_ID: 'your-apple-team-id'
APPLE_KEY_ID: 'your-apple-key-id'
```

#### Flow
1. Client sends Apple ID token to `/api/v1/auth/apple`
2. Backend processes token (basic implementation)
3. Creates/updates user in database
4. Returns JWT tokens

**Note**: Apple OAuth implementation is basic. In production, implement proper JWT verification.

## Database Schema

### User Table Updates

```sql
-- New OAuth fields
ALTER TABLE users ADD COLUMN auth_provider ENUM('email', 'google', 'apple') DEFAULT 'email';
ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN apple_id VARCHAR(255) UNIQUE;

-- Make password_hash optional for OAuth users
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Add indexes for OAuth IDs
CREATE UNIQUE INDEX idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;
CREATE UNIQUE INDEX idx_users_apple_id ON users(apple_id) WHERE apple_id IS NOT NULL;
```

### Migration File
```javascript
// database/migrations/001_add_oauth_fields.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add OAuth fields
    await queryInterface.addColumn('users', 'auth_provider', {
      type: Sequelize.ENUM('email', 'google', 'apple'),
      defaultValue: 'email',
      allowNull: false,
    });
    
    await queryInterface.addColumn('users', 'google_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    await queryInterface.addColumn('users', 'apple_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });
    
    // Make password_hash optional
    await queryInterface.changeColumn('users', 'password_hash', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    // Revert changes
    await queryInterface.removeColumn('users', 'auth_provider');
    await queryInterface.removeColumn('users', 'google_id');
    await queryInterface.removeColumn('users', 'apple_id');
    
    await queryInterface.changeColumn('users', 'password_hash', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  }
};
```

## API Endpoints

### Google OAuth
```
POST /api/v1/auth/google
Content-Type: application/json

{
  "idToken": "google_id_token_here"
}
```

### Apple OAuth
```
POST /api/v1/auth/apple
Content-Type: application/json

{
  "idToken": "apple_id_token_here"
}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "User Name",
      "email": "user@example.com",
      "authProvider": "google",
      "isOnboardingCompleted": false,
      // ... other user fields
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

### 1. Token Verification
- Google ID tokens verified with Google's servers
- JWT tokens signed with secure secrets
- Refresh token rotation

### 2. Rate Limiting
- OAuth endpoints protected by rate limiting
- Prevents brute force attacks

### 3. Input Validation
- All OAuth requests validated with Zod schemas
- Prevents malformed requests

### 4. Error Handling
- Comprehensive error codes and messages
- Secure error responses (no sensitive data leakage)

## Environment Variables

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_CLIENT_ID=com.yourcompany.yourapp
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

## Testing

### 1. Development Testing
```bash
# Start backend
npm run dev

# Test Google OAuth endpoint
curl -X POST http://localhost:3002/api/v1/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken": "test_token"}'
```

### 2. Production Testing
- Use real OAuth tokens from Google/Apple
- Test with actual user accounts
- Verify database updates
- Test error scenarios

## Error Codes

| Code | Description |
|------|-------------|
| `GOOGLE_AUTH_001` | Invalid Google token |
| `GOOGLE_AUTH_002` | Google email not verified |
| `AUTH_001` | Invalid credentials |
| `AUTH_002` | OAuth user trying email login |

## Frontend Integration

### 1. Update API Service
```typescript
// services/api.ts
loginWithGoogle: async () => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: 'real_google_token' }),
  });
  return response.json();
}
```

### 2. Handle OAuth Response
```typescript
const result = await loginWithGoogle();
if (result.success) {
  // Store tokens
  // Navigate to app
} else {
  // Handle error
}
```

## Deployment Considerations

### 1. Environment Variables
- Set production OAuth credentials
- Use strong JWT secrets
- Configure CORS origins

### 2. Database Migration
```bash
# Run migration in production
npm run db:migrate
```

### 3. SSL/TLS
- OAuth endpoints must use HTTPS
- Configure SSL certificates
- Enable secure cookies

### 4. Monitoring
- Log OAuth attempts
- Monitor error rates
- Track user creation

## Troubleshooting

### Common Issues

1. **Invalid Google Token**
   - Check client ID configuration
   - Verify token format
   - Check token expiration

2. **Database Errors**
   - Run database migration
   - Check field constraints
   - Verify database connection

3. **CORS Issues**
   - Configure allowed origins
   - Check frontend URL
   - Verify credentials setting

### Debug Steps

1. Check server logs
2. Verify environment variables
3. Test database connection
4. Check OAuth provider configuration
5. Validate request format

## Future Enhancements

1. **Apple OAuth Improvement**
   - Implement proper JWT verification
   - Add Apple public key validation
   - Handle Apple's privacy features

2. **Additional Providers**
   - Facebook OAuth
   - Twitter OAuth
   - GitHub OAuth

3. **Enhanced Security**
   - OAuth state parameter
   - PKCE implementation
   - Token refresh automation

4. **Analytics**
   - OAuth provider usage tracking
   - User conversion metrics
   - Authentication success rates

## Support

For issues and questions:
1. Check server logs
2. Verify OAuth configuration
3. Test with OAuth provider tools
4. Review security best practices
5. Check API documentation

## Resources

- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In](https://developer.apple.com/sign-in-with-apple/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [OAuth 2.0 Security](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)
