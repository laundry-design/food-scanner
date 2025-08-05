import { useOnboardingStore } from '@/stores/onboardingStore';
import { useUserStore } from '@/stores/userStore';

export const useAppStores = () => {
  const userStore = useUserStore();
  const onboardingStore = useOnboardingStore();

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
  };
}; 