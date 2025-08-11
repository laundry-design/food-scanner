import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

interface DietCardProps {
  image: string;
  title: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

function DietCard({ image, title, nutrition }: DietCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/diet-detail',
      params: {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title: title,
        image: image,
      }
    });
  };

  return (
    <TouchableOpacity style={styles.dietCard} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.dietImage} />
      <View style={styles.dietInfo}>
        <Text style={styles.dietTitle}>{title}</Text>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionText}>{nutrition.calories}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.nutritionText}>Protein: {nutrition.protein}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.nutritionText}>Carbs: {nutrition.carbs}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.nutritionText}>Fat: {nutrition.fat}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function DietsScreen() {
  const [selectedToggle, setSelectedToggle] = useState<'All Diets' | 'My Diets'>('All Diets');

  const dietPlans = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      title: 'Mediterranean Lifestyle',
      nutrition: {
        calories: '2,000 kcal',
        protein: '120g',
        carbs: '200g',
        fat: '70g'
      }
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      title: 'Keto Diet',
      nutrition: {
        calories: '1,800 kcal',
        protein: '140g',
        carbs: '50g',
        fat: '120g'
      }
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      title: 'Vegetarian Plan',
      nutrition: {
        calories: '1,900 kcal',
        protein: '90g',
        carbs: '250g',
        fat: '65g'
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Diets" backgroundColor="#000000" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              selectedToggle === 'All Diets' && styles.activeToggleOption
            ]}
            onPress={() => setSelectedToggle('All Diets')}
          >
            <Text style={[
              styles.toggleText,
              selectedToggle === 'All Diets' && styles.activeToggleText
            ]}>
              All Diets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              selectedToggle === 'My Diets' && styles.activeToggleOption
            ]}
            onPress={() => setSelectedToggle('My Diets')}
          >
            <Text style={[
              styles.toggleText,
              selectedToggle === 'My Diets' && styles.activeToggleText
            ]}>
              My Diets
            </Text>
          </TouchableOpacity>
        </View>

        {/* Explore Card */}
        <View style={styles.exploreCard}>
          <Text style={styles.exploreTitle}>Explore Diet Plans</Text>
          <Text style={styles.exploreDescription}>
            Personalized plans to match your goals and lifestyle.
          </Text>
        </View>

        {/* Diets Section */}
        <Text style={styles.sectionTitle}>Diets</Text>

        {/* Diet Cards */}
        {dietPlans.map((diet) => (
          <DietCard
            key={diet.id}
            image={diet.image}
            title={diet.title}
            nutrition={diet.nutrition}
          />
        ))}
      </ScrollView>
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
    padding: 16,
    paddingBottom: 120, // Extra padding for bottom navigation
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 4,
    marginBottom: 16,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 21,
    alignItems: 'center',
  },
  activeToggleOption: {
    backgroundColor: '#f97316',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  activeToggleText: {
    color: '#ffffff',
  },
  exploreCard: {
    backgroundColor: '#e9d5ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  exploreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  dietCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dietImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dietInfo: {
    padding: 12,
  },
  dietTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontSize: 12,
    color: '#ffffff',
  },
  separator: {
    fontSize: 12,
    color: '#ffffff',
    marginHorizontal: 4,
  },
}); 