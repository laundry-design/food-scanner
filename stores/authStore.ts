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
  authProvider?: 'email' | 'google' | 'apple';
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
  loginWithGoogle: (idToken?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithApple: (idToken?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  
  // User profile methods
  getUserProfile: () => Promise<{ success: boolean; data?: any; error?: string }>;
  updateUserProfile: (profileData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  completeOnboarding: (onboardingData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // Nutrition methods
  getDailyNutrition: (date?: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  getWeeklyNutrition: (startDate: string, endDate: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  addManualNutritionEntry: (nutritionData: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // Food history methods
  getFoodHistory: (params?: {
    startDate?: string;
    endDate?: string;
    mealType?: string;
    limit?: number;
    offset?: number;
  }) => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // Diet management methods
  getAllDiets: () => Promise<{ success: boolean; data?: any; error?: string }>;
  getUserDiets: () => Promise<{ success: boolean; data?: any; error?: string }>;
  addDietToUser: (dietId: string, notes?: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  removeDietFromUser: (dietId: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // Food scanning methods
  scanFood: (imageUri: string, mealType: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  
  // User goals & progress methods
  getUserGoals: () => Promise<{ success: boolean; data?: any; error?: string }>;
  updateUserGoals: (goals: {
    targetWeight?: number;
    targetCalories?: number;
    targetProtein?: number;
    targetCarbs?: number;
    targetFat?: number;
    fitnessGoal?: string;
    targetDate?: string;
  }) => Promise<{ success: boolean; data?: any; error?: string }>;
  addProgressEntry: (progress: {
    weight?: number;
    bodyFat?: number;
    muscleMass?: number;
    measurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      thighs?: number;
    };
    notes?: string;
  }) => Promise<{ success: boolean; data?: any; error?: string }>;
  getProgressHistory: (params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) => Promise<{ success: boolean; data?: any; error?: string }>;
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
            authProvider: 'email',
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
            authProvider: 'email',
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

      loginWithGoogle: async (idToken?: string) => {
        set({ isLoading: true });
        try {
          // This will be implemented with actual Google Sign-In
          const data = await mockApi.loginWithGoogle(idToken);
          
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
            authProvider: 'google',
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
          console.error('Google login error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Google login failed' 
          };
        }
      },

      loginWithApple: async (idToken?: string) => {
        set({ isLoading: true });
        try {
          // This will be implemented with actual Apple Sign-In
          const data = await mockApi.loginWithApple(idToken);
          
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
            authProvider: 'apple',
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
          console.error('Apple login error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Apple login failed' 
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
            user: { ...data.user, token }, 
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

      completeOnboarding: async (onboardingData: any): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.completeOnboarding(token, onboardingData);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to complete onboarding');
          }
        } catch (error) {
          console.error('Complete onboarding error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to complete onboarding' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== USER PROFILE METHODS =====
      getUserProfile: async (): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getUserProfile(token);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get user profile');
          }
        } catch (error) {
          console.error('Get user profile error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get user profile' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      updateUserProfile: async (profileData: any): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.updateUserProfile(token, profileData);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to update user profile');
          }
        } catch (error) {
          console.error('Update user profile error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to update user profile' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== NUTRITION METHODS =====
      getDailyNutrition: async (date?: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getDailyNutrition(token, date);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get daily nutrition');
          }
        } catch (error) {
          console.error('Get daily nutrition error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get daily nutrition' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      getWeeklyNutrition: async (startDate: string, endDate: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getWeeklyNutrition(token, startDate, endDate);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get weekly nutrition');
          }
        } catch (error) {
          console.error('Get weekly nutrition error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get weekly nutrition' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      addManualNutritionEntry: async (nutritionData: any): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.addManualNutritionEntry(token, nutritionData);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to add manual nutrition entry');
          }
        } catch (error) {
          console.error('Add manual nutrition entry error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to add manual nutrition entry' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== FOOD HISTORY METHODS =====
      getFoodHistory: async (params?: {
        startDate?: string;
        endDate?: string;
        mealType?: string;
        limit?: number;
        offset?: number;
      }): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getFoodHistory(token, params);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get food history');
          }
        } catch (error) {
          console.error('Get food history error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get food history' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== DIET MANAGEMENT METHODS =====
      getAllDiets: async (): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getAllDiets(token);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get all diets');
          }
        } catch (error) {
          console.error('Get all diets error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get all diets' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      getUserDiets: async (): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getUserDiets(token);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get user diets');
          }
        } catch (error) {
          console.error('Get user diets error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get user diets' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      addDietToUser: async (dietId: string, notes?: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.addDietToUser(token, dietId, notes);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to add diet to user');
          }
        } catch (error) {
          console.error('Add diet to user error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to add diet to user' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      removeDietFromUser: async (dietId: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.removeDietFromUser(token, dietId);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to remove diet from user');
          }
        } catch (error) {
          console.error('Remove diet from user error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to remove diet from user' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== FOOD SCANNING METHODS =====
      scanFood: async (imageUri: string, mealType: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.scanFood(token, imageUri, mealType);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to scan food');
          }
        } catch (error) {
          console.error('Scan food error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to scan food' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // ===== USER GOALS & PROGRESS METHODS =====
      getUserGoals: async (): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getUserGoals(token);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get user goals');
          }
        } catch (error) {
          console.error('Get user goals error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get user goals' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      updateUserGoals: async (goals: {
        targetWeight?: number;
        targetCalories?: number;
        targetProtein?: number;
        targetCarbs?: number;
        targetFat?: number;
        fitnessGoal?: string;
        targetDate?: string;
      }): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.updateUserGoals(token, goals);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to update user goals');
          }
        } catch (error) {
          console.error('Update user goals error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to update user goals' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      addProgressEntry: async (progress: {
        weight?: number;
        bodyFat?: number;
        muscleMass?: number;
        measurements?: {
          chest?: number;
          waist?: number;
          hips?: number;
          arms?: number;
          thighs?: number;
        };
        notes?: string;
      }): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.addProgressEntry(token, progress);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to add progress entry');
          }
        } catch (error) {
          console.error('Add progress entry error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to add progress entry' 
          };
        } finally {
          set({ isLoading: false });
        }
      },

      getProgressHistory: async (params?: {
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
      }): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No authentication token');
          }

          const response = await mockApi.getProgressHistory(token, params);
          
          if (response.success) {
            return { success: true, data: response.data };
          } else {
            throw new Error('Failed to get progress history');
          }
        } catch (error) {
          console.error('Get progress history error:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to get progress history' 
          };
        } finally {
          set({ isLoading: false });
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