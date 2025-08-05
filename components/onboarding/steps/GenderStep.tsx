import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const genders = ["Male", "Female", "Other"];

interface GenderStepProps {
  onGenderSelect?: (gender: string) => void;
}

export default function GenderStep({ onGenderSelect }: GenderStepProps) {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    onGenderSelect?.(gender);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          What's your official gender?
        </ThemedText>
        
        <View style={styles.optionsContainer}>
          {genders.map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedGender === gender && styles.selectedOption
              ]}
              onPress={() => handleGenderSelect(gender)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radio,
                  selectedGender === gender && styles.selectedRadio
                ]}>
                  {selectedGender === gender && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
              <View style={styles.optionContent}>
                <ThemedText style={[
                  styles.optionLabel,
                  selectedGender === gender && styles.selectedOptionLabel
                ]}>
                  {gender}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
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
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  radioContainer: {
    marginRight: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#fff',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...FontStyles.h4,
    color: '#333',
  },
  selectedOptionLabel: {
    color: '#fff',
  },
}); 