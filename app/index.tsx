import React, { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useSettings } from "@/providers/SettingsContext";

export default function AIImageScreen() {
  const [fadeAnim] = useState(new Animated.Value(1));
  const theme = useTheme();

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
      cameraType: ImagePicker.CameraType.back,
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

  const { API_KEY } = useSettings();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <IconButton
        icon="cog"
        size={24}
        onPress={handleSettingsPress}
        style={styles.settingsButton}
        iconColor={theme.colors.onSurface}
      />
      <Animated.View style={{ opacity: fadeAnim, ...styles.titleContainer }}>
        <LottieView
          source={require("../assets/animations/ai-loader.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text variant="titleLarge" style={styles.title}>
          Scan your food
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onBackground }]}
        >
          Take a photo of your food to get the nutritional information
        </Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <IconButton
          mode="contained"
          disabled={!API_KEY}
          icon="image"
          size={48}
          onPress={handleChooseImage}
          style={[styles.iconButton]}
        />

        <IconButton
          mode="contained"
          disabled={!API_KEY}
          icon="camera"
          size={48}
          onPress={handleTakePhoto}
          style={[styles.iconButton]}
        />
      </View>
      {!API_KEY && (
        <Text style={{ color: theme.colors.error }}>
          Please set your API key in the settings
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
  settingsButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  animation: {
    width: 100,
    height: 100,
    marginBottom: 32,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  iconButton: {},
});
