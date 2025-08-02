import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import merge from "deepmerge";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SettingsProvider } from "@/providers/SettingsContext";
import { ThemeProvider as AnimeThemeProvider, useTheme } from "@/providers/ThemeContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors, ...Colors.dark },
  dark: true,
  fonts: MD3DarkTheme.fonts,
};
const customLightTheme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, ...Colors.light },
  fonts: MD3LightTheme.fonts,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

function AppContent() {
  const { paperTheme, isLoading } = useTheme();
  const colorScheme = useColorScheme();

  // Use anime theme if available, otherwise fall back to default theme
  const theme = paperTheme || (colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme);

  return (
    <PaperProvider theme={theme}>
      {/* @ts-ignore */}
      <ThemeProvider value={theme}>
        <SettingsProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="calories"
              options={{ headerTitle: "Nutritional information" }}
            />
            <Stack.Screen
              name="settings"
              options={{ headerTitle: "Settings" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </SettingsProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AnimeThemeProvider>
      <AppContent />
    </AnimeThemeProvider>
  );
}
