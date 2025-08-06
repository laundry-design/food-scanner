import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActivityStepProps {
  selectedActivity: string;
  onSelect: (activity: string) => void;
}

const activities = [
  { value: 'beginner', label: 'Beginner', style: 'white_rounded' },
  { value: 'intermediate', label: 'Intermediate', style: 'outline_rounded' },
  { value: 'advance', label: 'Advance', style: 'accent_rounded' },
];

export default function ActivityStep({ selectedActivity, onSelect }: ActivityStepProps) {
  const getButtonStyle = (activity: typeof activities[0]) => {
    if (selectedActivity === activity.value) {
      return styles.selectedActivityButton;
    }
    
    switch (activity.style) {
      case 'white_rounded':
        return styles.whiteButton;
      case 'outline_rounded':
        return styles.outlineButton;
      case 'accent_rounded':
        return styles.accentButton;
      default:
        return styles.whiteButton;
    }
  };

  const getTextStyle = (activity: typeof activities[0]) => {
    if (selectedActivity === activity.value) {
      return styles.selectedActivityText;
    }
    
    switch (activity.style) {
      case 'white_rounded':
        return styles.whiteButtonText;
      case 'outline_rounded':
        return styles.outlineButtonText;
      case 'accent_rounded':
        return styles.accentButtonText;
      default:
        return styles.whiteButtonText;
    }
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
  whiteButton: {
    backgroundColor: 'white',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
  },
  accentButton: {
    backgroundColor: '#c4ff47',
  },
  selectedActivityButton: {
    backgroundColor: '#c4ff47',
  },
  activityLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  whiteButtonText: {
    color: '#333',
  },
  outlineButtonText: {
    color: '#666',
  },
  accentButtonText: {
    color: '#333',
  },
  selectedActivityText: {
    color: '#333',
    fontWeight: 'bold',
  },
}); 