import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

interface NotificationItem {
  id: number;
  icon: string;
  message: string;
  type: string;
}

const notificationsData: NotificationItem[] = [
  {
    id: 1,
    icon: 'bell',
    message: "It's time for your Lunch - Don't forget to log your meal.",
    type: 'meal_reminder'
  },
  {
    id: 2,
    icon: 'bell',
    message: "You're doing great! Try adding more fiber-rich foods to hit today's target.",
    type: 'encouragement'
  },
  {
    id: 3,
    icon: 'bell',
    message: "You've hit 80% of your daily calorie goal—keep it going!",
    type: 'progress'
  },
  {
    id: 4,
    icon: 'bell',
    message: "Stay hydrated! Aim for at least 8 cups of water today.",
    type: 'hydration'
  },
  {
    id: 5,
    icon: 'bell',
    message: "Consider a light snack to help maintain your energy levels.",
    type: 'energy'
  },
  {
    id: 6,
    icon: 'bell',
    message: "Review your progress this week and celebrate your small wins!",
    type: 'review'
  },
  {
    id: 7,
    icon: 'bell',
    message: "Plan your dinner ahead—choosing healthier options can be fun!",
    type: 'meal_planning'
  }
];

function NotificationItem({ notification }: { notification: NotificationItem }) {
  const handlePress = () => {
    console.log('Notification pressed:', notification.id);
    // Handle notification tap here
  };

  return (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityLabel={`Notification: ${notification.message}`}
      accessibilityHint="Double tap to view notification details"
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          <Feather 
            name={notification.icon as any} 
            size={24} 
            color="#ffffff" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationText}>
            {notification.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications] = useState<NotificationItem[]>(notificationsData);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2c2c" />
      
      <Header 
        title="Notifications" 
        showBackButton={true}
        showNotificationIcon={false}
      />

      {/* Notifications List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
          />
        ))}
        
        {/* Bottom spacing for better scrolling experience */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  notificationItem: {
    backgroundColor: '#404040',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    minHeight: 70,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ffffff',
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
}); 