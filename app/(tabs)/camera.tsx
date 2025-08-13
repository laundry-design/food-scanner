import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert, Platform, Image, ScrollView, Animated, Dimensions, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const { height: screenHeight } = Dimensions.get('window');

// Camera functionality will be implemented with a different approach
const CAMERA_AVAILABLE = false; // Set to true when camera is properly configured

interface NutritionCardProps {
  title: string;
  value: string;
  progress: number;
  color: string;
}

function NutritionCard({ title, value, progress, color }: NutritionCardProps) {
  return (
    <View style={[styles.nutritionCard, { backgroundColor: color }]}>
      <Text style={styles.nutritionTitle}>{title}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
      {progress < 1 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{Math.round(progress * 100)}%</Text>
            <Text style={styles.progressLabel}>100%</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function AICameraScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'camera' | 'barcode' | 'gallery'>('camera');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomSheetAnim = useRef(new Animated.Value(screenHeight)).current;
  const lastGesture = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);

  // Scroll observer to detect scroll direction and auto-expand
const SCROLL_THRESHOLD = 2;
const COOLDOWN_MS = 300; // Time after expand/collapse to ignore changes
let lastActionTime = Date.now();

const handleScrollChange = (currentScrollY: number) => {
  const now = Date.now();
  const scrollDiff = currentScrollY - lastScrollY.current;
  const isScrollingUp = scrollDiff < 0;
  const isScrollingDown = scrollDiff > 0;
  // Ignore small scrolls or changes too soon after expand/collapse
  if (Math.abs(scrollDiff) < SCROLL_THRESHOLD || now - lastActionTime < COOLDOWN_MS) {
    return;
  }

  // Expand if user scrolls down and sheet is not expanded
  if (!isExpanded && isScrollingDown) {
    console.log('📈 Expand triggered by scroll down');
    setIsExpanded(true);
    lastActionTime = now;
    return; // prevent immediate follow-up logic
  }

  // Collapse if already expanded, at top, and dragging up
console.log(currentScrollY );

  if (isExpanded && currentScrollY <= -30 && isScrollingUp) {
    console.log('📉 Collapse triggered by scroll up at top');
    setIsExpanded(false);
    lastActionTime = now;
    return;
  }

  // Update scroll direction if needed
  scrollDirection.current = isScrollingUp ? 'up' : 'down';

  // Update scroll position
  setScrollY(currentScrollY);
  lastScrollY.current = currentScrollY;
};


  // Pan responder for drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!selectedImage) return false;
        
        const isDraggingUp = gestureState.dy < 0;
        const isDraggingDown = gestureState.dy > 0;
        const isSignificantGesture = Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && 
                                   Math.abs(gestureState.dy) > 10;
        
        // If not expanded and dragging up -> expand automatically
        if (!isExpanded && isDraggingUp && isSignificantGesture) {
          setIsExpanded(true);
          return false; // Don't handle the gesture, just expand
        }
        
        // If expanded and dragging down from top -> allow collapse
        if (isExpanded && isDraggingDown && scrollY <= 0 && isSignificantGesture) {
          return true; // Handle this gesture to collapse
        }
        
        // For other cases, use normal gesture handling
        return isSignificantGesture;
      },
      onPanResponderGrant: () => {
        // Store the current position when gesture starts
        lastGesture.current = bottomSheetAnim._value;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!selectedImage) return;
        
        // Calculate new position based on gesture
        const newValue = lastGesture.current + gestureState.dy;
        
        // Define bounds
        const collapsedPosition = screenHeight * 0.75;
        const expandedPosition = screenHeight * 0.35;
        
        // Constrain the movement within bounds
        const constrainedValue = Math.max(expandedPosition, Math.min(collapsedPosition, newValue));
        
        bottomSheetAnim.setValue(constrainedValue);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (!selectedImage) return;
        
        const { dy, vy } = gestureState;
        const isDraggingDown = dy > 0;
        
        // Only handle collapse gestures when expanded and at scroll top
        if (isExpanded && isDraggingDown && scrollY <= 0) {
          const collapsedPosition = screenHeight * 0.75;
          
          // If significant downward gesture, collapse
          if (Math.abs(dy) > 50 || vy > 0.5) {
            setIsExpanded(false);
            Animated.spring(bottomSheetAnim, {
              toValue: collapsedPosition,
              useNativeDriver: false,
              tension: 100,
              friction: 8,
            }).start();
          } else {
            // Snap back to expanded if gesture wasn't strong enough
            const expandedPosition = screenHeight * 0.35;
            Animated.spring(bottomSheetAnim, {
              toValue: expandedPosition,
              useNativeDriver: false,
              tension: 100,
              friction: 8,
            }).start();
          }
        }
      },
    })
  ).current;

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

  useEffect(() => {
    if (showBottomSheet) {
      if (selectedImage && isExpanded) {
        // Expanded state with image - show more content
        Animated.timing(bottomSheetAnim, {
          toValue: screenHeight * 0.35,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        // Collapsed state - show navigation or basic metrics
        Animated.timing(bottomSheetAnim, {
          toValue: screenHeight * 0.75, // Taller bottom sheet
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [showBottomSheet, selectedImage, isExpanded]);

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
    setScrollY(0);
    lastScrollY.current = 0;
    scrollDirection.current = null;
    // Keep bottom sheet visible but switch back to navigation
  };

  const handleExpandBottomSheet = () => {
    console.log('Handle pressed, selectedImage:', !!selectedImage, 'isExpanded:', isExpanded);
    if (selectedImage) {
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState);
      console.log('Toggling expanded state to:', newExpandedState);
      
      // Reset scroll when collapsing
      if (!newExpandedState) {
        setScrollY(0);
        lastScrollY.current = 0;
        scrollDirection.current = null;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
      }
    }
  };

  const handleCloseBottomSheet = () => {
    if (selectedImage && isExpanded) {
      setIsExpanded(false);
      setScrollY(0);
      lastScrollY.current = 0;
      scrollDirection.current = null;
      // Reset scroll position when closing
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }
  };

// useEffect(() => {
//   console.log(  "scroll" ,scrollViewRef.current.scrollX)

//   return () => {
    
//   }
// }, [scrollViewRef.current])


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
      {showBottomSheet && (
        <Animated.View 
          style={[styles.bottomSheet, { top: bottomSheetAnim }]}
          {...(selectedImage ? panResponder.panHandlers : {})}
        >
          <View style={styles.bottomSheetHandle}>
            <TouchableOpacity 
              onPress={handleExpandBottomSheet}
              disabled={!selectedImage}
              activeOpacity={selectedImage ? 0.7 : 1}
              style={styles.handleTouchArea}
            >
              <View style={[
                styles.handleBar, 
                selectedImage && styles.handleBarActive
              ]} />
            </TouchableOpacity>
          </View>
          
          {!selectedImage ? (
            /* Navigation Mode */
            <View style={styles.navigationContent}>
              <View style={styles.bottomNavigation}>
                <TouchableOpacity 
                  style={[styles.navTab, activeTab === 'camera' && styles.activeNavTab]}
                  onPress={() => handleTabPress('camera')}
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
                  onPress={() => handleTabPress('barcode')}
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
                  onPress={() => handleTabPress('gallery')}
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
{!selectedImage && (
        <TouchableOpacity 
          style={styles.captureButton}
          onPress={handleCapturePress}
          accessibilityLabel="Capture photo"
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      )}
            </View>
          ) : (
            /* Metrics Mode */
            <ScrollView 
              ref={scrollViewRef}
              style={styles.bottomSheetContent}
              showsVerticalScrollIndicator={false}
              onScroll={(event) => {
                const currentScrollY = event.nativeEvent.contentOffset.y;
                handleScrollChange(currentScrollY);
              }}
              scrollEventThrottle={16}
            >
              {/* Close Button - only show when expanded */}
              {isExpanded && (
                <TouchableOpacity 
                  style={styles.bottomSheetCloseButton}
                  onPress={handleCloseBottomSheet}
                >
                  <Feather name="x" size={24} color="#000000" />
                </TouchableOpacity>
              )}

              {/* Nutrition Cards Grid - Always visible when image selected */}
              <View style={styles.nutritionGridContainer}>
                <View style={styles.nutritionGrid}>
                  <NutritionCard
                    title="Calories"
                    value={dietData.nutrition.calories.value}
                    progress={dietData.nutrition.calories.progress}
                    color={dietData.nutrition.calories.color}
                  />
                  <NutritionCard
                    title="Protein"
                    value={dietData.nutrition.protein.value}
                    progress={dietData.nutrition.protein.progress}
                    color={dietData.nutrition.protein.color}
                  />
                  <NutritionCard
                    title="Carbs"
                    value={dietData.nutrition.carbs.value}
                    progress={dietData.nutrition.carbs.progress}
                    color={dietData.nutrition.carbs.color}
                  />
                  <NutritionCard
                    title="Fat"
                    value={dietData.nutrition.fat.value}
                    progress={dietData.nutrition.fat.progress}
                    color={dietData.nutrition.fat.color}
                  />
                </View>
              </View>

              {/* Expanded Content - Only show when expanded */}
              {isExpanded && (
                <>
                  {/* Title and Description */}
                  <Text style={styles.bottomSheetTitle}>{dietData.title}</Text>
                  <Text style={styles.bottomSheetDescription}>{dietData.description}</Text>

                  {/* Goal Card */}
                  <View style={styles.goalCard}>
                    <View style={styles.goalHeader}>
                      <Feather name="target" size={20} color="#000000" />
                      <Text style={styles.goalTitle}>Goal</Text>
                    </View>
                    <Text style={styles.goalDescription}>{dietData.goal}</Text>
                  </View>

                  {/* CTA Button */}
                  <TouchableOpacity 
                    style={styles.ctaButton}
                    onPress={handleAddToDiet}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.ctaButtonText}>Add to My Diet</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    marginBottom: 140, // Increased padding to move button further up
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
  // Bottom Sheet Styles
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetHandle: {
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  handleTouchArea: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  handleBarActive: {
    backgroundColor: '#333333',
    width: 50,
    height: 5,
  },
  navigationContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSheetCloseButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 40,
  },
  bottomSheetDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  // Nutrition Card Styles
  nutritionGridContainer: {
    paddingTop: 10,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  nutritionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '500',
  },
  // Goal Card Styles
  goalCard: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  // CTA Button Styles
  ctaButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});