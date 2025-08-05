import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  id?: string;
  name?: string;
  email?: string;
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
  isOnboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  isOnboardingCompleted: boolean;
  
  // Actions
  initializeUser: () => Promise<void>;
  completeOnboarding: (onboardingData: Partial<User>) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  resetUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const defaultUser: User = {
  plan: '',
  age: 25,
  weight: 60,
  weightUnit: 'KG',
  height: 170,
  heightUnit: 'CM',
  gender: '',
  fitnessGoal: '',
  gymActivity: '',
  dietFocus: '',
  isOnboardingCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isOnboardingCompleted: false,

      initializeUser: async () => {
        set({ isLoading: true });
        try {
          const { user } = get();
          
          // If no user exists, create a new one
          if (!user) {
            const newUser: User = {
              ...defaultUser,
              id: `user_${Date.now()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            set({ 
              user: newUser, 
              isOnboardingCompleted: false,
              isLoading: false 
            });
          } else {
            // User exists, check if onboarding is completed
            set({ 
              isOnboardingCompleted: user.isOnboardingCompleted,
              isLoading: false 
            });
          }
        } catch (error) {
          console.error('Error initializing user:', error);
          set({ isLoading: false });
        }
      },

      completeOnboarding: async (onboardingData: Partial<User>) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user found');

          const updatedUser: User = {
            ...user,
            ...onboardingData,
            isOnboardingCompleted: true,
            updatedAt: new Date().toISOString(),
          };

          set({ 
            user: updatedUser, 
            isOnboardingCompleted: true 
          });
        } catch (error) {
          console.error('Error completing onboarding:', error);
        }
      },

      updateUser: async (updates: Partial<User>) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user found');

          const updatedUser: User = {
            ...user,
            ...updates,
            updatedAt: new Date().toISOString(),
          };

          set({ user: updatedUser });
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },

      resetUser: async () => {
        try {
          const newUser: User = {
            ...defaultUser,
            id: `user_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({ 
            user: newUser, 
            isOnboardingCompleted: false 
          });
        } catch (error) {
          console.error('Error resetting user:', error);
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        isOnboardingCompleted: state.isOnboardingCompleted 
      }),
    }
  )
); 