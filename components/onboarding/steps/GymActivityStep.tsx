import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const gymActivities = ["Never", "1-2 times/week", "3-5 times/week", "Daily"];

interface GymActivityStepProps {
  onActivitySelect?: (activity: string) => void;
}

export default function GymActivityStep({ onActivitySelect }: GymActivityStepProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity);
    onActivitySelect?.(activity);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          How active are you at the gym?
        </ThemedText>
        
        <View style={styles.optionsContainer}>
          {gymActivities.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedActivity === activity && styles.selectedOption
              ]}
              onPress={() => handleActivitySelect(activity)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radio,
                  selectedActivity === activity && styles.selectedRadio
                ]}>
                  {selectedActivity === activity && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
              <View style={styles.optionContent}>
                <ThemedText style={[
                  styles.optionLabel,
                  selectedActivity === activity && styles.selectedOptionLabel
                ]}>
                  {activity}
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