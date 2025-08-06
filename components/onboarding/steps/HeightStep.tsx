import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface HeightStepProps {
  height: number;
  onHeightChange: (height: number) => void;
}

export default function HeightStep({ height, onHeightChange }: HeightStepProps) {
  const heightRange = Array.from({ length: 81 }, (_, i) => i + 140); // 140 to 220 cm
  const displayRange = heightRange.slice(Math.max(0, height - 140), Math.min(heightRange.length, height - 140 + 20));

  return (
    <View style={styles.container}>
      {/* Current Height Display */}
      <View style={styles.currentHeightContainer}>
        <Text style={styles.currentHeight}>{height} cm</Text>
      </View>

      {/* Height Ruler */}
      <View style={styles.rulerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.rulerContent}
          snapToInterval={40}
          decelerationRate="fast"
        >
          {displayRange.map((heightValue) => (
            <TouchableOpacity
              key={heightValue}
              style={[
                styles.heightMark,
                heightValue === height && styles.selectedHeightMark,
              ]}
              onPress={() => onHeightChange(heightValue)}
            >
              <View style={styles.markLine} />
              <Text
                style={[
                  styles.heightText,
                  heightValue === height && styles.selectedHeightText,
                ]}
              >
                {heightValue}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Selection Indicator */}
        <View style={styles.selectionIndicator}>
          <Text style={styles.indicatorText}>▶</Text>
        </View>
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
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  rulerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 300,
  },
  rulerContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  heightMark: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  selectedHeightMark: {
    backgroundColor: '#8b7cf6',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  markLine: {
    width: 2,
    height: 20,
    backgroundColor: '#666',
    marginBottom: 5,
  },
  heightText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  selectedHeightText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectionIndicator: {
    marginLeft: 20,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 16,
    color: '#c4ff47',
    fontWeight: 'bold',
  },
}); 