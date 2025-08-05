import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface NutritionCardProps {
  title: string;
  value: string;
  progress: number;
  color: string;
}

function NutritionCard({ title, value, progress, color }: NutritionCardProps) {
  return (
    <View style={[styles.nutritionCard, { backgroundColor: color }]}>
      <Text style={styles.nutritionTitle}>{title}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
      {progress < 1 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{Math.round(progress * 100)}%</Text>
            <Text style={styles.progressLabel}>100%</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function DietDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get diet data from params or use default
  const dietData = {
    id: params.id as string || '1',
    title: params.title as string || 'Mediterranean Lifestyle',
    image: params.image as string || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    description: "This diet focuses on whole foods, featuring fresh vegetables, quality olive oil, lean fish, nutritious nuts, and wholesome grains. It offers a balanced and tasty way to eat that supports your health.",
    nutrition: {
      calories: { value: '2,000 kcal', progress: 1, color: '#c4b5fd' },
      protein: { value: '25%', progress: 0.25, color: '#4ade80' },
      carbs: { value: '40%', progress: 0.4, color: '#fde047' },
      fat: { value: '30%', progress: 0.3, color: '#fb7185' }
    },
    goal: 'Heart Health, Weight Maintenance'
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleMorePress = () => {
    // Handle more options
    console.log('More options pressed');
  };

  const handleAddToDiet = () => {
    // Handle adding to diet
    console.log('Add to diet pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back and more buttons */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handleBackPress}
          >
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handleMorePress}
          >
            <Feather name="more-vertical" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Diet Image */}
        <Image source={{ uri: dietData.image }} style={styles.dietImage} />

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Description */}
          <Text style={styles.title}>{dietData.title}</Text>
          <Text style={styles.description}>{dietData.description}</Text>

          {/* Nutrition Cards Grid */}
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

          {/* Goal Card */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Feather name="target" size={20} color="#ffffff" />
              <Text style={styles.goalTitle}>Goal</Text>
            </View>
            <Text style={styles.goalDescription}>{dietData.goal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={handleAddToDiet}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Add to My Diet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Extra space for CTA button and bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  nutritionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '500',
  },
  goalCard: {
    backgroundColor: '#374151',
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
    color: '#ffffff',
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100, // Move up to avoid bottom navigation
    left: 16,
    right: 16,
  },
  ctaButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
}); 