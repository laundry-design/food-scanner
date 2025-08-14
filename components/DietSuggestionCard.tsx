import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DietSuggestionProps } from '@/types/home';
import GradientView from './GradientView';
import { Colors } from '@/constants/Colors';

const DietSuggestionCard: React.FC<DietSuggestionProps> = ({
  icon,
  title,
  description,
  actionText,
  gradientColors,
  onActionPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <GradientView
        colors={gradientColors}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={Colors.light.primaryColor} />
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      </GradientView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gradient: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 8,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: Colors.light.primaryColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DietSuggestionCard; 