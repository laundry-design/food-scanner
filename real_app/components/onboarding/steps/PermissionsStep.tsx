import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import OnboardingScreen from '../OnboardingScreen';
import OnboardingButton from '../OnboardingButton';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PermissionsStep() {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  const requestCameraPermission = async () => {
    // In a real app, you would request actual camera permissions here
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setCameraPermission(true);
      Alert.alert('Success', 'Camera permission granted!');
    }, 500);
  };

  const requestNotificationPermission = async () => {
    // In a real app, you would request actual notification permissions here
    setTimeout(() => {
      setNotificationPermission(true);
      Alert.alert('Success', 'Notification permission granted!');
    }, 500);
  };

  return (
    <OnboardingScreen
      title="Permissions"
      subtitle="We need a few permissions to provide you with the best experience"
    >
      <View style={styles.permissionsContainer}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.permissionItem}
        >
          <View style={styles.permissionInfo}>
            <View style={[styles.iconContainer, cameraPermission && styles.grantedIconContainer]}>
              <IconSymbol 
                name="camera.fill" 
                size={24} 
                color={cameraPermission ? "#FFFFFF" : "#FF6B35"} 
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText style={styles.permissionTitle}>
                Camera Access
              </ThemedText>
              <ThemedText style={styles.permissionDescription}>
                Required to scan and analyze your food
              </ThemedText>
            </View>
          </View>
          <OnboardingButton
            title={cameraPermission ? "Granted" : "Allow Camera"}
            onPress={requestCameraPermission}
            variant={cameraPermission ? "secondary" : "primary"}
            disabled={cameraPermission}
            style={styles.permissionButton}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.permissionItem}
        >
          <View style={styles.permissionInfo}>
            <View style={[styles.iconContainer, notificationPermission && styles.grantedIconContainer]}>
              <IconSymbol 
                name="bell.fill" 
                size={24} 
                color={notificationPermission ? "#FFFFFF" : "#FF6B35"} 
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText style={styles.permissionTitle}>
                Notifications
              </ThemedText>
              <ThemedText style={styles.permissionDescription}>
                Get reminders and health tips
              </ThemedText>
            </View>
          </View>
          <OnboardingButton
            title={notificationPermission ? "Granted" : "Allow Notifications"}
            onPress={requestNotificationPermission}
            variant={notificationPermission ? "secondary" : "primary"}
            disabled={notificationPermission}
            style={styles.permissionButton}
          />
        </Animated.View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  permissionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  permissionItem: {
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  grantedIconContainer: {
    backgroundColor: '#FF6B35',
  },
  textContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  permissionButton: {
    width: '100%',
    height: 48,
  },
});