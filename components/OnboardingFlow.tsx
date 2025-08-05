import React, { useRef } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { useUserStore } from '@/stores/userStore';
import OnboardingButton from './onboarding/OnboardingButton';
import ProgressIndicator from './onboarding/ProgressIndicator';
import AgeStep from './onboarding/steps/AgeStep';
import DietFocusStep from './onboarding/steps/DietFocusStep';
import FitnessGoalStep from './onboarding/steps/FitnessGoalStep';
import GenderStep from './onboarding/steps/GenderStep';
import GymActivityStep from './onboarding/steps/GymActivityStep';
import HeightStep from './onboarding/steps/HeightStep';
import PlanStep from './onboarding/steps/PlanStep';
import WeightStep from './onboarding/steps/WeightStep';

const { width, height } = Dimensions.get('window');

interface OnboardingFlowProps {
  onComplete: () => void;
}

const TOTAL_STEPS = 8;

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const {
    currentStep,
    onboardingData,
    isOnboardingActive,
    setCurrentStep,
    updateOnboardingData,
    goToNextStep,
    goToPreviousStep,
    canProceedToNext,
    completeOnboarding
  } = useOnboardingStore();

  const { completeOnboarding: completeUserOnboarding } = useUserStore();
  
  const pagerRef = useRef<PagerView>(null);
  const opacity = useSharedValue(1);

  const isLastStep = currentStep === TOTAL_STEPS;
  const isFirstStep = currentStep === 1;

  const handleNext = async () => {
    if (isLastStep) {
      // Complete onboarding and save to user store
      await completeUserOnboarding(onboardingData);
      completeOnboarding();
      
      // Animate out and complete onboarding
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(onComplete)();
      });
    } else {
      if (canProceedToNext()) {
        pagerRef.current?.setPage(currentStep);
        goToNextStep();
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      pagerRef.current?.setPage(currentStep - 2);
      goToPreviousStep();
    }
  };

  const handleSkip = async () => {
    // Complete onboarding with current data
    await completeUserOnboarding(onboardingData);
    completeOnboarding();
    
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
        return <PlanStep onPlanSelect={(plan) => updateOnboardingData('plan', plan)} />;
      case 2:
        return <AgeStep onAgeChange={(age) => updateOnboardingData('age', age)} />;
      case 3:
        return <WeightStep onWeightChange={(weight, unit) => {
          updateOnboardingData('weight', weight);
          updateOnboardingData('weightUnit', unit);
        }} />;
      case 4:
        return <HeightStep onHeightChange={(height, unit) => {
          updateOnboardingData('height', height);
          updateOnboardingData('heightUnit', unit);
        }} />;
      case 5:
        return <GenderStep onGenderSelect={(gender) => updateOnboardingData('gender', gender)} />;
      case 6:
        return <FitnessGoalStep onGoalSelect={(goal) => updateOnboardingData('fitnessGoal', goal)} />;
      case 7:
        return <GymActivityStep onActivitySelect={(activity) => updateOnboardingData('gymActivity', activity)} />;
      case 8:
        return <DietFocusStep onDietFocusSelect={(dietFocus) => updateOnboardingData('dietFocus', dietFocus)} />;
      default:
        return <PlanStep onPlanSelect={(plan) => updateOnboardingData('plan', plan)} />;
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
              showArrow={!isLastStep}
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