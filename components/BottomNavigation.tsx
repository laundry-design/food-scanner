import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface NavigationItem {
  id: string;
  iconName: keyof typeof Feather.glyphMap;
  active: boolean;
  label: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
  style?: any;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'index',
    iconName: 'home',
    active: true,
    label: 'Home'
  },
  {
    id: 'analytics',
    iconName: 'trending-up',
    active: false,
    label: 'Analytics'
  },
  {
    id: 'camera',
    iconName: 'camera',
    active: false,
    label: 'Camera'
  },
  {
    id: 'diets',
    iconName: 'heart',
    active: false,
    label: 'Diets'
  },
  {
    id: 'settings',
    iconName: 'settings',
    active: false,
    label: 'Settings'
  }
];

export function BottomNavigation({ activeTab, onTabPress, style }: BottomNavigationProps) {
  const handleTabPress = (tabId: string) => {
    onTabPress(tabId);
  };

  return (
    <View style={[styles.container, style]}>
      {navigationItems.map((item) => {
        const isActive = activeTab === item.id;
        
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.iconContainer,
              isActive && styles.activeIconContainer
            ]}
            onPress={() => handleTabPress(item.id)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Navigate to ${item.label} screen`}
          >
            <Feather
              name={item.iconName}
              size={24}
              color={isActive ? '#ffffff' : '#9ca3af'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#2a2a2a',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#f97316',
  },
}); 