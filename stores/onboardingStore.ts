import { create } from 'zustand';

export interface OnboardingData {
  plan: string;
  age: number;
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  gender: string;
  fitnessGoal: string;
  gymActivity: string;
  dietFocus: string;
}

interface OnboardingState {
  currentStep: number;
  onboardingData: OnboardingData;
  isOnboardingActive: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateOnboardingData: (key: keyof OnboardingData, value: any) => void;
  resetOnboardingData: () => void;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canProceedToNext: () => boolean;
}

const initialOnboardingData: OnboardingData = {
  plan: '',
  age: 25,
  weight: 60,
  weightUnit: 'KG',
  height: 170,
  heightUnit: 'CM',
  gender: '',
  fitnessGoal: '',
  gymActivity: '',
  dietFocus: ''
};

const TOTAL_STEPS = 8;

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 1,
  onboardingData: initialOnboardingData,
  isOnboardingActive: false,

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  updateOnboardingData: (key: keyof OnboardingData, value: any) => {
    set((state) => ({
      onboardingData: {
        ...state.onboardingData,
        [key]: value
      }
    }));
  },

  resetOnboardingData: () => {
    set({
      currentStep: 1,
      onboardingData: initialOnboardingData,
      isOnboardingActive: false
    });
  },

  startOnboarding: () => {
    set({ isOnboardingActive: true, currentStep: 1 });
  },

  completeOnboarding: () => {
    set({ isOnboardingActive: false });
  },

  goToNextStep: () => {
    const { currentStep } = get();
    if (currentStep < TOTAL_STEPS) {
      set({ currentStep: currentStep + 1 });
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  canProceedToNext: () => {
    const { currentStep, onboardingData } = get();
    
    switch (currentStep) {
      case 1: // Plan
        return onboardingData.plan !== '';
      case 2: // Age
        return onboardingData.age > 0;
      case 3: // Weight
        return onboardingData.weight > 0;
      case 4: // Height
        return onboardingData.height > 0;
      case 5: // Gender
        return onboardingData.gender !== '';
      case 6: // Fitness Goal
        return onboardingData.fitnessGoal !== '';
      case 7: // Gym Activity
        return onboardingData.gymActivity !== '';
      case 8: // Diet Focus
        return onboardingData.dietFocus !== '';
      default:
        return false;
    }
  }
})); 