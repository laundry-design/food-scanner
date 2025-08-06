import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface AgeStepProps {
  age: number;
  onAgeChange: (age: number) => void;
}

export default function AgeStep({ age, onAgeChange }: AgeStepProps) {
  const ageRange = Array.from({ length: 65 }, (_, i) => i + 16); // 16 to 80
  const displayRange = ageRange.slice(Math.max(0, age - 30), Math.min(ageRange.length, age + 30));

  return (
    <View style={styles.container}>
      {/* Current Age Display */}
      <View style={styles.currentAgeContainer}>
        <Text style={styles.currentAge}>{age}</Text>
        <View style={styles.ageIndicator}>
          <Text style={styles.ageIndicatorText}>▲</Text>
        </View>
      </View>

      {/* Age Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={40}
          decelerationRate="fast"
        >
          {displayRange.map((ageValue) => (
            <TouchableOpacity
              key={ageValue}
              style={[
                styles.ageOption,
                ageValue === age && styles.selectedAgeOption,
              ]}
              onPress={() => onAgeChange(ageValue)}
            >
              <Text
                style={[
                  styles.ageOptionText,
                  ageValue === age && styles.selectedAgeOptionText,
                ]}
              >
                {ageValue}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  currentAgeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  currentAge: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  ageIndicator: {
    alignItems: 'center',
  },
  ageIndicatorText: {
    fontSize: 16,
    color: '#c4ff47',
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '100%',
    height: 60,
  },
  sliderContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ageOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  selectedAgeOption: {
    backgroundColor: '#8b7cf6',
  },
  ageOptionText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  selectedAgeOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 