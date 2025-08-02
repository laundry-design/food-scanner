import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const kOnTheme: AnimeTheme = {
  id: 'k-on-pink',
  name: 'K-On! Pink',
  description: 'Inspired by the light music club and their cute adventures',
  category: 'slice-of-life',
  series: 'K-On!',
  season: 'Classic',
  rarity: 'common',
  colors: {
    primary: '#FFB6C1', // Light pink
    secondary: '#87CEEB', // Sky blue
    tertiary: '#DDA0DD', // Plum
    accent: '#FFD700', // Gold
    background: '#FFF0F5', // Lavender blush
    surface: '#FFFFFF',
    surfaceVariant: '#F8F8FF',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onTertiary: '#000000',
    onBackground: '#2F2F2F',
    onSurface: '#2F2F2F',
    onSurfaceVariant: '#2F2F2F',
    error: '#FF69B4',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#FFB6C1',
    outlineVariant: '#FFC0CB',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#000000',
    elevation: {
      level0: 'transparent',
      level1: '#FFF0F5',
      level2: '#F8F8FF',
      level3: '#F0F0FF',
      level4: '#E8E8FF',
      level5: '#E0E0FF',
    },
    surfaceDisabled: '#F5F5F5',
    onSurfaceDisabled: '#BDBDBD',
    backdrop: '#00000080',
  },
  assets: {
    backgroundImage: require('@/assets/icons/icon.png'),
    iconImage: require('@/assets/icons/icon.png'),
    previewImage: require('@/assets/icons/icon.png'),
    loadingAnimation: require('@/assets/animations/ai-loader.json'),
    successAnimation: require('@/assets/animations/ai-loader.json'),
    errorAnimation: require('@/assets/animations/ai-loader.json'),
  },
  ...baseTheme,
  custom: {
    musicMode: true,
    bandColors: ['#FFB6C1', '#87CEEB', '#DDA0DD', '#FFD700'],
  },
};

export const yuruCampTheme: AnimeTheme = {
  id: 'yuru-camp-orange',
  name: 'Yuru Camp Orange',
  description: 'Inspired by the cozy camping adventures and warm campfires',
  category: 'slice-of-life',
  series: 'Yuru Camp',
  season: 'Classic',
  rarity: 'rare',
  colors: {
    primary: '#FF8C00', // Dark orange
    secondary: '#228B22', // Forest green
    tertiary: '#8B4513', // Brown
    accent: '#FFD700', // Gold
    background: '#FFF8DC', // Cornsilk
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5DC',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onBackground: '#2F2F2F',
    onSurface: '#2F2F2F',
    onSurfaceVariant: '#2F2F2F',
    error: '#FF4500',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#FF8C00',
    outlineVariant: '#FFA500',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#FFF8DC',
      level2: '#F5F5DC',
      level3: '#F0F0DC',
      level4: '#EBEBDC',
      level5: '#E6E6DC',
    },
    surfaceDisabled: '#F5F5F5',
    onSurfaceDisabled: '#BDBDBD',
    backdrop: '#00000080',
  },
  assets: {
    backgroundImage: require('@/assets/icons/icon.png'),
    iconImage: require('@/assets/icons/icon.png'),
    previewImage: require('@/assets/icons/icon.png'),
    loadingAnimation: require('@/assets/animations/ai-loader.json'),
    successAnimation: require('@/assets/animations/ai-loader.json'),
    errorAnimation: require('@/assets/animations/ai-loader.json'),
  },
  ...baseTheme,
  custom: {
    campingMode: true,
    natureColors: ['#FF8C00', '#228B22', '#8B4513', '#FFD700'],
  },
};

export const sliceOfLifeThemes: AnimeTheme[] = [
  kOnTheme,
  yuruCampTheme,
]; 