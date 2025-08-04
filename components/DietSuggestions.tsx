import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DietSuggestionCard from './DietSuggestionCard';
import { DietSuggestion } from '@/types/home';

interface DietSuggestionsProps {
  suggestions: DietSuggestion[];
}

const DietSuggestions: React.FC<DietSuggestionsProps> = ({ suggestions }) => {
  const handleActionPress = (suggestionId: string) => {
    // Handle different actions based on suggestion type
    switch (suggestionId) {
      case 'protein':
        console.log('Navigate to protein foods');
        break;
      case 'hydration':
        console.log('Set hydration reminder');
        break;
      case 'timing':
        console.log('Open meal planner');
        break;
      default:
        console.log('Default action');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diet Suggestions</Text>
      
      {suggestions.map((suggestion) => (
        <DietSuggestionCard
          key={suggestion.id}
          icon={suggestion.icon}
          title={suggestion.title}
          description={suggestion.description}
          actionText={suggestion.actionText}
          gradientColors={suggestion.gradientColors}
          backgroundColor=""
          onActionPress={() => handleActionPress(suggestion.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
});

export default DietSuggestions; 