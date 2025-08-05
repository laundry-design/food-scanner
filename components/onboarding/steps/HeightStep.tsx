import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface HeightStepProps {
  onHeightChange?: (height: number, unit: string) => void;
}

export default function HeightStep({ onHeightChange }: HeightStepProps) {
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState('CM');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    onHeightChange?.(newHeight, unit);
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    onHeightChange?.(height, newUnit);
  };

  const heights = Array.from({ length: 71 }, (_, i) => i + 140); // 140 to 210

  const formatHeight = (value: number, unit: string) => {
    if (unit === 'FT') {
      const feet = Math.floor(value / 30.48);
      const inches = Math.round((value % 30.48) / 2.54);
      return `${feet}-${inches} FT`;
    }
    return `${value} ${unit}`;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          What's your height?
        </ThemedText>
        
        <View style={styles.unitSelector}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === 'FT' && styles.selectedUnitButton
            ]}
            onPress={() => handleUnitChange('FT')}
          >
            <ThemedText style={[
              styles.unitButtonText,
              unit === 'FT' && styles.selectedUnitButtonText
            ]}>
              FT
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === 'CM' && styles.selectedUnitButton
            ]}
            onPress={() => handleUnitChange('CM')}
          >
            <ThemedText style={[
              styles.unitButtonText,
              unit === 'CM' && styles.selectedUnitButtonText
            ]}>
              CM
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sliderContainer}>
          <View style={styles.valueDisplay}>
            <ThemedText style={styles.valueText}>
              {formatHeight(height, unit)}
            </ThemedText>
          </View>
          
          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>
          
          <View style={styles.heightList}>
            {heights.map((heightValue) => (
              <TouchableOpacity
                key={heightValue}
                style={[
                  styles.heightItem,
                  height === heightValue && styles.selectedHeightItem
                ]}
                onPress={() => handleHeightChange(heightValue)}
              >
                <ThemedText style={[
                  styles.heightText,
                  height === heightValue && styles.selectedHeightText
                ]}>
                  {unit === 'FT' ? formatHeight(heightValue, unit) : heightValue}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
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
    height: 400,
  },
  valueDisplay: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 120,
  },
  valueText: {
    ...FontStyles.h1,
    fontSize: 48,
    color: '#FFA500',
  },
  sliderTrack: {
    width: 8,
    height: 300,
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
  heightList: {
    flex: 1,
    height: 300,
    justifyContent: 'space-between',
  },
  heightItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  selectedHeightItem: {
    backgroundColor: '#4CAF50',
  },
  heightText: {
    ...FontStyles.bodyMedium,
    color: '#666',
    textAlign: 'center',
  },
  selectedHeightText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 