import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MacroData } from '@/types/nutrition';

interface MacroDistributionCardProps {
  data: MacroData[];
  title?: string;
  subtitle?: string;
  style?: any;
}

export function MacroDistributionCard({ 
  data, 
  title = "Macro Distribution", 
  subtitle = "You're consistently low on protein.",
  style 
}: MacroDistributionCardProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <View style={styles.macroBlocksContainer}>
        {data.map((macro, index) => (
          <View 
            key={index} 
            style={[
              styles.macroBlock,
              { backgroundColor: macro.color }
            ]}
            accessibilityLabel={`${macro.name}: ${macro.percentage} percent`}
            accessibilityRole="text"
            accessibilityHint="Nutritional macro breakdown"
          >
            <Text style={styles.macroName}>{macro.name}</Text>
            <Text style={styles.macroPercentage}>{macro.percentage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#fbbf24',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#374151',
    marginBottom: 20,
    lineHeight: 20,
  },
  macroBlocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  macroBlock: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  macroName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
  },
  macroPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
}); 