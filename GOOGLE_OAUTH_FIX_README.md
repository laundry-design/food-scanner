# 🔧 Google OAuth Policy Compliance Fix Guide

## 🚨 **Error: "Access blocked: authorisation error"**

This error occurs when your Google OAuth app doesn't comply with Google's OAuth 2.0 security policies.

## ✅ **Step-by-Step Fixes**

### **1. OAuth Consent Screen Setup**

#### **Go to Google Cloud Console:**
1. Visit: https://console.cloud.google.com/
2. Select your project: `foodapp-469816`
3. Navigate to: **APIs & Services** → **OAuth consent screen**

#### **Required Fields to Complete:**

##### **App Information:**
- ✅ **App name**: `FoodScanner` (or your app name)
- ✅ **User support email**: Your email address
- ✅ **Developer contact information**: Your email address

##### **Scopes:**
- ✅ **Add scopes**: 
  - `openid`
  - `https://www.googleapis.com/auth/userinfo.profile`
  - `https://www.googleapis.com/auth/userinfo.email`

##### **Test Users:**
- ✅ **Add test users**: Add your email address as a test user
- ✅ **Publishing status**: Keep as "Testing" for now

### **2. OAuth 2.0 Client ID Configuration**

#### **Go to Credentials:**
1. Navigate to: **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID: `367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com`
3. Click on it to edit

#### **Required Configuration:**

##### **Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:3002
http://localhost:8081
```

##### **Authorized redirect URIs:**
```
http://localhost:3000/auth
http://localhost:3002/auth
http://localhost:8081/auth
realapp://auth
```

### **3. App Verification Requirements**

#### **For Production Use:**
- ✅ **Privacy Policy URL**: Required
- ✅ **Terms of Service URL**: Required
- ✅ **App Logo**: Recommended
- ✅ **App Description**: Required

#### **For Testing (Current Status):**
- ✅ **Test Users**: Add your email
- ✅ **Scopes**: Only request necessary scopes
- ✅ **App Information**: Complete basic fields

### **4. Common Issues & Solutions**

#### **Issue: "invalid_request" Error**
**Solution**: Check redirect URI format and ensure it matches exactly

#### **Issue: "Access blocked" Error**
**Solution**: Complete OAuth consent screen and add test users

#### **Issue: "redirect_uri_mismatch" Error**
**Solution**: Verify redirect URIs in OAuth client configuration

### **5. Testing Steps**

#### **Step 1: Verify OAuth Consent Screen**
- [ ] App name is set
- [ ] User support email is set
- [ ] Developer contact email is set
- [ ] Required scopes are added
- [ ] Test users are added

#### **Step 2: Verify OAuth Client ID**
- [ ] JavaScript origins are correct
- [ ] Redirect URIs are correct
- [ ] Client ID matches your config

#### **Step 3: Test OAuth Flow**
- [ ] Try signing in with Google
- [ ] Check for new error messages
- [ ] Verify redirect works

### **6. Environment Variables**

Ensure your backend has the correct OAuth configuration:

```bash
# Backend .env file
GOOGLE_CLIENT_ID=367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### **7. Frontend Configuration**

Verify your frontend OAuth constants:

```typescript
// constants/OAuth.ts
export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: '367581443449-o1du4aq6gk2n27gqu8oleas1j130aoul.apps.googleusercontent.com',
    REDIRECT_URI: 'realapp://auth',
    // ... other config
  }
};
```

## 🎯 **Quick Fix Checklist**

- [ ] Complete OAuth consent screen
- [ ] Add test users
- [ ] Verify redirect URIs
- [ ] Check JavaScript origins
- [ ] Test OAuth flow
- [ ] Check error logs

## 📞 **Need Help?**

If issues persist after following this guide:
1. Check Google Cloud Console error logs
2. Verify all configuration fields are complete
3. Ensure redirect URIs match exactly
4. Test with a different Google account

## 🔗 **Useful Links**

- [Google OAuth 2.0 Policy](https://developers.google.com/identity/protocols/oauth2)
- [OAuth Consent Screen Setup](https://developers.google.com/identity/protocols/oauth2/openid-connect#discovery)
- [OAuth 2.0 Best Practices](https://developers.google.com/identity/protocols/oauth2/web-security)
