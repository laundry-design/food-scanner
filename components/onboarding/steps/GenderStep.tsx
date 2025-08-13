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
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  optionButton: {
    alignItems: 'center',
    paddingVertical: 20,
    flex: 1,
  },
  selectedOption: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFA500',
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  genderSymbol: {
    fontSize: 40,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  optionLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
}); 