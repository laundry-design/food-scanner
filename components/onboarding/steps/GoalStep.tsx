import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GoalStepProps {
  selectedGoal: string;
  onSelect: (goal: string) => void;
}

const goals = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'gain_weight', label: 'Gain Weight' },
  { value: 'muscle_mass_gain', label: 'Muscle Mass Gain' },
  { value: 'shape_body', label: 'Shape Body' },
  { value: 'others', label: 'Others' },
];

export default function GoalStep({ selectedGoal, onSelect }: GoalStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.value}
            style={[
              styles.optionButton,
              selectedGoal === goal.value && styles.selectedOptionButton,
            ]}
            onPress={() => onSelect(goal.value)}
          >
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionLabel,
                  selectedGoal === goal.value && styles.selectedOptionLabel,
                ]}
              >
                {goal.label}
              </Text>
            </View>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioButton,
                  selectedGoal === goal.value && styles.selectedRadioButton,
                ]}
              >
                {selectedGoal === goal.value && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  selectedOptionButton: {
    backgroundColor: '#8b7cf6',
    borderColor: '#8b7cf6',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  selectedOptionLabel: {
    fontWeight: 'bold',
  },
  radioContainer: {
    marginLeft: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: 'white',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
}); 