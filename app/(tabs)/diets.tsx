import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import BottomSheet from '@/components/BottomSheet';
import { DietBottomSheet } from '@/components/diet';

interface DietCardProps {
  image: string;
  title: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  onPress: () => void;
}

function DietCard({ image, title, nutrition, onPress }: DietCardProps) {
  return (
    <TouchableOpacity style={styles.shadowWrapper} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.dietCard}>
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
      </View>
    </TouchableOpacity>
  );
}

export default function DietsScreen() {
  const [selectedToggle, setSelectedToggle] = useState<'All Diets' | 'My Diets'>('All Diets');
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [showDietBottomSheet, setShowDietBottomSheet] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleDietPress = (diet: any) => {
    // Transform diet data to match the expected format
    const transformedDiet = {
      id: diet.id,
      title: diet.title,
      description: `A comprehensive ${diet.title.toLowerCase()} plan designed to help you achieve your health and wellness goals with balanced nutrition.`,
      nutrition: {
        calories: { 
          value: diet.nutrition.calories, 
          progress: 0.75, 
          color: '#FFE5B4' 
        },
        protein: { 
          value: diet.nutrition.protein, 
          progress: 0.85, 
          color: '#E5F3FF' 
        },
        carbs: { 
          value: diet.nutrition.carbs, 
          progress: 0.65, 
          color: '#F0FFF0' 
        },
        fat: { 
          value: diet.nutrition.fat, 
          progress: 0.70, 
          color: '#FFF0F5' 
        }
      },
      goal: `Follow the ${diet.title} to maintain a balanced lifestyle with optimal nutrition and sustainable eating habits.`
    };
    
    setSelectedDiet(transformedDiet);
    setShowDietBottomSheet(true);
    setShowBottomSheet(false); // Hide the main bottom sheet
  };

  const handleCloseDietBottomSheet = () => {
    setShowDietBottomSheet(false);
    setSelectedDiet(null);
    setIsExpanded(false);
    setShowBottomSheet(true); // Show the main bottom sheet again
  };

  const handleExpansionChange = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const handleAddToDiet = () => {
    // Handle adding diet to user's plan
    console.log('Adding diet to plan:', selectedDiet?.title);
    // You can add your logic here
  };

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
            onPress={() => handleDietPress(diet)}
          />
        ))}
      </ScrollView>

      {/* Bottom Sheet - Always Open */}
      {/* <BottomSheet
        isVisible={showBottomSheet}
        keepOpen={true}
        initialHeight={0.3}
        showHandle={false}
        title="Quick Actions"
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Diet Tools</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="plus" size={20} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Create Diet</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="search" size={20} color="#2196F3" />
              <Text style={styles.actionButtonText}>Find Recipes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="bookmark" size={20} color="#FF9800" />
              <Text style={styles.actionButtonText}>Saved Items</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Today's Progress</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1,850</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85g</Text>
                <Text style={styles.statLabel}>Protein</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>220g</Text>
                <Text style={styles.statLabel}>Carbs</Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet> */}

      {/* Diet Details Bottom Sheet */}
      <DietBottomSheet
        isVisible={showDietBottomSheet}
        onClose={handleCloseDietBottomSheet}
        dietData={selectedDiet}
        isExpanded={isExpanded}
        onExpansionChange={handleExpansionChange}
        onAddToDiet={handleAddToDiet}
      />
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
paddingHorizontal: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeToggleOption: {
    backgroundColor: Colors.light.primaryColor,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  activeToggleText: {
    color: '#ffffff',
  },

  // Bottom Sheet Styles
  bottomSheetContent: {
    paddingVertical: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
    fontWeight: '500',
  },
  statsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  exploreCard: {
    backgroundColor: Colors.light.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  exploreTitle: {
    fontSize: 16,
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
    color: Colors.light.text,
paddingLeft: 8,
    marginBottom: 8,
  },

  // Wrapper for shadow (keeps shadow visible)
  shadowWrapper: {
    borderRadius: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // Card itself (keeps rounded corners & hides image overflow)
  dietCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.light.background,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  dietImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dietInfo: {
    padding: 12,
    backgroundColor: Colors.light.background,
  },
  dietTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontSize: 12,
    color: Colors.light.text,
  },
  separator: {
    fontSize: 12,
    color: Colors.light.text,
    marginHorizontal: 4,
  },
});
