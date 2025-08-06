import { useOnboardingStore } from '@/stores/onboardingStore';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';

export const useAppStores = () => {
  const userStore = useUserStore();
  const onboardingStore = useOnboardingStore();
  const authStore = useAuthStore();

  return {
    // User store
    user: userStore.user,
    isLoading: userStore.isLoading,
    isOnboardingCompleted: userStore.isOnboardingCompleted,
    initializeUser: userStore.initializeUser,
    completeUserOnboarding: userStore.completeOnboarding,
    updateUser: userStore.updateUser,
    resetUser: userStore.resetUser,
    setLoading: userStore.setLoading,

    // Onboarding store
    currentStep: onboardingStore.currentStep,
    onboardingData: onboardingStore.onboardingData,
    isOnboardingActive: onboardingStore.isOnboardingActive,
    setCurrentStep: onboardingStore.setCurrentStep,
    updateOnboardingData: onboardingStore.updateOnboardingData,
    resetOnboardingData: onboardingStore.resetOnboardingData,
    startOnboarding: onboardingStore.startOnboarding,
    completeOnboarding: onboardingStore.completeOnboarding,
    goToNextStep: onboardingStore.goToNextStep,
    goToPreviousStep: onboardingStore.goToPreviousStep,
    canProceedToNext: onboardingStore.canProceedToNext,

    // Combined actions
    handleOnboardingComplete: async () => {
      await userStore.completeOnboarding(onboardingStore.onboardingData);
      onboardingStore.completeOnboarding();
      onboardingStore.resetOnboardingData();
    },

    resetAndStartOnboarding: async () => {
      await userStore.resetUser();
      onboardingStore.startOnboarding();
    },

    // Auth store
    authUser: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    authIsLoading: authStore.isLoading,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    checkAuth: authStore.checkAuth,
    updateAuthUser: authStore.updateUser,
  };
}; 