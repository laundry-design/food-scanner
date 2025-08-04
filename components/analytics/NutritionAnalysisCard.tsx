import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function NutritionAnalysisCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Nutrition Analysis</Text>
      <Text style={styles.subtitle}>Track trends. Spot patterns. Crush your goals.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#4ade80',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#f0f9ff',
    lineHeight: 20,
  },
}); 