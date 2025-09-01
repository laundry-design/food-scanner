import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import DailyQuote from './DailyQuote';
import MacroOverview from './MacroOverview';
import DietSuggestions from './DietSuggestions';
import { DailyQuoteData, MacroData, DietSuggestion } from '@/types/home';
import { Colors } from '@/constants/Colors';
import { useAppStores } from '@/hooks/useAppStores';

export default function HomeScreen() {
  console.log('HomeScreen component rendered');
  
  const { user, getDailyNutrition, getUserProfile } = useAppStores();
  const [macroData, setMacroData] = useState<MacroData>({
    calories: { current: 0, target: 2500 },
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 300 },
    fat: { current: 0, target: 83 }
  });
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState<any>(null);

  const dailyQuote: DailyQuoteData = {
    quote: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  };

  // Load real nutrition data from API
  useEffect(() => {
    if (user) {
      loadNutritionData();
      loadUserGoals();
    }
  }, [user]);

  const loadNutritionData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const result = await getDailyNutrition();
      
      if (result.success && result.data) {
        const nutrition = result.data;
        setMacroData({
          calories: { 
            current: nutrition.totalCalories || 0, 
            target: userGoals?.targetCalories || 2500 
          },
          protein: { 
            current: nutrition.totalProtein || 0, 
            target: userGoals?.targetProtein || 150 
          },
          carbs: { 
            current: nutrition.totalCarbs || 0, 
            target: userGoals?.targetCarbs || 300 
          },
          fat: { 
            current: nutrition.totalFat || 0, 
            target: userGoals?.targetFat || 83 
          }
        });
      }
    } catch (error) {
      console.error('Error loading nutrition data:', error);
      // Keep default values if API fails
    } finally {
      setLoading(false);
    }
  };

  const loadUserGoals = async () => {
    if (!user) return;
    
    try {
      const result = await getUserProfile();
      if (result.success && result.data) {
        // Extract user goals from profile data
        const goals = {
          targetCalories: result.data.targetCalories || 2500,
          targetProtein: result.data.targetProtein || 150,
          targetCarbs: result.data.targetCarbs || 300,
          targetFat: result.data.targetFat || 83,
        };
        setUserGoals(goals);
        
        // Update macro data with real goals
        setMacroData(prev => ({
          ...prev,
          calories: { ...prev.calories, target: goals.targetCalories },
          protein: { ...prev.protein, target: goals.targetProtein },
          carbs: { ...prev.carbs, target: goals.targetCarbs },
          fat: { ...prev.fat, target: goals.targetFat },
        }));
      }
    } catch (error) {
      console.error('Error loading user goals:', error);
    }
  };

  const dietSuggestions: DietSuggestion[] = [
    {
      id: 'protein',
      icon: 'trending-up-outline',
      title: 'Increase Protein Intake',
      description: `You're ${Math.max(0, Math.round(((userGoals?.targetProtein || 150) - macroData.protein.current) / (userGoals?.targetProtein || 150) * 100))}% below your protein goal. Try adding lean meats, eggs, or protein shakes.`,
      actionText: 'View Foods',
      gradientColors: [Colors.light.primaryLight],
      priority: 1
    },
    {
      id: 'hydration',
      icon: 'water-outline',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water today to support your metabolism.',
      actionText: 'Set Reminder',
      gradientColors: [Colors.light.primaryLight],
      priority: 2
    },
    {
      id: 'timing',
      icon: 'time-outline',
      title: 'Meal Timing',
      description: 'Try eating smaller, frequent meals to maintain steady energy levels.',
      actionText: 'Plan Meals',
      gradientColors: [Colors.light.primaryLight],
      priority: 3
    }
  ];

  const handleProfilePress = useCallback(() => {
    Alert.alert('Profile', 'Profile screen would open here');
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Home" />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <DailyQuote quoteData={dailyQuote} />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.loadingText}>Loading your nutrition data...</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <DailyQuote quoteData={dailyQuote} />
        <MacroOverview macroData={macroData} />
        <DietSuggestions suggestions={dietSuggestions} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
  },
}); 