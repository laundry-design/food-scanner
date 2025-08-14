import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DailyQuoteData } from '@/types/home';
import GradientView from './GradientView';
import { Colors } from '@/constants/Colors';

import HatImage from '@/assets/images/home/cap.png'; // your hat image

interface DailyQuoteProps {
  quoteData: DailyQuoteData;
}

const DailyQuote: React.FC<DailyQuoteProps> = ({ quoteData }) => {
  return (
    <View style={styles.wrapper}>
      {/* Hat image on top */}
      <Image source={HatImage} style={styles.hat} resizeMode="contain" />

      {/* Quote box */}
      <View style={styles.container}>
        <GradientView
          colors={[Colors.light.primaryColor, Colors.light.primaryColor]}
          style={styles.gradient}
        >
          <View style={styles.quoteContainer}>
            {/* <Ionicons
              name="chatbubble-ellipses"
              size={24}
              color="rgba(255, 255, 255, 0.6)"
              style={styles.quoteIcon}
            /> */}
            <Text style={styles.quoteText}>{quoteData.quote}</Text>
            <Text style={styles.author}>— {quoteData.author}</Text>
          </View>
        </GradientView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginVertical: 14,

  },
  container: {
    borderRadius: 16,
    overflow: 'hidden', // keeps gradient corners rounded
  },
  gradient: {
    padding: 20,
    position: 'relative',
  },
  hat: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: -40, // how far above the box
    right: -25,
    zIndex: 2,
    transform: [{ rotate: '15deg' }], // tilt the hat like screenshot
  },
  quoteContainer: {
    alignItems: 'center',
  },
  quoteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.primaryTextOnPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default DailyQuote;
