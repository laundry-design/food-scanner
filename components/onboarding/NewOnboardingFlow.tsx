import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GenderStep from './steps/GenderStep';
import AgeStep from './steps/AgeStep';
import WeightStep from './steps/WeightStep';
import HeightStep from './steps/HeightStep';
import GoalStep from './steps/GoalStep';
import ActivityStep from './steps/ActivityStep';
import ProfileStep from './steps/ProfileStep';
import ProgressIndicator from './ProgressIndicator'; // Add this import

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  gender: string;
  age: number;
  weight: number;
  weightUnit: 'KG' | 'LB';
  height: number;
  goal: string;
  activityLevel: string;
  fullName: string;
  nickname: string;
  email: string;
  phone: string;
}

interface NewOnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const STEPS = [
  { id: 'gender', title: "What's Your Gender" },
  { id: 'age', title: 'How Old Are You?' },
  { id: 'weight', title: 'What Is Your Weight?' },
  { id: 'height', title: 'What Is Your Height?' },
  { id: 'goal', title: 'What Is Your Goal?' },
  { id: 'activity', title: 'Physical Activity Level' },
  { id: 'profile', title: 'Fill Your Profile' },
];

export default function NewOnboardingFlow({ onComplete }: NewOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    gender: '',
    age: 28,
    weight: 75,
    weightUnit: 'LB',
    height: 165,
    goal: '',
    activityLevel: '',
    fullName: '',
    nickname: '',
    email: '',
    phone: '',
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const popAnim = useRef(new Animated.Value(0)).current; // New animation value for pop-up effect

  // Reset pop animation when step changes
  useEffect(() => {
    popAnim.setValue(0);
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const updateData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      // First animate out the current component
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Then slide to the next step
        Animated.timing(slideAnim, {
          toValue: -(currentStep + 1) * width,
          duration: 300,
          useNativeDriver: true,
        }).start();
        
        // Update the current step
        setCurrentStep(currentStep + 1);
        
        // The useEffect will handle popping in the new component
      });
    } else {
      // Map the onboarding data to the expected format
      const mappedData = {
        gender: onboardingData.gender,
        age: onboardingData.age,
        weight: onboardingData.weight,
        weightUnit: onboardingData.weightUnit,
        height: onboardingData.height,
        heightUnit: 'CM',
        fitnessGoal: onboardingData.goal,
        gymActivity: onboardingData.activityLevel,
        dietFocus: '',
        name: onboardingData.fullName,
        email: onboardingData.email,
      };
      onComplete(mappedData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // First animate out the current component
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Then slide to the previous step
        Animated.timing(slideAnim, {
          toValue: -(currentStep - 1) * width,
          duration: 300,
          useNativeDriver: true,
        }).start();
        
        // Update the current step
        setCurrentStep(currentStep - 1);
        
        // The useEffect will handle popping in the new component
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return onboardingData.gender !== '';
      case 1: return onboardingData.age > 0;
      case 2: return onboardingData.weight > 0;
      case 3: return onboardingData.height > 0;
      case 4: return onboardingData.goal !== '';
      case 5: return onboardingData.activityLevel !== '';
      case 6: return onboardingData.fullName !== '' && onboardingData.email !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <GenderStep
            selectedGender={onboardingData.gender}
            onSelect={(gender) => updateData('gender', gender)}
          />
        );
      case 1:
        return (
          <AgeStep
            age={onboardingData.age}
            onAgeChange={(age) => updateData('age', age)}
          />
        );
      case 2:
        return (
          <WeightStep
            weight={onboardingData.weight}
            unit={onboardingData.weightUnit}
            onWeightChange={(weight, unit) => {
              updateData('weight', weight);
              updateData('weightUnit', unit);
            }}
          />
        );
      case 3:
        return (
          <HeightStep
            height={onboardingData.height}
            onHeightChange={(height) => updateData('height', height)}
          />
        );
      case 4:
        return (
          <GoalStep
            selectedGoal={onboardingData.goal}
            onSelect={(goal) => updateData('goal', goal)}
          />
        );
      case 5:
        return (
          <ActivityStep
            selectedActivity={onboardingData.activityLevel}
            onSelect={(activity) => updateData('activityLevel', activity)}
          />
        );
      case 6:
        return (
          <ProfileStep
            data={onboardingData}
            onUpdate={(key, value) => updateData(key, value)}
          />
        );
      default:
        return null;
    }
  };

  // Create animated styles for the pop-up effect
  const popAnimatedStyle = {
    opacity: popAnim,
    transform: [
      { scale: popAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })},
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2a2a" />
      
      {/* Header */}
      <View style={styles.header}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentStep + 1}.{currentStep} {STEPS[currentStep].id.replace('_', ' ')}
          </Text>
        </View>
      </View>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        {STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Progress Indicator with Ship */}
      <ProgressIndicator 
        currentStep={currentStep + 1} 
        totalSteps={STEPS.length} 
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{STEPS[currentStep].title}</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        
        <Animated.View style={[styles.stepContent, popAnimatedStyle]}>
          {renderStep()}
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed() && styles.disabledButton,
          ]}
          onPress={nextStep}
          disabled={!canProceed()}
        >
          <Text style={styles.continueButtonText}>
            {currentStep === STEPS.length - 1 ? 'Start' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#c4ff47',
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressText: {
    color: '#c4ff47',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
  stepContent: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});