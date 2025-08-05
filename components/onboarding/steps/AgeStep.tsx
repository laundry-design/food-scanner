import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface AgeStepProps {
  onAgeChange?: (age: number) => void;
}

export default function AgeStep({ onAgeChange }: AgeStepProps) {
  const [age, setAge] = useState(25);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    onAgeChange?.(newAge);
  };

  const ages = Array.from({ length: 69 }, (_, i) => i + 12); // 12 to 80

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          What's your age?
        </ThemedText>
        
        <View style={styles.sliderContainer}>
          <View style={styles.valueDisplay}>
            <ThemedText style={styles.valueText}>
              {age}
            </ThemedText>
            <ThemedText style={styles.unitText}>
              years
            </ThemedText>
          </View>
          
          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>
          
          <View style={styles.ageList}>
            {ages.map((ageValue) => (
              <TouchableOpacity
                key={ageValue}
                style={[
                  styles.ageItem,
                  age === ageValue && styles.selectedAgeItem
                ]}
                onPress={() => handleAgeChange(ageValue)}
              >
                <ThemedText style={[
                  styles.ageText,
                  age === ageValue && styles.selectedAgeText
                ]}>
                  {ageValue}
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
    marginBottom: 48,
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
    minWidth: 80,
  },
  valueText: {
    ...FontStyles.h1,
    fontSize: 48,
    color: '#FFA500',
  },
  unitText: {
    ...FontStyles.bodyMedium,
    color: '#666',
    marginTop: 4,
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
    height: '50%', // This will be calculated based on age
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
  ageList: {
    flex: 1,
    height: 300,
    justifyContent: 'space-between',
  },
  ageItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  selectedAgeItem: {
    backgroundColor: '#4CAF50',
  },
  ageText: {
    ...FontStyles.bodyMedium,
    color: '#666',
    textAlign: 'center',
  },
  selectedAgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 