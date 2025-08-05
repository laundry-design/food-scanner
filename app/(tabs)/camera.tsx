import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Camera functionality will be implemented with a different approach
const CAMERA_AVAILABLE = false; // Set to true when camera is properly configured

export default function AICameraScreen() {
  const [activeTab, setActiveTab] = useState<'camera' | 'barcode' | 'gallery'>('camera');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    // For now, we'll simulate camera functionality
    // In a production app, you would implement proper camera integration
    setHasPermission(CAMERA_AVAILABLE);
    setIsCameraReady(CAMERA_AVAILABLE);
  }, []);

  const handleClosePress = () => {
    console.log('Close button pressed');
  };

  const handleTabPress = async (tab: 'camera' | 'barcode' | 'gallery') => {
    console.log(`${tab} tab pressed`);
    
    if (tab === 'gallery') {
      await openGallery();
    } else {
      setActiveTab(tab);
    }
  };

  const handleCapturePress = async () => {
    if (!CAMERA_AVAILABLE) {
      Alert.alert(
        'Camera Coming Soon', 
        'Camera functionality will be available in the next update. For now, you can use the Gallery option to select photos.'
      );
      return;
    }
    
    console.log('Capture button pressed');
  };

  const handleFlipCamera = () => {
    setCameraType(current => 
      current === 'back' ? 'front' : 'back'
    );
  };

  const openGallery = async () => {
    try {
      console.log('=== GALLERY DEBUG ===');
      console.log('1. Checking if ImagePicker is available...');
      
      if (!ImagePicker) {
        console.error('ImagePicker is not available');
        Alert.alert('Error', 'Gallery functionality is not available');
        return;
      }
      
      console.log('2. Requesting permissions...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('3. Permission status:', status);
      
      if (status !== 'granted') {
        console.log('4. Permission denied');
        Alert.alert(
          'Permission Required', 
          'Please grant photo library access in your device settings to use the gallery.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: openGallery }
          ]
        );
        return;
      }
      
      console.log('5. Permission granted, launching picker...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log('6. Picker result:', result);
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('7. Image selected:', result.assets[0].uri);
        Alert.alert('Success', 'Image selected successfully!');
        // Here you can process the selected image
      } else {
        console.log('7. No image selected or user canceled');
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Camera</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handleFlipCamera}
            accessibilityLabel="Flip camera"
          >
            <Feather name="refresh-cw" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleClosePress}
            accessibilityLabel="Close camera"
          >
            <Feather name="x" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Viewfinder */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.viewfinder}>
          {hasPermission === null ? (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>Requesting camera permission...</Text>
            </View>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>
                {CAMERA_AVAILABLE ? 'Camera Preview' : 'Camera Coming Soon'}
              </Text>
              {!CAMERA_AVAILABLE && (
                <Text style={styles.placeholderSubtext}>
                  Use the Gallery option below to select photos
                </Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'camera' && styles.activeNavTab]}
          onPress={() => handleTabPress('camera')}
          accessibilityLabel="AI Camera mode"
        >
          <Feather 
            name="camera" 
            size={24} 
            color={activeTab === 'camera' ? '#FFFFFF' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'camera' && styles.activeNavText]}>
            AI Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'barcode' && styles.activeNavTab]}
          onPress={() => handleTabPress('barcode')}
          accessibilityLabel="AI Barcode mode"
        >
          <Feather 
            name="maximize-2" 
            size={24} 
            color={activeTab === 'barcode' ? '#FFFFFF' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'barcode' && styles.activeNavText]}>
            AI Barcode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navTab, activeTab === 'gallery' && styles.activeNavTab]}
          onPress={() => handleTabPress('gallery')}
          accessibilityLabel="Gallery mode"
        >
          <Feather 
            name="image" 
            size={24} 
            color={activeTab === 'gallery' ? '#FFFFFF' : '#808080'} 
          />
          <Text style={[styles.navText, activeTab === 'gallery' && styles.activeNavText]}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Capture Button */}
      <TouchableOpacity 
        style={styles.captureButton}
        onPress={handleCapturePress}
        accessibilityLabel="Capture photo"
      >
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  viewfinder: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  placeholderText: {
    color: '#808080',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderSubtext: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 15,
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
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  navText: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FFFFFF',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000000',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 100, // Move up to avoid bottom navigation
    marginTop: 20,
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