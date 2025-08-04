import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GradientViewProps {
  colors: string[];
  style?: any;
  children?: React.ReactNode;
}

const GradientView: React.FC<GradientViewProps> = ({ colors, style, children }) => {
  // For now, we'll use a solid color as fallback
  // In a production app, you'd want to implement a proper gradient
  const primaryColor = colors[0] || '#667eea';
  
  return (
    <View style={[styles.container, { backgroundColor: primaryColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default GradientView; 