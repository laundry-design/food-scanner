import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  Extrapolate 
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

  const renderDots = () => {
    return Array.from({ length: totalSteps }, (_, index) => {
      const isActive = index < currentStep;
      const isCurrent = index === currentStep - 1;

      const dotAnimatedStyle = useAnimatedStyle(() => {
        const scale = isCurrent ? withTiming(1.2, { duration: 200 }) : withTiming(1, { duration: 200 });
        const opacity = isActive ? withTiming(1, { duration: 200 }) : withTiming(0.3, { duration: 200 });
        
        return {
          transform: [{ scale }],
          opacity,
        };
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            dotAnimatedStyle,
            isActive && styles.activeDot,
          ]}
        />
      );
    });
  };

  return (
    <View style={[styles.container, style]}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <Animated.View style={[styles.progressBarFill, animatedStyle]} />
      </View>
      
      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {renderDots()}
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
    width: width * 0.7,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6B35',
  },
});