import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppStores } from '@/hooks/useAppStores';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user, resetAndStartOnboarding } = useAppStores();

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will reset your onboarding data and start the onboarding process again. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAndStartOnboarding();
          },
        },
      ]
    );
  };

  const handleClearUserData = () => {
    Alert.alert(
      'Clear User Data',
      'This will completely clear all your user data. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await resetAndStartOnboarding();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Settings</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>User Information</ThemedText>
          {user && (
            <ThemedView style={styles.userInfo}>
              <ThemedText style={styles.infoText}>User ID: {user.id}</ThemedText>
              <ThemedText style={styles.infoText}>Plan: {user.plan}</ThemedText>
              <ThemedText style={styles.infoText}>Age: {user.age}</ThemedText>
              <ThemedText style={styles.infoText}>Gender: {user.gender}</ThemedText>
              <ThemedText style={styles.infoText}>Fitness Goal: {user.fitnessGoal}</ThemedText>
              <ThemedText style={styles.infoText}>Onboarding Completed: {user.isOnboardingCompleted ? 'Yes' : 'No'}</ThemedText>
              <ThemedText style={styles.infoText}>Created: {new Date(user.createdAt).toLocaleDateString()}</ThemedText>
              <ThemedText style={styles.infoText}>Last Updated: {new Date(user.updatedAt).toLocaleDateString()}</ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Actions</ThemedText>
          
          <TouchableOpacity style={styles.button} onPress={handleResetOnboarding}>
            <ThemedText style={styles.buttonText}>Reset Onboarding</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleClearUserData}>
            <ThemedText style={styles.buttonText}>Clear All User Data</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Match your app's background
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 120, // Account for floating tab bar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  userInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});