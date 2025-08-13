import { ThemedText } from '@/components/ThemedText';
import { FontStyles } from '@/constants/Fonts';
import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  style?: any;
}

export default function ProgressIndicator({ currentStep, totalSteps, style }: ProgressIndicatorProps) {
  const progress = currentStep / totalSteps;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress * 100}%`, {
        duration: 300,
      }),
    };
  });

  return (
    <View style={[styles.container, style]}>
      {/* Simple Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <Animated.View style={[styles.progressBarFill, animatedStyle]} />
      </View>
      
      {/* Step Counter */}
      <View style={styles.stepCounter}>
        <ThemedText style={styles.stepText}>
          {currentStep} OF {totalSteps}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressBarContainer: {
    width: width * 0.8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'visible',
    marginBottom: 15,
    position: 'relative',
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  stepCounter: {
    marginBottom: 10,
  },
  stepText: {
    ...FontStyles.bodyLarge,
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 14,
  },
});