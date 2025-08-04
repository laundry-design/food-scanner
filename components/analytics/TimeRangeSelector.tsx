import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TimeRange } from '@/types/nutrition';

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onSelect: (range: TimeRange) => void;
}

export function TimeRangeSelector({ selected, onSelect }: TimeRangeSelectorProps) {
  const options: TimeRange[] = ['Daily', 'Weekly', 'Monthly'];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selected === option && styles.selectedOption
          ]}
          onPress={() => onSelect(option)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.optionText,
            selected === option && styles.selectedOptionText
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 4,
    marginVertical: 16,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f97316',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  selectedOptionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
}); 