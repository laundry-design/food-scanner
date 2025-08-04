import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: 40,
  },
  customContent: {
    width: '100%',
    alignItems: 'center',
  },
});