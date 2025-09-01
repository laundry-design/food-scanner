import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
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
import { useAppStores } from '@/hooks/useAppStores';

export default function AnalyticsScreen() {
  const colorScheme = useColorScheme();
  const { user, getWeeklyNutrition, getDailyNutrition } = useAppStores();
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('Daily');
  const [loading, setLoading] = useState(true);
  const [calorieData, setCalorieData] = useState<CalorieData[]>([]);
  const [macroData, setMacroData] = useState<MacroData[]>([]);

  // Load analytics data based on selected time range
  useEffect(() => {
    if (user) {
      loadAnalyticsData();
    }
  }, [user, selectedTimeRange]);

  const loadAnalyticsData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      if (selectedTimeRange === 'Daily') {
        // Load daily nutrition data
        const result = await getDailyNutrition();
        if (result.success && result.data) {
          const nutrition = result.data;
          const total = nutrition.totalCalories || 0;
          const target = 2500; // Default target, should come from user goals
          
          setCalorieData([
            { 
              data: [total], 
              color: total <= target ? '#f97316' : '#ef4444', 
              label: total <= target ? 'Under goal' : 'Over goal' 
            }
          ]);

          // Calculate macro distribution
          const protein = nutrition.totalProtein || 0;
          const carbs = nutrition.totalCarbs || 0;
          const fat = nutrition.totalFat || 0;
          const totalMacros = protein + carbs + fat;
          
          if (totalMacros > 0) {
            setMacroData([
              { 
                name: 'Protein', 
                percentage: Math.round((protein / totalMacros) * 100), 
                color: '#f97316' 
              },
              { 
                name: 'Carbs', 
                percentage: Math.round((carbs / totalMacros) * 100), 
                color: '#14b8a6' 
              },
              { 
                name: 'Fats', 
                percentage: Math.round((fat / totalMacros) * 100), 
                color: '#a855f7' 
              }
            ]);
          }
        }
      } else if (selectedTimeRange === 'Weekly') {
        // Load weekly nutrition data
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const result = await getWeeklyNutrition(startDate, endDate);
        if (result.success && result.data) {
          const weeklyData = result.data;
          
          // Create calorie trends for the week
          const calorieTrends = weeklyData.map((day: any) => day.calories || 0);
          const target = 2500; // Default target
          
          setCalorieData([
            { 
              data: calorieTrends, 
              color: '#f97316', 
              label: 'Weekly trend' 
            }
          ]);

          // Calculate average macro distribution for the week
          const avgProtein = weeklyData.reduce((sum: number, day: any) => sum + (day.protein || 0), 0) / weeklyData.length;
          const avgCarbs = weeklyData.reduce((sum: number, day: any) => sum + (day.carbs || 0), 0) / weeklyData.length;
          const avgFat = weeklyData.reduce((sum: number, day: any) => sum + (day.fat || 0), 0) / weeklyData.length;
          const totalAvg = avgProtein + avgCarbs + avgFat;
          
          if (totalAvg > 0) {
            setMacroData([
              { 
                name: 'Protein', 
                percentage: Math.round((avgProtein / totalAvg) * 100), 
                color: '#f97316' 
              },
              { 
                name: 'Carbs', 
                percentage: Math.round((avgCarbs / totalAvg) * 100), 
                color: '#14b8a6' 
              },
              { 
                name: 'Fats', 
                percentage: Math.round((avgFat / totalAvg) * 100), 
                color: '#a855f7' 
              }
            ]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      // Set default data if API fails
      setCalorieData([
        { data: [250, 200, 240, 200, 400, 350, 300], color: '#f97316', label: 'Sample data' }
      ]);
      setMacroData([
        { name: 'Fats', percentage: 53, color: '#a855f7' },
        { name: 'Carbs', percentage: 28, color: '#14b8a6' },
        { name: 'Protein', percentage: 19, color: '#f97316' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#000000' }]}>
        <Header title="Analytics" backgroundColor="#000000" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f97316" />
          <Text style={styles.loadingText}>Loading analytics data...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    opacity: 0.8,
  },
}); 