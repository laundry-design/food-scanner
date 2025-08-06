import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GenderStepProps {
  selectedGender: string;
  onSelect: (gender: string) => void;
}

export default function GenderStep({ selectedGender, onSelect }: GenderStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {/* Male Option */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedGender === 'male' && styles.selectedOption,
          ]}
          onPress={() => onSelect('male')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.genderSymbol}>♂</Text>
          </View>
          <Text style={styles.optionLabel}>Male</Text>
        </TouchableOpacity>

        {/* Female Option */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedGender === 'female' && styles.selectedOption,
          ]}
          onPress={() => onSelect('female')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.genderSymbol}>♀</Text>
          </View>
          <Text style={styles.optionLabel}>Female</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: 20,
  },
  optionButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  selectedOption: {
    // Selected state styling
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  genderSymbol: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  optionLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
}); 