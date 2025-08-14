import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { CameraBottomSheet } from '@/components/camera';

// Camera functionality will be implemented with a different approach
const CAMERA_AVAILABLE = false; // Set to true when camera is properly configured

export default function AICameraScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'camera' | 'barcode' | 'gallery'>('camera');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);



  // Diet data
  const dietData = {
    id: '1',
    title: 'Mediterranean Lifestyle',
    description: "This diet focuses on whole foods, featuring fresh vegetables, quality olive oil, lean fish, nutritious nuts, and wholesome grains. It offers a balanced and tasty way to eat that supports your health.",
    nutrition: {
      calories: { value: '2,000 kcal', progress: 1, color: '#c4b5fd' },
      protein: { value: '25%', progress: 0.25, color: '#4ade80' },
      carbs: { value: '40%', progress: 0.4, color: '#fde047' },
      fat: { value: '30%', progress: 0.3, color: '#fb7185' }
    },
    goal: 'Heart Health, Weight Maintenance'
  };

  useEffect(() => {
    // For now, we'll simulate camera functionality
    // In a production app, you would implement proper camera integration
    setHasPermission(CAMERA_AVAILABLE);
    setIsCameraReady(CAMERA_AVAILABLE);
  }, []);



  const handleClosePress = () => {
    console.log('Close button pressed');
    router.back();
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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsExpanded(false);
  };

  const handleExpansionChange = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleAddToDiet = () => {
    console.log('Add to diet pressed');
    Alert.alert('Success', 'Added to your diet!');
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
        setSelectedImage(result.assets[0].uri);
        setIsExpanded(false); // Start collapsed, user can expand
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
          {selectedImage && (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={handleRemoveImage}
              accessibilityLabel="Remove image"
            >
              <Feather name="trash-2" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
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
          {selectedImage ? (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.selectedImage}
              resizeMode="cover"
            />
          ) : hasPermission === null ? (
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



      {/* Capture Button */}
      

      {/* Bottom Sheet */}
      <CameraBottomSheet
        isVisible={showBottomSheet}
        onClose={handleCloseBottomSheet}
        selectedImage={selectedImage}
        isExpanded={isExpanded}
        onExpansionChange={handleExpansionChange}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onCapturePress={handleCapturePress}
        dietData={dietData}
        onAddToDiet={handleAddToDiet}
      />
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  viewfinder: {
  width: '100%',
  aspectRatio: 3 / 4, // or whatever ratio your camera feed should be
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
  selectedImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover', // Move this here
},
  camera: {
    flex: 1,
  },
});