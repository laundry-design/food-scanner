import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mockApi } from '@/services/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
  plan?: string;
  age?: number;
  weight?: number;
  weightUnit?: string;
  height?: number;
  heightUnit?: string;
  gender?: string;
  fitnessGoal?: string;
  gymActivity?: string;
  dietFocus?: string;
  isOnboardingCompleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const data = await mockApi.login(email, password);
          
          const user: AuthUser = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            plan: data.user.plan,
            age: data.user.age,
            weight: data.user.weight,
            weightUnit: data.user.weightUnit,
            height: data.user.height,
            heightUnit: data.user.heightUnit,
            gender: data.user.gender,
            fitnessGoal: data.user.fitnessGoal,
            gymActivity: data.user.gymActivity,
            dietFocus: data.user.dietFocus,
            isOnboardingCompleted: data.user.isOnboardingCompleted,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          };

          set({ 
            user, 
            token: data.token, 
            isAuthenticated: true, 
            isLoading: false 
          });

          return { success: true };
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          };
        }
      },

      register: async (userData: { name: string; email: string; password: string }) => {
        set({ isLoading: true });
        try {
          const data = await mockApi.register(userData);
          
          const user: AuthUser = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            isOnboardingCompleted: false,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          };

          set({ 
            user, 
            token: data.token, 
            isAuthenticated: true, 
            isLoading: false 
          });

          return { success: true };
        } catch (error) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Registration failed' 
          };
        }
      },

      logout: async () => {
        try {
          // Clear token from storage
          await AsyncStorage.removeItem('auth-storage');
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return false;
        }

        try {
          // Verify token with API
          const data = await mockApi.verifyToken(token);
          set({ 
            user: data.user, 
            isAuthenticated: true 
          });
          return true;
        } catch (error) {
          console.error('Auth check error:', error);
          await get().logout();
          return false;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUser: (updates: Partial<AuthUser>) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...updates, updatedAt: new Date().toISOString() } 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 