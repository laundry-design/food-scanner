import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const plans = [
  { label: "Beginner", description: "5-10 min a day" },
  { label: "Intermediate", description: "15-30 min a day" },
  { label: "Advanced", description: "45+ min a day" }
];

interface PlanStepProps {
  onPlanSelect?: (plan: string) => void;
}

export default function PlanStep({ onPlanSelect }: PlanStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    onPlanSelect?.(plan);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          Choose your plan
        </ThemedText>
        
        <View style={styles.optionsContainer}>
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedPlan === plan.label && styles.selectedOption
              ]}
              onPress={() => handlePlanSelect(plan.label)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radio,
                  selectedPlan === plan.label && styles.selectedRadio
                ]}>
                  {selectedPlan === plan.label && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
              <View style={styles.optionContent}>
                <ThemedText style={[
                  styles.optionLabel,
                  selectedPlan === plan.label && styles.selectedOptionLabel
                ]}>
                  {plan.label}
                </ThemedText>
                <ThemedText style={[
                  styles.optionDescription,
                  selectedPlan === plan.label && styles.selectedOptionDescription
                ]}>
                  {plan.description}
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
    marginBottom: 4,
    color: '#333',
  },
  selectedOptionLabel: {
    color: '#fff',
  },
  optionDescription: {
    ...FontStyles.bodyMedium,
    color: '#666',
  },
  selectedOptionDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
}); 