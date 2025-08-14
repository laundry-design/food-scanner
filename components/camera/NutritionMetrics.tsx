import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NutritionCard from './NutritionCard';

interface NutritionData {
  calories: { value: string; progress: number; color: string };
  protein: { value: string; progress: number; color: string };
  carbs: { value: string; progress: number; color: string };
  fat: { value: string; progress: number; color: string };
}

interface DietData {
  id: string;
  title: string;
  description: string;
  nutrition: NutritionData;
  goal: string;
}

interface NutritionMetricsProps {
  dietData: DietData;
  isExpanded: boolean;
  onAddToDiet: () => void;
}

export default function NutritionMetrics({ dietData, isExpanded, onAddToDiet }: NutritionMetricsProps) {
  return (
    <>
      {/* Nutrition Cards Grid - Always visible when image selected */}
      <View style={styles.nutritionGridContainer}>
        <View style={styles.nutritionGrid}>
          <NutritionCard
            title="Calories"
            value={dietData.nutrition.calories.value}
            progress={dietData.nutrition.calories.progress}
            color={dietData.nutrition.calories.color}
          />
          <NutritionCard
            title="Protein"
            value={dietData.nutrition.protein.value}
            progress={dietData.nutrition.protein.progress}
            color={dietData.nutrition.protein.color}
          />
          <NutritionCard
            title="Carbs"
            value={dietData.nutrition.carbs.value}
            progress={dietData.nutrition.carbs.progress}
            color={dietData.nutrition.carbs.color}
          />
          <NutritionCard
            title="Fat"
            value={dietData.nutrition.fat.value}
            progress={dietData.nutrition.fat.progress}
            color={dietData.nutrition.fat.color}
          />
        </View>
      </View>

      {/* Expanded Content - Only show when expanded */}
      {isExpanded && (
        <>
          {/* Title and Description */}
          <Text style={styles.bottomSheetTitle}>{dietData.title}</Text>
          <Text style={styles.bottomSheetDescription}>{dietData.description}</Text>

          {/* Goal Card */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Feather name="target" size={20} color="#000000" />
              <Text style={styles.goalTitle}>Goal</Text>
            </View>
            <Text style={styles.goalDescription}>{dietData.goal}</Text>
          </View>

          {/* CTA Button */}
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={onAddToDiet}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>Add to My Diet</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  nutritionGridContainer: {
    paddingTop: 10,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 40,
  },
  bottomSheetDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  goalCard: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});