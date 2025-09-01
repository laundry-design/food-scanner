import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mockApi } from '@/services/api';

export interface NutritionData {
  calories: { value: string; progress: number; color: string };
  protein: { value: string; progress: number; color: string };
  carbs: { value: string; progress: number; color: string };
  fat: { value: string; progress: number; color: string };
}

export interface DietData {
  id: string;
  title: string;
  description: string;
  nutrition: NutritionData;
  goal: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDietEntry {
  id: string;
  dietId: string;
  userId: string;
  addedAt: string;
  notes?: string;
}

interface DietState {
  diets: DietData[];
  userDiets: UserDietEntry[];
  currentDiet: DietData | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeDiets: () => Promise<void>;
  getDiets: () => Promise<DietData[]>;
  getDietById: (id: string) => DietData | null;
  addDietToUser: (dietId: string, userId: string, notes?: string) => Promise<void>;
  removeDietFromUser: (dietId: string, userId: string) => Promise<void>;
  getUserDiets: (userId: string) => DietData[];
  setCurrentDiet: (diet: DietData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Mock diet data - simulating API responses
const mockDiets: DietData[] = [
  {
    id: 'diet_1',
    title: 'Mediterranean Bowl',
    description: 'A nutritious Mediterranean-inspired bowl with quinoa, grilled chicken, fresh vegetables, and olive oil dressing.',
    nutrition: {
      calories: { value: '520', progress: 0.65, color: '#ff6b6b' },
      protein: { value: '35g', progress: 0.7, color: '#4ecdc4' },
      carbs: { value: '45g', progress: 0.6, color: '#45b7d1' },
      fat: { value: '22g', progress: 0.55, color: '#f9ca24' },
    },
    goal: 'Perfect for muscle building and weight management. High in protein and healthy fats.',
    category: 'Healthy',
    difficulty: 'Easy',
    duration: '15 mins',
    tags: ['High Protein', 'Mediterranean', 'Gluten-Free'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'diet_2',
    title: 'Keto Salmon Plate',
    description: 'Grilled salmon with avocado, asparagus, and a side of mixed greens. Perfect for ketogenic diet.',
    nutrition: {
      calories: { value: '680', progress: 0.85, color: '#ff6b6b' },
      protein: { value: '42g', progress: 0.84, color: '#4ecdc4' },
      carbs: { value: '8g', progress: 0.13, color: '#45b7d1' },
      fat: { value: '52g', progress: 0.93, color: '#f9ca24' },
    },
    goal: 'Ideal for ketogenic diet followers. Very low carb, high fat content for ketosis.',
    category: 'Keto',
    difficulty: 'Medium',
    duration: '25 mins',
    tags: ['Keto', 'Low Carb', 'High Fat', 'Omega-3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'diet_3',
    title: 'Vegan Power Bowl',
    description: 'Plant-based bowl with chickpeas, quinoa, roasted vegetables, and tahini dressing.',
    nutrition: {
      calories: { value: '450', progress: 0.56, color: '#ff6b6b' },
      protein: { value: '18g', progress: 0.36, color: '#4ecdc4' },
      carbs: { value: '65g', progress: 0.87, color: '#45b7d1' },
      fat: { value: '16g', progress: 0.4, color: '#f9ca24' },
    },
    goal: 'Plant-based nutrition with complete amino acids. Great for vegans and vegetarians.',
    category: 'Vegan',
    difficulty: 'Easy',
    duration: '20 mins',
    tags: ['Vegan', 'Plant-Based', 'High Fiber', 'Complete Protein'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'diet_4',
    title: 'Post-Workout Smoothie Bowl',
    description: 'Protein-rich smoothie bowl with berries, banana, protein powder, and granola.',
    nutrition: {
      calories: { value: '380', progress: 0.48, color: '#ff6b6b' },
      protein: { value: '28g', progress: 0.56, color: '#4ecdc4' },
      carbs: { value: '52g', progress: 0.69, color: '#45b7d1' },
      fat: { value: '8g', progress: 0.2, color: '#f9ca24' },
    },
    goal: 'Perfect post-workout meal for muscle recovery and glycogen replenishment.',
    category: 'Post-Workout',
    difficulty: 'Easy',
    duration: '10 mins',
    tags: ['Post-Workout', 'High Protein', 'Quick', 'Antioxidants'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'diet_5',
    title: 'Asian Stir-Fry',
    description: 'Colorful vegetable stir-fry with tofu, brown rice, and ginger-soy sauce.',
    nutrition: {
      calories: { value: '420', progress: 0.53, color: '#ff6b6b' },
      protein: { value: '22g', progress: 0.44, color: '#4ecdc4' },
      carbs: { value: '58g', progress: 0.77, color: '#45b7d1' },
      fat: { value: '14g', progress: 0.35, color: '#f9ca24' },
    },
    goal: 'Balanced meal with complex carbs and plant protein. Great for sustained energy.',
    category: 'Asian',
    difficulty: 'Medium',
    duration: '30 mins',
    tags: ['Asian', 'Vegetarian', 'High Fiber', 'Balanced'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useDietStore = create<DietState>()(
  persist(
    (set, get) => ({
      diets: [],
      userDiets: [],
      currentDiet: null,
      isLoading: false,
      error: null,

      initializeDiets: async () => {
        set({ isLoading: true, error: null });
        try {
          // Try to get diets from API first
          const result = await mockApi.getAllDiets('mock_token');
          
          if (result.success && result.data) {
            // Transform API data to match our DietData interface
            const apiDiets: DietData[] = result.data.map((diet: any) => ({
              id: diet.id,
              title: diet.title,
              description: diet.description,
              nutrition: {
                calories: { value: `${diet.calories || 0}`, progress: 0.5, color: '#ff6b6b' },
                protein: { value: `${diet.protein || 0}g`, progress: 0.5, color: '#4ecdc4' },
                carbs: { value: `${diet.carbs || 0}g`, progress: 0.5, color: '#45b7d1' },
                fat: { value: `${diet.fat || 0}g`, progress: 0.5, color: '#f9ca24' },
              },
              goal: diet.goal || 'Healthy eating',
              category: diet.category || 'General',
              difficulty: diet.difficulty || 'Easy',
              duration: diet.duration || '20 mins',
              tags: diet.tags || ['Healthy'],
              imageUrl: diet.imageUrl,
              createdAt: diet.createdAt || new Date().toISOString(),
              updatedAt: diet.updatedAt || new Date().toISOString(),
            }));
            
            set({ 
              diets: apiDiets,
              isLoading: false 
            });
          } else {
            // Fallback to mock data
            set({ 
              diets: mockDiets,
              isLoading: false 
            });
          }
        } catch (error) {
          console.error('Error initializing diets:', error);
          // Fallback to mock data on error
          set({ 
            diets: mockDiets,
            error: 'Failed to load diets from API, using local data',
            isLoading: false 
          });
        }
      },

      getDiets: async () => {
        const { diets } = get();
        if (diets.length === 0) {
          await get().initializeDiets();
          return get().diets;
        }
        return diets;
      },

      getDietById: (id: string) => {
        const { diets } = get();
        return diets.find(diet => diet.id === id) || null;
      },

      addDietToUser: async (dietId: string, userId: string, notes?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Try to add diet via API first
          const result = await mockApi.addDietToUser('mock_token', dietId, notes);
          
          if (result.success) {
            const { userDiets } = get();
            
            // Check if already added
            const existingEntry = userDiets.find(
              entry => entry.dietId === dietId && entry.userId === userId
            );
            
            if (existingEntry) {
              set({ 
                error: 'Diet already added to your list',
                isLoading: false 
              });
              return;
            }

            const newEntry: UserDietEntry = {
              id: result.data?.id || `user_diet_${Date.now()}`,
              dietId,
              userId,
              addedAt: result.data?.addedAt || new Date().toISOString(),
              notes,
            };

            set({ 
              userDiets: [...userDiets, newEntry],
              isLoading: false 
            });
          } else {
            throw new Error('Failed to add diet via API');
          }
        } catch (error) {
          console.error('Error adding diet to user:', error);
          // Fallback to local state update
          const { userDiets } = get();
          
          const existingEntry = userDiets.find(
            entry => entry.dietId === dietId && entry.userId === userId
          );
          
          if (existingEntry) {
            set({ 
              error: 'Diet already added to your list',
              isLoading: false 
            });
            return;
          }

          const newEntry: UserDietEntry = {
            id: `user_diet_${Date.now()}`,
            dietId,
            userId,
            addedAt: new Date().toISOString(),
            notes,
          };

          set({ 
            userDiets: [...userDiets, newEntry],
            isLoading: false 
          });
        }
      },

      removeDietFromUser: async (dietId: string, userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Try to remove diet via API first
          const result = await mockApi.removeDietFromUser('mock_token', dietId);
          
          if (result.success) {
            const { userDiets } = get();
            const updatedUserDiets = userDiets.filter(
              entry => !(entry.dietId === dietId && entry.userId === userId)
            );

            set({ 
              userDiets: updatedUserDiets,
              isLoading: false 
            });
          } else {
            throw new Error('Failed to remove diet via API');
          }
        } catch (error) {
          console.error('Error removing diet from user:', error);
          // Fallback to local state update
          const { userDiets } = get();
          const updatedUserDiets = userDiets.filter(
            entry => !(entry.dietId === dietId && entry.userId === userId)
          );

          set({ 
            userDiets: updatedUserDiets,
            isLoading: false 
          });
        }
      },

      getUserDiets: (userId: string) => {
        const { userDiets, diets } = get();
        const userDietIds = userDiets
          .filter(entry => entry.userId === userId)
          .map(entry => entry.dietId);
        
        return diets.filter(diet => userDietIds.includes(diet.id));
      },

      setCurrentDiet: (diet: DietData | null) => {
        set({ currentDiet: diet });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'diet-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        diets: state.diets,
        userDiets: state.userDiets,
      }),
    }
  )
);