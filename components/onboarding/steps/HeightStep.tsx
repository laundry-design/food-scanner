import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface HeightStepProps {
  height: number;
  onHeightChange: (height: number) => void;
}

export default function HeightStep({ height, onHeightChange }: HeightStepProps) {
  const heightRange = Array.from({ length: 81 }, (_, i) => i + 140); // 140 to 220 cm
  
  // Ensure height is within the valid range
  const clampedHeight = Math.max(140, Math.min(220, height));
  const displayRange = heightRange.slice(Math.max(0, clampedHeight - 140 - 30), Math.min(heightRange.length, clampedHeight - 140 + 30));

  return (
    <View style={styles.container}>
      {/* Current Height Display */}
      <View style={styles.currentHeightContainer}>
        <Text style={styles.currentHeight}>{clampedHeight}</Text>
        <View style={styles.heightIndicator}>
          <View style={styles.triangle} />
        </View>
      </View>

      {/* Height Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={60}
          decelerationRate="fast"
        >
          {displayRange.map((heightValue) => (
            <TouchableOpacity
              key={heightValue}
              style={[
                styles.heightOption,
                heightValue === clampedHeight && styles.selectedHeightOption,
              ]}
              onPress={() => onHeightChange(heightValue)}
            >
              <Text
                style={[
                  styles.heightOptionText,
                  heightValue === clampedHeight && styles.selectedHeightOptionText,
                ]}
              >
                {heightValue}
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
  currentHeightContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  currentHeight: {
    fontSize: 96,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  heightIndicator: {
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
    borderBottomColor: '#f67300',
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
  heightOption: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedHeightOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  heightOptionText: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.5,
  },
  selectedHeightOptionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 1,
  },
}); 