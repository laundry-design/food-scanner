import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontStyles } from '@/constants/Fonts';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import OnboardingScreen from '../OnboardingScreen';

const features = [
  {
    icon: 'camera.fill',
    title: 'Scan Food',
    description: 'Take a photo of your meal',
  },
  {
    icon: 'sparkles',
    title: 'AI Analysis',
    description: 'Get instant nutritional insights',
  },
  {
    icon: 'chart.bar.fill',
    title: 'Track Progress',
    description: 'Monitor your health goals',
  },
];

export default function FeaturesStep() {
  return (
    <OnboardingScreen
      title="Powerful Features"
      subtitle="Everything you need to maintain a healthy lifestyle"
    >
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(200 + index * 100).duration(600)}
            style={styles.featureItem}
          >
            <View style={styles.iconContainer}>
              <IconSymbol 
                name={feature.icon} 
                size={32} 
                color="#FF6B35" 
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText style={styles.featureTitle}>
                {feature.title}
              </ThemedText>
              <ThemedText style={styles.featureDescription}>
                {feature.description}
              </ThemedText>
            </View>
          </Animated.View>
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    ...FontStyles.bodyLarge,
    fontFamily: FontStyles.h4.fontFamily, // Use semiBold for titles
    marginBottom: 4,
  },
  featureDescription: {
    ...FontStyles.bodySmall,
    opacity: 0.7,
  },
});