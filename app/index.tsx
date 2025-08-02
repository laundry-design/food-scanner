import React, { useMemo, useState, useEffect } from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Text, IconButton, useTheme as usePaperTheme, Menu, Button } from "react-native-paper";
import { useSettings } from "@/providers/SettingsContext";
import { useTheme } from "@/providers/ThemeContext";

export default function AIImageScreen() {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [isReady, setIsReady] = useState(false);
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensure component is mounted before rendering LottieView
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Create pulsing and rotation animations for theme icon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    
    pulseAnimation.start();
    rotateAnimation.start();
    
    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, [pulseAnim, rotateAnim]);

  const { currentTheme, allThemes, setCurrentTheme } = useTheme();
  const theme = usePaperTheme();

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      handleAIProcessing(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      handleAIProcessing(result.assets[0].uri);
    }
  };

  const handleAIProcessing = (imageUri: string) => {
    router.push({
      pathname: "/calories",
      params: { imageUri },
    });
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleThemeSelect = async (themeId: string) => {
    await setCurrentTheme(themeId);
    setThemeMenuVisible(false);
  };

  const { API_KEY, geminiModel } = useSettings();

  const buttonDisabled = useMemo(
    () => !API_KEY || !geminiModel,
    [API_KEY, geminiModel]
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <IconButton
          icon="cog"
          size={24}
          onPress={handleSettingsPress}
          style={styles.settingsButton}
          iconColor={theme.colors.onSurface}
        />
        
        <Menu
          visible={themeMenuVisible}
          onDismiss={() => setThemeMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setThemeMenuVisible(true)}
              style={styles.themeButton}
              textColor={theme.colors.onSurface}
            >
              {currentTheme?.name || 'Choose Theme'}
            </Button>
          }
        >
          {allThemes.map((theme) => (
            <Menu.Item
              key={theme.id}
              onPress={() => handleThemeSelect(theme.id)}
              title={theme.name}
              description={theme.description}
              leadingIcon={theme.assets.iconImage ? 'star' : 'palette'}
            />
          ))}
        </Menu>
      </View>
      <Animated.View style={{ opacity: fadeAnim, ...styles.titleContainer }}>
        {isReady && (
          <Animated.View 
            style={[
              styles.themeIconContainer,
              { 
                transform: [
                  { scale: pulseAnim },
                  { 
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }
                ],
                backgroundColor: `${theme.colors.primary}20`,
                borderColor: theme.colors.primary,
              }
            ]}
          >
            {currentTheme?.custom?.ninjaMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🥷
              </Text>
            )}
            {currentTheme?.custom?.powerLevel && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                ⚡
              </Text>
            )}
            {currentTheme?.custom?.pirateMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🏴‍☠️
              </Text>
            )}
            {currentTheme?.custom?.meteorMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                ☄️
              </Text>
            )}
            {currentTheme?.custom?.breathingStyle && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🔥
              </Text>
            )}
            {currentTheme?.custom?.odmGear && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🦅
              </Text>
            )}
            {currentTheme?.custom?.musicMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🎵
              </Text>
            )}
            {currentTheme?.custom?.campingMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                ⛺
              </Text>
            )}
            {currentTheme?.custom?.volleyballMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🏐
              </Text>
            )}
            {currentTheme?.custom?.detectiveMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🔍
              </Text>
            )}
            {currentTheme?.custom?.comedyMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                😄
              </Text>
            )}
            {currentTheme?.custom?.emotionalMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                💌
              </Text>
            )}
            {currentTheme?.custom?.timeTravelMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                ⏰
              </Text>
            )}
            {currentTheme?.custom?.ghoulMode && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                👹
              </Text>
            )}
            {!currentTheme?.custom && (
              <Text style={[styles.themeIcon, { color: theme.colors.primary }]}>
                🍽️
              </Text>
            )}
          </Animated.View>
        )}
        <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onBackground }]}>
          Scan your food
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onBackground }]}
        >
          Take a photo of your food to get the nutritional information
        </Text>
        {currentTheme && (
          <Text
            variant="bodyMedium"
            style={[styles.themeInfo, { color: theme.colors.primary }]}
          >
            {currentTheme.series && `${currentTheme.series} • `}{currentTheme.rarity}
          </Text>
        )}
      </Animated.View>

      <View style={styles.buttonContainer}>
        <IconButton
          mode="contained"
          disabled={buttonDisabled}
          icon="image"
          size={48}
          onPress={handleChooseImage}
          style={[styles.iconButton, { backgroundColor: theme.colors.primary }]}
          iconColor={theme.colors.onPrimary}
        />

        <IconButton
          mode="contained"
          disabled={buttonDisabled}
          icon="camera"
          size={48}
          onPress={handleTakePhoto}
          style={[styles.iconButton, { backgroundColor: theme.colors.secondary }]}
          iconColor={theme.colors.onSecondary}
        />
      </View>
      {!API_KEY && (
        <Text style={{ color: theme.colors.error }}>
          Please set your API key in the settings
        </Text>
      )}
      {API_KEY && !geminiModel && (
        <Text style={{ color: theme.colors.error }}>
          Please set your Gemini model name in the settings
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingsButton: {
    margin: 0,
  },
  themeButton: {
    minWidth: 120,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 32,
    minHeight: 200,
    maxHeight: 300,
  },
  themeIconContainer: {
    width: 120,
    height: 120,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderWidth: 2,
  },
  themeIcon: {
    fontSize: 60,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "300",
    marginTop: 8,
    opacity: 0.8,
  },
  themeInfo: {
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  iconButton: {},
});
