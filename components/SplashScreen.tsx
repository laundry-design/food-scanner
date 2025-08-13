import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { Fonts, FontStyles } from '@/constants/Fonts';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After initial fade-in, start the fade sequence
      setTimeout(() => {
        // Fade out a bit
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          // Then fade back in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            // After some time, fade out completely
            setTimeout(() => {
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }).start(() => {
                // Then fade back in after a pause
                setTimeout(() => {
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                  }).start(() => {
                    // Final fade out and finish
                    setTimeout(() => {
                      Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                      }).start(() => {
                        onFinish();
                      });
                    }, 1000);
                  });
                }, 500);
              });
            }, 1000);
          });
        });
      }, 500);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
  <ThemedText style={styles.title}>Eating</ThemedText>
          <ThemedText style={styles.subtitle}>made easy</ThemedText>
  <View style={styles.contentSection}/> 
   <Image
            source={require('../assets/images/splash/luffy_fat.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 logo: { 
    width: width * 0.8,        // 50% of screen width
    height: width * 0.8,       // Keep it square
    marginBottom: height * 0.05,// 5% of screen height
  },
  title: {
    ...FontStyles.h2,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...FontStyles.body,
    opacity: 0.7,
    textAlign: 'center',
  },
contentSection: {
  height: 160, // Change to any height you want
  // ... other styles
}
});