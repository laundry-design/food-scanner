import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MacroCardProps } from '@/types/home';
import GradientView from './GradientView';
import { Colors } from '@/constants/Colors';

const MacroCard: React.FC<MacroCardProps> = ({
  title,
  value,
  current = 0,
  target = 100,
  gradientColors,
  showProgress = false,
}) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <GradientView colors={gradientColors} style={styles.gradient}>
        <Text style={styles.title}>{title}</Text>

        {value && <Text style={styles.value}>{value}</Text>}

        {showProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${percentage}%` }
                ]}
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
              <Text style={styles.percentageText}>100%</Text>
            </View>
          </View>
        )}
      </GradientView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000', // Black text
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000', // Black text
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#FFD9B3', // Light orange background
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.light.primaryColor, // Orange fill
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000', // Black text
  },
});

export default MacroCard;
