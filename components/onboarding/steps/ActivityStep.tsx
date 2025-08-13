import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActivityStepProps {
  selectedActivity: string;
  onSelect: (activity: string) => void;
}

const activities = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advance', label: 'Advance' },
];

export default function ActivityStep({ selectedActivity, onSelect }: ActivityStepProps) {
  const getButtonStyle = (activity: typeof activities[0]) => {
    if (selectedActivity === activity.value) {
      return styles.selectedActivityButton;
    }
    return styles.defaultButton;
  };

  const getTextStyle = (activity: typeof activities[0]) => {
    if (selectedActivity === activity.value) {
      return styles.selectedActivityText;
    }
    return styles.defaultButtonText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.value}
            style={[
              styles.activityButton,
              getButtonStyle(activity),
            ]}
            onPress={() => onSelect(activity.value)}
          >
            <Text
              style={[
                styles.activityLabel,
                getTextStyle(activity),
              ]}
            >
              {activity.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  activityButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#333333',
  },
  selectedActivityButton: {
    backgroundColor: '#f67300',
  },
  activityLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultButtonText: {
    color: 'white',
  },
  selectedActivityText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 