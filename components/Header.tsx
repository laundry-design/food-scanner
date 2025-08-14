import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotificationIcon?: boolean;
  layout?: 'centered' | 'left-aligned';
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  backgroundColor?: string;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  showNotificationIcon = true,
  layout = 'centered',
  onBackPress,
  onNotificationPress,
  backgroundColor = Colors.light.background
}: HeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push('/(tabs)/notifications');
    }
  };

const colorOrange = useThemeColor({light: Colors.light.primaryColor , dark: Colors.dark.primaryColor}, 'primaryColor');


  return (
    // <SafeAreaView style={[styles.container, { backgroundColor }]}>
    
        // Left-aligned layout (like Change Password screen)
        <View style={[styles.header, { justifyContent: 'flex-start' }]}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButtonPlain}
              onPress={handleBackPress}
              accessibilityLabel="Go back"
              accessibilityHint="Double tap to return to previous screen"
            >
              <Feather name="chevron-left" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          <Text style={styles.titleLeftAligned}>{title}</Text>
        </View>
      // ) : (
      //   // Centered layout (original design)
      //   <View style={[styles.header, { justifyContent: 'space-between' }]}>
      //     {/* Left side - Back button or spacer */}
      //     <View style={styles.leftSection}>
      //       {showBackButton ? (
      //         <TouchableOpacity 
      //           style={styles.backButton}
      //           onPress={handleBackPress}
      //           accessibilityLabel="Go back"
      //           accessibilityHint="Double tap to return to previous screen"
      //         >
      //           <Feather name="chevron-left" size={18} color="#ffffff" />
      //         </TouchableOpacity>
      //       ) : (
      //         <View style={styles.spacer} />
      //       )}
      //     </View>

      //     {/* Center - Title */}
      //     <View style={styles.centerSection}>
      //       <Text style={styles.title}>{title}</Text>
      //     </View>

      //     {/* Right side - Notification icon or spacer */}
      //     <View style={styles.rightSection}>
      //       {showNotificationIcon ? (
      //         <TouchableOpacity 
      //           style={styles.notificationButton}
      //           onPress={handleNotificationPress}
      //           accessibilityLabel="Notifications"
      //           accessibilityHint="Double tap to view notifications"
      //         >
      //           <Feather name="bell" size={18} color="#ffffff" />
      //         </TouchableOpacity>
      //       ) : (
      //         <View style={styles.spacer} />
      //       )}
      //     </View>
      //   </View>
      // )}
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
height:20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  leftSection: {
    width: 32,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 32,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primaryColor,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleLeftAligned: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.primaryColor,
    textAlign: 'left',
    marginLeft: 16,
  },
  backButtonPlain: {
    padding: 8,
    marginRight: 8,
  },
  spacer: {
    width: 32,
  },
}); 