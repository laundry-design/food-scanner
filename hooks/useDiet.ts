import { useEffect } from 'react';
import { useDietStore } from '@/stores/dietStore';
import { useUserStore } from '@/stores/userStore';

export const useDiet = () => {
  const dietStore = useDietStore();
  const { user } = useUserStore();

  // Initialize diets when hook is first used
  useEffect(() => {
    if (dietStore.diets.length === 0 && !dietStore.isLoading) {
      dietStore.initializeDiets();
    }
  }, []);

  // Get user's diets
  const userDiets = user ? dietStore.getUserDiets(user.id) : [];

  // Helper functions
  const addToMyDiet = async (dietId: string, notes?: string) => {
    if (!user?.id) {
      throw new Error('User not logged in');
    }
    return dietStore.addDietToUser(dietId, user.id, notes);
  };

  const removeFromMyDiet = async (dietId: string) => {
    if (!user?.id) {
      throw new Error('User not logged in');
    }
    return dietStore.removeDietFromUser(dietId, user.id);
  };

  const isDietInMyList = (dietId: string) => {
    return userDiets.some(diet => diet.id === dietId);
  };

  return {
    // State
    diets: dietStore.diets,
    userDiets,
    currentDiet: dietStore.currentDiet,
    isLoading: dietStore.isLoading,
    error: dietStore.error,

    // Actions
    getDiets: dietStore.getDiets,
    getDietById: dietStore.getDietById,
    setCurrentDiet: dietStore.setCurrentDiet,
    addToMyDiet,
    removeFromMyDiet,
    isDietInMyList,
    
    // Store actions (for advanced usage)
    initializeDiets: dietStore.initializeDiets,
    setLoading: dietStore.setLoading,
    setError: dietStore.setError,
  };
};

export default useDiet;