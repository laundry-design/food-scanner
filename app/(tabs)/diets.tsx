import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import BottomSheet from '@/components/BottomSheet';
import { DietBottomSheet } from '@/components/diet';
import { useDiet } from '@/hooks/useDiet';
import { DietData } from '@/stores/dietStore';

interface DietCardProps {
  diet: DietData;
  onPress: () => void;
}

function DietCard({ diet, onPress }: DietCardProps) {
  // Use a placeholder image if none provided
  const imageUri = diet.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop';
  
  return (
    <TouchableOpacity style={styles.shadowWrapper} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.dietCard}>
        <Image source={{ uri: imageUri }} style={styles.dietImage} />
        <View style={styles.dietInfo}>
          <Text style={styles.dietTitle}>{diet.title}</Text>
          <Text style={styles.dietDescription} numberOfLines={2}>{diet.description}</Text>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionText}>{diet.nutrition.calories.value}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.nutritionText}>Protein: {diet.nutrition.protein.value}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.nutritionText}>Carbs: {diet.nutrition.carbs.value}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.nutritionText}>Fat: {diet.nutrition.fat.value}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {diet.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
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
  const [selectedDiet, setSelectedDiet] = useState<DietData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Use the diet hook
  const { diets, userDiets, isLoading, error, getDiets } = useDiet();

  useEffect(() => {
    // Initialize diets when component mounts
    getDiets();
  }, []);

  // Get the diets to display based on selected toggle
  const displayedDiets = selectedToggle === 'All Diets' ? diets : userDiets;

  const handleDietPress = (diet: DietData) => {
    setSelectedDiet(diet);
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
        <Text style={styles.sectionTitle}>
          {selectedToggle === 'All Diets' ? 'All Diets' : 'My Diets'}
        </Text>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primaryColor} />
            <Text style={styles.loadingText}>Loading diets...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={getDiets}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedDiets.length === 0 && (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {selectedToggle === 'All Diets' 
                ? 'No diets available' 
                : 'No diets in your list yet'
              }
            </Text>
            {selectedToggle === 'My Diets' && (
              <Text style={styles.emptySubtext}>
                Browse all diets and add some to your list!
              </Text>
            )}
          </View>
        )}

        {/* Diet Cards */}
        {!isLoading && !error && displayedDiets.map((diet) => (
          <DietCard
            key={diet.id}
            diet={diet}
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
        isExpanded={true}
        onExpansionChange={handleExpansionChange}
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
  dietDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.light.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: Colors.light.text,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
    textAlign: 'center',
  },
});
