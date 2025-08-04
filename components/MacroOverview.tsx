import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MacroCard from './MacroCard';
import { MacroData } from '@/types/home';

interface MacroOverviewProps {
  macroData: MacroData;
}

const MacroOverview: React.FC<MacroOverviewProps> = ({ macroData }) => {
  const macroCards = [
    {
      title: 'Calories',
      value: `${macroData.calories.current.toLocaleString()} kcal`,
      current: macroData.calories.current,
      target: macroData.calories.target,
      gradientColors: ['#a855f7', '#8b5cf6'],
      textColor: '#ffffff',
      showProgress: false,
    },
    {
      title: 'Protein',
      current: macroData.protein.current,
      target: macroData.protein.target,
      gradientColors: ['#14b8a6', '#0d9488'],
      textColor: '#ffffff',
      showProgress: true,
    },
    {
      title: 'Carbs',
      current: macroData.carbs.current,
      target: macroData.carbs.target,
      gradientColors: ['#fbbf24', '#f59e0b'],
      textColor: '#1f2937',
      showProgress: true,
    },
    {
      title: 'Fat',
      current: macroData.fat.current,
      target: macroData.fat.target,
      gradientColors: ['#f97316', '#ea580c'],
      textColor: '#ffffff',
      showProgress: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Overview</Text>
      
      <View style={styles.grid}>
        {macroCards.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <MacroCard {...card} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardContainer: {
    width: '48%',
  },
});

export default MacroOverview; 