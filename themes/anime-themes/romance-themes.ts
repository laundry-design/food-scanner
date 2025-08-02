import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const yourNameTheme: AnimeTheme = {
  id: 'your-name-pink',
  name: 'Your Name Pink',
  description: 'Inspired by the beautiful romance and meteor shower of Your Name',
  category: 'romance',
  series: 'Your Name',
  season: 'Movie',
  rarity: 'legendary',
  colors: {
    primary: '#FF69B4', // Pink
    secondary: '#87CEEB', // Sky blue
    tertiary: '#DDA0DD', // Plum
    accent: '#FFB6C1', // Light pink
    background: '#FFF0F5', // Lavender blush
    surface: '#FFFFFF',
    surfaceVariant: '#F8F8FF',
    onPrimary: '#FFFFFF',
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
    outline: '#FF69B4',
    outlineVariant: '#FFB6C1',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#FFFFFF',
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
    meteorMode: true,
    romanceColors: ['#FF69B4', '#87CEEB', '#DDA0DD', '#FFB6C1'],
  },
};

export const romanceThemes: AnimeTheme[] = [
  yourNameTheme,
]; 