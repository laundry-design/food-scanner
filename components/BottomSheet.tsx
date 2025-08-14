import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  keepOpen?: boolean; // If true, sheet stays open and can't be closed
  initialHeight?: number; // Initial height as percentage (0.25 = 25% of screen)
  expandedHeight?: number; // Expanded height as percentage (0.75 = 75% of screen)
  showHandle?: boolean;
  showCloseButton?: boolean;
  title?: string;
  enableExpansion?: boolean; // Whether the sheet can be expanded/collapsed
  onExpansionChange?: (isExpanded: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  keepOpen = false,
  initialHeight = 0.25,
  expandedHeight = 0.75,
  showHandle = true,
  showCloseButton = false,
  title,
  enableExpansion = true,
  onExpansionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const bottomSheetAnim = useRef(new Animated.Value(screenHeight)).current;
  const lastGesture = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const lastScrollY = useRef(0);

  // Calculate positions
  const collapsedPosition = screenHeight * (1 - initialHeight);
  const expandedPosition = screenHeight * (1 - expandedHeight);

  // Scroll handling for auto-expansion
  const SCROLL_THRESHOLD = 2;
  const COOLDOWN_MS = 300;
  let lastActionTime = Date.now();

  const handleScrollChange = (currentScrollY: number) => {
    if (!enableExpansion || keepOpen) return;

    const now = Date.now();
    const scrollDiff = currentScrollY - lastScrollY.current;
    const isScrollingUp = scrollDiff < 0;
    const isScrollingDown = scrollDiff > 0;

    if (Math.abs(scrollDiff) < SCROLL_THRESHOLD || now - lastActionTime < COOLDOWN_MS) {
      return;
    }

    // Expand if user scrolls down and sheet is not expanded
    if (!isExpanded && isScrollingDown) {
      setIsExpanded(true);
      onExpansionChange?.(true);
      lastActionTime = now;
      return;
    }

    // Collapse if already expanded, at top, and dragging up
    if (isExpanded && currentScrollY <= -30 && isScrollingUp) {
      setIsExpanded(false);
      onExpansionChange?.(false);
      lastActionTime = now;
      return;
    }

    setScrollY(currentScrollY);
    lastScrollY.current = currentScrollY;
  };

  // Pan responder for drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!enableExpansion || keepOpen) return false;

        const isDraggingUp = gestureState.dy < 0;
        const isDraggingDown = gestureState.dy > 0;
        const isSignificantGesture = Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && 
                                   Math.abs(gestureState.dy) > 10;

        // If not expanded and dragging up -> expand automatically
        if (!isExpanded && isDraggingUp && isSignificantGesture) {
          setIsExpanded(true);
          onExpansionChange?.(true);
          return false;
        }

        // If expanded and dragging down from top -> allow collapse
        if (isExpanded && isDraggingDown && scrollY <= 0 && isSignificantGesture) {
          return true;
        }

        return isSignificantGesture;
      },
      onPanResponderGrant: () => {
        lastGesture.current = bottomSheetAnim._value;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!enableExpansion || keepOpen) return;

        const newValue = lastGesture.current + gestureState.dy;
        const constrainedValue = Math.max(expandedPosition, Math.min(collapsedPosition, newValue));
        bottomSheetAnim.setValue(constrainedValue);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (!enableExpansion || keepOpen) return;

        const { dy, vy } = gestureState;
        const isDraggingDown = dy > 0;

        // Only handle collapse gestures when expanded and at scroll top
        if (isExpanded && isDraggingDown && scrollY <= 0) {
          // If significant downward gesture, collapse
          if (Math.abs(dy) > 50 || vy > 0.5) {
            setIsExpanded(false);
            onExpansionChange?.(false);
            Animated.spring(bottomSheetAnim, {
              toValue: collapsedPosition,
              useNativeDriver: false,
              tension: 100,
              friction: 8,
            }).start();
          } else {
            // Snap back to expanded if gesture wasn't strong enough
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

  // Animation effect
  useEffect(() => {
    if (isVisible) {
      let targetPosition;
      
      if (keepOpen) {
        targetPosition = expandedPosition;
      } else {
        targetPosition = isExpanded ? expandedPosition : collapsedPosition;
      }
      
      Animated.timing(bottomSheetAnim, {
        toValue: targetPosition,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, isExpanded, keepOpen]);

  const handleToggleExpansion = () => {
    if (!enableExpansion || keepOpen) return;

    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpansionChange?.(newExpandedState);

    // Reset scroll when collapsing
    if (!newExpandedState) {
      setScrollY(0);
      lastScrollY.current = 0;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }
  };

  const handleClose = () => {
    if (keepOpen) return;
    
    if (isExpanded) {
      setIsExpanded(false);
      onExpansionChange?.(false);
      setScrollY(0);
      lastScrollY.current = 0;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    } else {
      onClose?.();
    }
  };

  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[styles.bottomSheet, { top: bottomSheetAnim }]}
      {...(enableExpansion && !keepOpen ? panResponder.panHandlers : {})}
    >
      {/* Handle */}
      {showHandle && (
        <View style={styles.bottomSheetHandle}>
          <TouchableOpacity 
            onPress={handleToggleExpansion}
            disabled={!enableExpansion || keepOpen}
            activeOpacity={enableExpansion && !keepOpen ? 0.7 : 1}
            style={styles.handleTouchArea}
          >
            <View style={[
              styles.handleBar, 
              (enableExpansion && !keepOpen) && styles.handleBarActive
            ]} />
          </TouchableOpacity>
        </View>
      )}

      {/* Title */}
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {/* Close Button */}
      {showCloseButton && !keepOpen && (
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <Feather name="x" size={24} color="#000000" />
        </TouchableOpacity>
      )}

      {/* Content */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const currentScrollY = event.nativeEvent.contentOffset.y;
          handleScrollChange(currentScrollY);
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default BottomSheet;