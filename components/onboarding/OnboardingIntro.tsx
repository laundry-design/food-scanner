import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface OnboardingIntroProps {
  onNext: () => void;
}

export default function OnboardingIntro({ onNext }: OnboardingIntroProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header with Status Bar */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusBar}>
          <View style={styles.signalBar}>
            <View style={[styles.signalDot, styles.active]} />
            <View style={[styles.signalDot, styles.active]} />
            <View style={[styles.signalDot, styles.active]} />
            <View style={[styles.signalDot, styles.active]} />
          </View>
          <View style={styles.wifiIcon}>
            <View style={styles.wifiArc} />
          </View>
          <View style={styles.batteryIcon}>
            <View style={styles.batteryBody}>
              <View style={styles.batteryLevel} />
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Pirate Ship Illustration */}
        <View style={styles.logoContainer}>
          <View style={styles.shipContainer}>
            <View style={styles.shipBody}>
              <View style={styles.shipDeck} />
              <View style={styles.shipMast} />
              <View style={styles.shipFlag}>
                <Text style={styles.flagSymbol}>☠️</Text>
              </View>
            </View>
            <View style={styles.treasureChest}>
              <Text style={styles.chestSymbol}>💎</Text>
            </View>
            <View style={styles.waterWaves}>
              <View style={styles.wave} />
              <View style={styles.wave} />
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Your Smart Nutrition Companion</Text>

        {/* Description */}
        <Text style={styles.description}>
          Track your meals, monitor nutrients, and reach your health goals with AI-powered support.
        </Text>

        {/* AI Assistant Avatar */}
        <View style={styles.aiAssistantContainer}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiText}>V</Text>
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBar: {
    flexDirection: 'row',
    gap: 2,
  },
  signalDot: {
    width: 3,
    height: 6,
    borderRadius: 1.5,
    backgroundColor: '#ccc',
  },
  active: {
    backgroundColor: '#333',
  },
  wifiIcon: {
    width: 16,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wifiArc: {
    width: 12,
    height: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#333',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  batteryIcon: {
    width: 20,
    height: 10,
  },
  batteryBody: {
    width: 20,
    height: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 2,
    padding: 1,
  },
  batteryLevel: {
    width: '80%',
    height: '100%',
    backgroundColor: '#333',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  shipContainer: {
    alignItems: 'center',
  },
  shipBody: {
    position: 'relative',
  },
  shipDeck: {
    width: 120,
    height: 40,
    backgroundColor: '#8B4513',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#654321',
  },
  shipMast: {
    position: 'absolute',
    top: -30,
    left: 50,
    width: 4,
    height: 60,
    backgroundColor: '#8B4513',
  },
  shipFlag: {
    position: 'absolute',
    top: -35,
    left: 54,
    width: 30,
    height: 20,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagSymbol: {
    fontSize: 12,
  },
  treasureChest: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 20,
    backgroundColor: '#DAA520',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chestSymbol: {
    fontSize: 16,
  },
  waterWaves: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
  },
  wave: {
    width: '100%',
    height: 8,
    backgroundColor: '#4A90E2',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff6b35',
    borderRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  aiAssistantContainer: {
    marginBottom: 40,
  },
  aiAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 