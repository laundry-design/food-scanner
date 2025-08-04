import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DailyQuoteData } from '@/types/home';
import GradientView from './GradientView';

interface DailyQuoteProps {
  quoteData: DailyQuoteData;
}

const DailyQuote: React.FC<DailyQuoteProps> = ({ quoteData }) => {
  return (
    <View style={styles.container}>
      <GradientView
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.quoteContainer}>
          <Ionicons 
            name="chatbubble-ellipses" 
            size={24} 
            color="rgba(255, 255, 255, 0.6)" 
            style={styles.quoteIcon}
          />
          <Text style={styles.quoteText}>{quoteData.quote}</Text>
          <Text style={styles.author}>— {quoteData.author}</Text>
        </View>
      </GradientView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradient: {
    padding: 20,
    position: 'relative',
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
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
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