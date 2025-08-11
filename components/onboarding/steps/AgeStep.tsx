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
          <View style={styles.triangle} />
        </View>
      </View>

      {/* Age Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={60}
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
    fontSize: 96,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ageIndicator: {
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#7FFF00',
  },
  sliderContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#f67300',
    borderRadius: 15,
    marginBottom: 30,
  },
  sliderContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
  },
  ageOption: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedAgeOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  ageOptionText: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.5,
  },
  selectedAgeOptionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 1,
  },
}); 