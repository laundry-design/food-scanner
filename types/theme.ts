export interface AnimeTheme {
  id: string;
  name: string;
  description: string;
  category: 'action' | 'romance' | 'fantasy' | 'slice-of-life' | 'sports' | 'mystery' | 'comedy' | 'drama' | 'sci-fi' | 'horror';
  series?: string; // The anime series this theme is based on
  season?: string; // Season or arc reference
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    onPrimary: string;
    onSecondary: string;
    onTertiary: string;
    onBackground: string;
    onSurface: string;
    onSurfaceVariant: string;
    error: string;
    onError: string;
    success: string;
    onSuccess: string;
    warning: string;
    onWarning: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
  };
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
      light: string;
    };
    fontSize: {
      displayLarge: number;
      displayMedium: number;
      displaySmall: number;
      headlineLarge: number;
      headlineMedium: number;
      headlineSmall: number;
      titleLarge: number;
      titleMedium: number;
      titleSmall: number;
      bodyLarge: number;
      bodyMedium: number;
      bodySmall: number;
      labelLarge: number;
      labelMedium: number;
      labelSmall: number;
    };
    lineHeight: {
      displayLarge: number;
      displayMedium: number;
      displaySmall: number;
      headlineLarge: number;
      headlineMedium: number;
      headlineSmall: number;
      titleLarge: number;
      titleMedium: number;
      titleSmall: number;
      bodyLarge: number;
      bodyMedium: number;
      bodySmall: number;
      labelLarge: number;
      labelMedium: number;
      labelSmall: number;
    };
  };
  assets: {
    backgroundImage?: string; // URL or local asset path
    iconImage?: string; // Theme icon
    previewImage?: string; // Preview image for theme selection
    loadingAnimation?: string; // Custom loading animation
    successAnimation?: string; // Success animation
    errorAnimation?: string; // Error animation
  };
  effects: {
    borderRadius: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    shadows: {
      small: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      medium: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      large: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };
    animations: {
      duration: {
        fast: number;
        normal: number;
        slow: number;
      };
      easing: {
        easeIn: string;
        easeOut: string;
        easeInOut: string;
      };
    };
  };
  custom: {
    // Theme-specific custom properties
    [key: string]: any;
  };
}

export interface ThemeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  themes: AnimeTheme[];
}

export interface ThemeSettings {
  currentThemeId: string;
  autoTheme: boolean;
  themeCategories: ThemeCategory[];
  unlockedThemes: string[];
  favoriteThemes: string[];
} 