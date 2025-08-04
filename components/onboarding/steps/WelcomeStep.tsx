import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import OnboardingScreen from '../OnboardingScreen';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WelcomeStep() {
  return (
    <OnboardingScreen
      title="Welcome to FoodScanner"
      subtitle="Discover the nutritional value of your meals with AI-powered food recognition"
    >
      <Animated.View 
        entering={FadeInDown.delay(300).duration(600)}
        style={styles.iconContainer}
      >
        <IconSymbol 
          name="camera.fill" 
          size={120} 
          color="#FF6B35" 
        />
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
});