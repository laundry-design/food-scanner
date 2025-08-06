import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useOnboardingStore } from '@/stores/onboardingStore';
import AuthScreen from './auth/AuthScreen';
import OnboardingFlow from './OnboardingFlow';
import NewOnboardingFlow from './onboarding/NewOnboardingFlow';
import OnboardingIntro from './onboarding/OnboardingIntro';
import { Colors } from '@/constants/Colors';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showOnboardingIntro, setShowOnboardingIntro] = useState(false);

  const { 
    user: authUser, 
    token, 
    isAuthenticated, 
    checkAuth, 
    setLoading 
  } = useAuthStore();
  
  const { 
    user: localUser, 
    isOnboardingCompleted, 
    syncWithAuthUser, 
    initializeUser 
  } = useUserStore();
  
  const { isOnboardingActive } = useOnboardingStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Check if user has a valid token
      const isAuthValid = await checkAuth();
      
      if (isAuthValid && authUser) {
        // User is authenticated, sync with local user store
        syncWithAuthUser(authUser);
        
        // Check if onboarding is completed
        if (authUser.isOnboardingCompleted) {
          // User is fully set up, show main app
          setShowAuth(false);
          setShowOnboarding(false);
        } else {
          // User needs to complete onboarding
          setShowAuth(false);
          setShowOnboarding(true);
        }
      } else {
        // No valid token, show authentication screen
        setShowAuth(true);
        setShowOnboarding(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // On error, show auth screen
      setShowAuth(true);
      setShowOnboarding(false);
    } finally {
      setIsInitializing(false);
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    if (authUser) {
      syncWithAuthUser(authUser);
      
      if (authUser.isOnboardingCompleted) {
        // User is fully set up
        setShowAuth(false);
        setShowOnboarding(false);
      } else {
        // User needs to complete onboarding
        setShowAuth(false);
        setShowOnboarding(true);
      }
    }
  };

  const handleStartOnboarding = () => {
    setShowAuth(false);
    setShowOnboardingIntro(true);
  };

  const handleOnboardingIntroComplete = () => {
    setShowOnboardingIntro(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (onboardingData: any) => {
    // Update user store with onboarding data
    if (authUser) {
      syncWithAuthUser({
        ...authUser,
        ...onboardingData,
        isOnboardingCompleted: true,
      });
    }
    setShowOnboarding(false);
    setShowAuth(false);
  };

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Show authentication screen
  if (showAuth) {
    return (
      <AuthScreen
        onLoginSuccess={handleLoginSuccess}
        onStartOnboarding={handleStartOnboarding}
      />
    );
  }

  // Show onboarding intro
  if (showOnboardingIntro) {
    return (
      <OnboardingIntro onNext={handleOnboardingIntroComplete} />
    );
  }

  // Show onboarding flow
  if (showOnboarding || isOnboardingActive) {
    return (
      <NewOnboardingFlow onComplete={handleOnboardingComplete} />
    );
  }

  // Show main app
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
}); 