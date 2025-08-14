import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import MacroCard from './MacroCard';
import { MacroData } from '@/types/home';
import { Colors } from '@/constants/Colors';

interface MacroOverviewProps {
  macroData: MacroData;
}

const MacroOverview: React.FC<MacroOverviewProps> = ({ macroData }) => {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const macroCards = [
    {
      title: 'Calories',
      value: `${macroData.calories.current.toLocaleString()} kcal`,
      current: macroData.calories.current,
      target: macroData.calories.target,
      gradientColors: [Colors.light.background, Colors.light.background],
      textColor: '#ffffff',
      showProgress: false,
    },
    {
      title: 'Protein',
      current: macroData.protein.current,
      target: macroData.protein.target,
      gradientColors: [Colors.light.background, Colors.light.background],
      textColor: '#ffffff',
      showProgress: true,
    },
    {
      title: 'Carbs',
      current: macroData.carbs.current,
      target: macroData.carbs.target,
      gradientColors: [Colors.light.background, Colors.light.background],
      textColor: '#1f2937',
      showProgress: true,
    },
    {
      title: 'Fat',
      current: macroData.fat.current,
      target: macroData.fat.target,
      gradientColors: [Colors.light.primaryLight, Colors.light.primaryLight],
      textColor: '#ffffff',
      showProgress: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % macroCards.length);
    }, 8000); // slower cycle
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // smooth fade
      useNativeDriver: false,
    }).start();
  }, [highlightIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Overview</Text>

      <View style={styles.grid}>
        {macroCards.map((card, index) => {
          const isHighlighted = index === highlightIndex;

          const backgroundColor = isHighlighted
            ? fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#ffffff', '#f3f4f6'], // light grey highlight
              })
            : '#ffffff';

          return (
            <Animated.View
              key={index}
              style={[
                styles.cardContainer,
                { backgroundColor },
                isHighlighted && styles.highlightShadow,
              ]}
            >
              <MacroCard {...card} />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    paddingLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardContainer: {
    width: '48%',
    borderRadius: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  highlightShadow: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default MacroOverview;
