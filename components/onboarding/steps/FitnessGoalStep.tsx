import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const fitnessGoals = ["Lose weight", "Build muscle", "Stay active", "Improve stamina"];

interface FitnessGoalStepProps {
  onGoalSelect?: (goal: string) => void;
}

export default function FitnessGoalStep({ onGoalSelect }: FitnessGoalStepProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    onGoalSelect?.(goal);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          What's your fitness goal?
        </ThemedText>
        
        <View style={styles.optionsContainer}>
          {fitnessGoals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedGoal === goal && styles.selectedOption
              ]}
              onPress={() => handleGoalSelect(goal)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radio,
                  selectedGoal === goal && styles.selectedRadio
                ]}>
                  {selectedGoal === goal && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
              <View style={styles.optionContent}>
                <ThemedText style={[
                  styles.optionLabel,
                  selectedGoal === goal && styles.selectedOptionLabel
                ]}>
                  {goal}
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