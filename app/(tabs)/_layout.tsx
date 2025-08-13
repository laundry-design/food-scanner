import { Tabs, useRouter, useSegments } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [activeTab, setActiveTab] = useState('index');

  // Update active tab based on current route
  useEffect(() => {
    const currentTab = segments[segments.length - 1] || 'index';
    // Handle home tab - if we're at the root of tabs, set to index
    if (segments.length === 1) {
      setActiveTab('index');
    } else {
      setActiveTab(currentTab as string);
    }
  }, [segments]);

  const handleTabPress = (tabId: string) => {
    console.log('Tab pressed:', tabId);
    setActiveTab(tabId);
    
    // Handle home tab navigation
    if (tabId === 'index') {
      router.push('/(tabs)/' as any);
    } else {
      router.push(`/(tabs)/${tabId}` as any);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#9BA1A6',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            display: 'none', // Hide the default tab bar
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
          }}
        />
        <Tabs.Screen
          name="diets"
          options={{
            title: 'Diets',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
          }}
        />
        <Tabs.Screen
          name="diet-detail"
          options={{
            href: null, // Hide this tab from the tab bar
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            href: null, // Hide this tab from the tab bar
          }}
        />
      </Tabs>
      
      {activeTab !== 'camera' && (
        <BottomNavigation 
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </View>
  );
}
