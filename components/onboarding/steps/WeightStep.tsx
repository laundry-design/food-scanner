import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface WeightStepProps {
  weight: number;
  unit: 'KG' | 'LB';
  onWeightChange: (weight: number, unit: 'KG' | 'LB') => void;
}

export default function WeightStep({ weight, unit, onWeightChange }: WeightStepProps) {
  const weightRange = unit === 'KG' 
    ? Array.from({ length: 161 }, (_, i) => i + 40) // 40 to 200 KG
    : Array.from({ length: 161 }, (_, i) => i + 88); // 88 to 440 LB

  const displayRange = weightRange.slice(Math.max(0, weight - 2), Math.min(weightRange.length, weight + 3));

  const toggleUnit = () => {
    const newUnit = unit === 'KG' ? 'LB' : 'KG';
    let newWeight = weight;
    
    // Convert weight between units
    if (unit === 'KG' && newUnit === 'LB') {
      newWeight = Math.round(weight * 2.20462);
    } else if (unit === 'LB' && newUnit === 'KG') {
      newWeight = Math.round(weight / 2.20462);
    }
    
    onWeightChange(newWeight, newUnit);
  };

  return (
    <View style={styles.container}>
      {/* Unit Toggle */}
      <View style={styles.unitToggleContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === 'KG' && styles.selectedUnitButton,
          ]}
          onPress={() => onWeightChange(weight, 'KG')}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === 'KG' && styles.selectedUnitButtonText,
            ]}
          >
            KG
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === 'LB' && styles.selectedUnitButton,
          ]}
          onPress={() => onWeightChange(weight, 'LB')}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === 'LB' && styles.selectedUnitButtonText,
            ]}
          >
            LB
          </Text>
        </TouchableOpacity>
      </View>

      {/* Current Weight Display */}
      <View style={styles.currentWeightContainer}>
        <Text style={styles.currentWeight}>{weight}</Text>
        <Text style={styles.weightUnit}>{unit}</Text>
        <View style={styles.weightIndicator}>
          <Text style={styles.weightIndicatorText}>▲</Text>
        </View>
      </View>

      {/* Weight Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={40}
          decelerationRate="fast"
        >
          {displayRange.map((weightValue) => (
            <TouchableOpacity
              key={weightValue}
              style={[
                styles.weightOption,
                weightValue === weight && styles.selectedWeightOption,
              ]}
              onPress={() => onWeightChange(weightValue, unit)}
            >
              <Text
                style={[
                  styles.weightOptionText,
                  weightValue === weight && styles.selectedWeightOptionText,
                ]}
              >
                {weightValue}
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
  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 4,
    marginBottom: 40,
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedUnitButton: {
    backgroundColor: '#c4ff47',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  selectedUnitButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  currentWeightContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  currentWeight: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  weightUnit: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 8,
  },
  weightIndicator: {
    alignItems: 'center',
  },
  weightIndicatorText: {
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
  weightOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  selectedWeightOption: {
    backgroundColor: '#8b7cf6',
  },
  weightOptionText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  selectedWeightOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 