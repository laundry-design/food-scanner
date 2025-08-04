import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AIScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">AI Assistant</ThemedText>
      <ThemedText>Your AI nutrition assistant!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 120, // Account for floating tab bar
  },
});