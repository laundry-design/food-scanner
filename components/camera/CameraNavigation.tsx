import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CameraNavigationProps {
  activeTab: 'camera' | 'barcode' | 'gallery';
  onTabPress: (tab: 'camera' | 'barcode' | 'gallery') => void;
  onCapturePress: () => void;
  showCaptureButton?: boolean;
}

export default function CameraNavigation({ 
  activeTab, 
  onTabPress, 
  onCapturePress,
  showCaptureButton = true 
}: CameraNavigationProps) {
  return (
    <View style={styles.navigationContent}>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'camera' && styles.activeNavTab]}
          onPress={() => onTabPress('camera')}
          accessibilityLabel="AI Camera mode"
        >
          <Feather 
            name="camera" 
            size={24} 
            color={activeTab === 'camera' ? '#000000' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'camera' && styles.activeNavText]}>
            AI Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'barcode' && styles.activeNavTab]}
          onPress={() => onTabPress('barcode')}
          accessibilityLabel="AI Barcode mode"
        >
          <Feather 
            name="maximize-2" 
            size={24} 
            color={activeTab === 'barcode' ? '#000000' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'barcode' && styles.activeNavText]}>
            AI Barcode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'gallery' && styles.activeNavTab]}
          onPress={() => onTabPress('gallery')}
          accessibilityLabel="Gallery mode"
        >
          <Feather 
            name="image" 
            size={24} 
            color={activeTab === 'gallery' ? '#000000' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'gallery' && styles.activeNavText]}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
      
      {showCaptureButton && (
        <TouchableOpacity 
          style={styles.captureButton}
          onPress={onCapturePress}
          accessibilityLabel="Capture photo"
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navTab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeNavTab: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  navText: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#000000',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000000',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 140,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
});