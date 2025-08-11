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

  // Ensure weight is within the valid range for the current unit
  const clampedWeight = Math.max(weightRange[0], Math.min(weightRange[weightRange.length - 1], weight));
  const displayRange = weightRange.slice(Math.max(0, clampedWeight - 30), Math.min(weightRange.length, clampedWeight + 30));

  const handleUnitChange = (newUnit: 'KG' | 'LB') => {
    let newWeight = weight;
    
    // Convert weight between units
    if (unit === 'KG' && newUnit === 'LB') {
      newWeight = Math.round(weight * 2.20462);
    } else if (unit === 'LB' && newUnit === 'KG') {
      newWeight = Math.round(weight / 2.20462);
    }
    
    // Ensure the converted weight is within the valid range for the new unit
    const newWeightRange = newUnit === 'KG' 
      ? Array.from({ length: 161 }, (_, i) => i + 40) // 40 to 200 KG
      : Array.from({ length: 161 }, (_, i) => i + 88); // 88 to 440 LB
    
    const clampedNewWeight = Math.max(newWeightRange[0], Math.min(newWeightRange[newWeightRange.length - 1], newWeight));
    
    onWeightChange(clampedNewWeight, newUnit);
  };

  return (
    <View style={styles.container}>
      {/* Current Weight Display */}
      <View style={styles.currentWeightContainer}>
        <Text style={styles.currentWeight}>{clampedWeight}</Text>
        <View style={styles.weightIndicator}>
          <View style={styles.triangle} />
        </View>
      </View>

      {/* Weight Slider */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={60}
          decelerationRate="fast"
        >
          {displayRange.map((weightValue) => (
            <TouchableOpacity
              key={weightValue}
              style={[
                styles.weightOption,
                weightValue === clampedWeight && styles.selectedWeightOption,
              ]}
              onPress={() => onWeightChange(weightValue, unit)}
            >
              <Text
                style={[
                  styles.weightOptionText,
                  weightValue === clampedWeight && styles.selectedWeightOptionText,
                ]}
              >
                {weightValue}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Unit Toggle */}
      <View style={styles.unitToggleContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === 'KG' && styles.selectedUnitButton,
          ]}
          onPress={() => handleUnitChange('KG')}
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
          onPress={() => handleUnitChange('LB')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWeightContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  currentWeight: {
    fontSize: 96,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  weightIndicator: {
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
  weightOption: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedWeightOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  weightOptionText: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.5,
  },
  selectedWeightOptionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 1,
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
    backgroundColor: '#f67300',
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
}); 