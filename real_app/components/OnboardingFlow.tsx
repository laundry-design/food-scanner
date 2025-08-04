import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS 
} from 'react-native-reanimated';

import ProgressIndicator from './onboarding/ProgressIndicator';
import OnboardingButton from './onboarding/OnboardingButton';
import WelcomeStep from './onboarding/steps/WelcomeStep';
import FeaturesStep from './onboarding/steps/FeaturesStep';
import PermissionsStep from './onboarding/steps/PermissionsStep';
import GetStartedStep from './onboarding/steps/GetStartedStep';

const { width, height } = Dimensions.get('window');

interface OnboardingFlowProps {
  onComplete: () => void;
}

const TOTAL_STEPS = 4;

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const pagerRef = useRef<PagerView>(null);
  const opacity = useSharedValue(1);

  const isLastStep = currentStep === TOTAL_STEPS;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (isLastStep) {
      // Animate out and complete onboarding
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(onComplete)();
      });
    } else {
      pagerRef.current?.setPage(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      pagerRef.current?.setPage(currentStep - 2);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(onComplete)();
    });
  };

  const onPageSelected = (e: any) => {
    setCurrentStep(e.nativeEvent.position + 1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <FeaturesStep />;
      case 3:
        return <PermissionsStep />;
      case 4:
        return <GetStartedStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Progress and Skip */}
        <View style={styles.header}>
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={TOTAL_STEPS} 
          />
          {!isLastStep && (
            <OnboardingButton
              title="Skip"
              onPress={handleSkip}
              variant="secondary"
              style={styles.skipButton}
            />
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <PagerView
            ref={pagerRef}
            style={styles.pager}
            initialPage={0}
            onPageSelected={onPageSelected}
            scrollEnabled={false} // Disable swipe, use buttons only
          >
            {Array.from({ length: TOTAL_STEPS }, (_, index) => (
              <View key={index} style={styles.page}>
                {renderStep(index + 1)}
              </View>
            ))}
          </PagerView>
        </View>

        {/* Footer with Navigation Buttons */}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            {!isFirstStep && (
              <OnboardingButton
                title="Back"
                onPress={handleBack}
                variant="secondary"
                style={styles.backButton}
              />
            )}
            <OnboardingButton
              title={isLastStep ? "Get Started" : "Next"}
              onPress={handleNext}
              variant="primary"
              style={[styles.nextButton, isFirstStep && styles.fullWidthButton]}
            />
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    width: 80,
    height: 40,
    marginTop: 10,
  },
  backButton: {
    width: width * 0.35,
  },
  nextButton: {
    width: width * 0.35,
  },
  fullWidthButton: {
    width: width * 0.8,
  },
});