import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import OnboardingScreen from '../OnboardingScreen';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function GetStartedStep() {
  return (
    <OnboardingScreen
      title="You're All Set!"
      subtitle="Start your journey to better nutrition and healthier eating habits"
    >
      <Animated.View 
        entering={FadeInUp.delay(300).duration(800)}
        style={styles.celebrationContainer}
      >
        <View style={styles.iconCircle}>
          <IconSymbol 
            name="checkmark.circle.fill" 
            size={80} 
            color="#4CAF50" 
          />
        </View>
        
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.sparklesContainer}
        >
          <IconSymbol 
            name="sparkles" 
            size={40} 
            color="#FFD700" 
            style={[styles.sparkle, styles.sparkle1]} 
          />
          <IconSymbol 
            name="sparkles" 
            size={30} 
            color="#FFD700" 
            style={[styles.sparkle, styles.sparkle2]} 
          />
          <IconSymbol 
            name="sparkles" 
            size={35} 
            color="#FFD700" 
            style={[styles.sparkle, styles.sparkle3]} 
          />
        </Animated.View>
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  celebrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    position: 'relative',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparklesContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 20,
    right: 30,
  },
  sparkle2: {
    bottom: 30,
    left: 20,
  },
  sparkle3: {
    top: 60,
    left: 10,
  },
});