import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import DailyQuote from './DailyQuote';
import MacroOverview from './MacroOverview';
import DietSuggestions from './DietSuggestions';
import { DailyQuoteData, MacroData, DietSuggestion } from '@/types/home';

export default function HomeScreen() {
  console.log('HomeScreen component rendered');
  const dailyQuote: DailyQuoteData = {
    quote: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  };

  const macroData: MacroData = {
    calories: { current: 2000, target: 2500 },
    protein: { current: 75, target: 150 },
    carbs: { current: 200, target: 300 },
    fat: { current: 67, target: 83 }
  };

  const dietSuggestions: DietSuggestion[] = [
    {
      id: 'protein',
      icon: 'trending-up-outline',
      title: 'Increase Protein Intake',
      description: "You're 50% below your protein goal. Try adding lean meats, eggs, or protein shakes.",
      actionText: 'View Foods',
      gradientColors: ['#22c55e', '#16a34a'],
      priority: 1
    },
    {
      id: 'hydration',
      icon: 'water-outline',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water today to support your metabolism.',
      actionText: 'Set Reminder',
      gradientColors: ['#3b82f6', '#2563eb'],
      priority: 2
    },
    {
      id: 'timing',
      icon: 'time-outline',
      title: 'Meal Timing',
      description: 'Try eating smaller, frequent meals to maintain steady energy levels.',
      actionText: 'Plan Meals',
      gradientColors: ['#8b5cf6', '#7c3aed'],
      priority: 3
    }
  ];

  const handleProfilePress = useCallback(() => {
    Alert.alert('Profile', 'Profile screen would open here');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Header 
          userName="Alex" 
          onProfilePress={handleProfilePress}
        />
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
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
}); 