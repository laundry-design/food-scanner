import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NutritionCardProps {
  title: string;
  value: string;
  progress: number;
  color: string;
}

export default function NutritionCard({ title, value, progress, color }: NutritionCardProps) {
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

const styles = StyleSheet.create({
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
});