import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  NutritionAnalysisCard,
  TimeRangeSelector,
  CalorieTrendsCard,
  MacroDistributionCard,
} from '@/components/analytics';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TimeRange, CalorieData, MacroData } from '@/types/nutrition';

export default function AnalyticsScreen() {
  const colorScheme = useColorScheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('Daily');

  const calorieData: CalorieData[] = [
    { data: [250, 200, 240, 200, 400, 350, 300], color: '#f97316', label: '5 days under goal' },
    { data: [280, 250, 290, 250, 200, 220, 240], color: '#1f2937', label: '2 days over by more than 200 kcal' }
  ];

  const macroData: MacroData[] = [
    { name: 'Fats', percentage: 53, color: '#a855f7' },
    { name: 'Carbs', percentage: 28, color: '#14b8a6' },
    { name: 'Protein', percentage: 19, color: '#f97316' }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#000000' }]}>
      <Header title="Analytics" backgroundColor="#000000" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NutritionAnalysisCard />
        <TimeRangeSelector 
          selected={selectedTimeRange}
          onSelect={setSelectedTimeRange}
        />
        <CalorieTrendsCard data={calorieData} />
        <MacroDistributionCard data={macroData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Extra padding for bottom navigation
  },
}); 