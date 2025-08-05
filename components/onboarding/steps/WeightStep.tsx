import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface WeightStepProps {
  onWeightChange?: (weight: number, unit: string) => void;
}

export default function WeightStep({ onWeightChange }: WeightStepProps) {
  const [weight, setWeight] = useState(60);
  const [unit, setUnit] = useState('KG');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleWeightChange = (newWeight: number) => {
    setWeight(newWeight);
    onWeightChange?.(newWeight, unit);
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    onWeightChange?.(weight, newUnit);
  };

  const weights = Array.from({ length: 121 }, (_, i) => i + 30); // 30 to 150

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          What's your current weight?
        </ThemedText>
        
        <View style={styles.unitSelector}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === 'LB' && styles.selectedUnitButton
            ]}
            onPress={() => handleUnitChange('LB')}
          >
            <ThemedText style={[
              styles.unitButtonText,
              unit === 'LB' && styles.selectedUnitButtonText
            ]}>
              LB
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === 'KG' && styles.selectedUnitButton
            ]}
            onPress={() => handleUnitChange('KG')}
          >
            <ThemedText style={[
              styles.unitButtonText,
              unit === 'KG' && styles.selectedUnitButtonText
            ]}>
              KG
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sliderContainer}>
          <View style={styles.valueDisplay}>
            <ThemedText style={styles.valueText}>
              {weight} {unit}
            </ThemedText>
          </View>
          
          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>
          
          <View style={styles.weightList}>
            {weights.map((weightValue) => (
              <TouchableOpacity
                key={weightValue}
                style={[
                  styles.weightItem,
                  weight === weightValue && styles.selectedWeightItem
                ]}
                onPress={() => handleWeightChange(weightValue)}
              >
                <ThemedText style={[
                  styles.weightText,
                  weight === weightValue && styles.selectedWeightText
                ]}>
                  {weightValue}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.bmiInfo}>
          <ThemedText style={styles.bmiTitle}>
            Your current BMI! 16.1
          </ThemedText>
          <ThemedText style={styles.bmiDescription}>
            You have a great potential to get in better shape, move now!
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FontStyles.h1,
    textAlign: 'center',
    marginBottom: 32,
  },
  unitSelector: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  unitButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  selectedUnitButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  unitButtonText: {
    ...FontStyles.bodyLarge,
    color: '#666',
    fontWeight: '600',
  },
  selectedUnitButtonText: {
    color: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 300,
    marginBottom: 32,
  },
  valueDisplay: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 100,
  },
  valueText: {
    ...FontStyles.h1,
    fontSize: 48,
    color: '#FFA500',
  },
  sliderTrack: {
    width: 8,
    height: 200,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 20,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    left: -6,
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  weightList: {
    flex: 1,
    height: 200,
    justifyContent: 'space-between',
  },
  weightItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  selectedWeightItem: {
    backgroundColor: '#4CAF50',
  },
  weightText: {
    ...FontStyles.bodyMedium,
    color: '#666',
    textAlign: 'center',
  },
  selectedWeightText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bmiInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  bmiTitle: {
    ...FontStyles.h4,
    color: '#333',
    marginBottom: 8,
  },
  bmiDescription: {
    ...FontStyles.bodyMedium,
    color: '#666',
    textAlign: 'center',
  },
}); 