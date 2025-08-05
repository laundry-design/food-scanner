import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontStyles } from '@/constants/Fonts';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function OnboardingScreen({ title, subtitle, children }: OnboardingScreenProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {subtitle}
        </ThemedText>
        {children && (
          <View style={styles.customContent}>
            {children}
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  title: {
    ...FontStyles.h1,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    ...FontStyles.bodyLarge,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 40,
  },
  customContent: {
    width: '100%',
    alignItems: 'center',
  },
});