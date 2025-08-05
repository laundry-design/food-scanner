import { ThemedText } from '@/components/ThemedText';
import { FontStyles } from '@/constants/Fonts';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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

  const shipAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(progress * (width * 0.7 - 40), {
      duration: 300,
    });
    
    return {
      transform: [{ translateX }],
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
      {/* Progress Bar with Pirate Ship */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <Animated.View style={[styles.progressBarFill, animatedStyle]} />
        
        {/* Pirate Ship */}
        <Animated.View style={[styles.shipContainer, shipAnimatedStyle]}>
          <View style={styles.ship}>
            {/* Ship Hull */}
            <View style={styles.shipHull} />
            {/* Ship Sails */}
            <View style={styles.shipSails}>
              <View style={styles.sail} />
              <View style={styles.sail} />
            </View>
            {/* Pirate Flag */}
            <View style={styles.flag}>
              <View style={styles.flagBackground} />
              <View style={styles.skull} />
            </View>
          </View>
        </Animated.View>
      </View>
      
      {/* Step Counter */}
      <View style={styles.stepCounter}>
        <ThemedText style={styles.stepText}>
          {currentStep} OF {totalSteps}
        </ThemedText>
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
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'visible',
    marginBottom: 10,
    position: 'relative',
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 10,
  },
  shipContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: 40,
    height: 40,
  },
  ship: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  shipHull: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    width: 30,
    height: 15,
    backgroundColor: '#8B4513',
    borderRadius: 15,
  },
  shipSails: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    flexDirection: 'row',
    gap: 2,
  },
  sail: {
    width: 8,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  flag: {
    position: 'absolute',
    top: -5,
    right: 0,
    width: 12,
    height: 8,
  },
  flagBackground: {
    width: 12,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  skull: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 8,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  stepCounter: {
    marginBottom: 10,
  },
  stepText: {
    ...FontStyles.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
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
    backgroundColor: '#FFA500',
  },
});