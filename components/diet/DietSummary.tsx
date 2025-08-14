import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDiet } from '@/hooks/useDiet';
import { Colors } from '@/constants/Colors';

interface DietSummaryProps {
  onViewAll?: () => void;
}

export default function DietSummary({ onViewAll }: DietSummaryProps) {
  const { userDiets, isLoading } = useDiet();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading your diets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Diets</Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {userDiets.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="plus-circle" size={24} color="#ccc" />
          <Text style={styles.emptyText}>No diets added yet</Text>
          <Text style={styles.emptySubtext}>Browse diets and add your favorites</Text>
        </View>
      ) : (
        <View style={styles.dietsList}>
          {userDiets.slice(0, 3).map((diet) => (
            <View key={diet.id} style={styles.dietItem}>
              <View style={styles.dietInfo}>
                <Text style={styles.dietName}>{diet.title}</Text>
                <Text style={styles.dietCategory}>{diet.category}</Text>
              </View>
              <View style={styles.nutritionSummary}>
                <Text style={styles.caloriesText}>{diet.nutrition.calories.value}</Text>
              </View>
            </View>
          ))}
          
          {userDiets.length > 3 && (
            <Text style={styles.moreText}>
              +{userDiets.length - 3} more diets
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.light.primaryColor,
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  dietsList: {
    gap: 12,
  },
  dietItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dietInfo: {
    flex: 1,
  },
  dietName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  dietCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  nutritionSummary: {
    alignItems: 'flex-end',
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primaryColor,
  },
  moreText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});