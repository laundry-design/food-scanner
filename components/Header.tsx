import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  userName?: string;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'Alex', 
  onProfilePress 
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {getGreeting()}, {userName}
      </Text>
      
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Ionicons name="person" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header; 