import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const violetEvergardenTheme: AnimeTheme = {
  id: 'violet-evergarden-blue',
  name: 'Violet Evergarden Blue',
  description: 'Inspired by the beautiful and emotional journey of Violet',
  category: 'drama',
  series: 'Violet Evergarden',
  season: 'Classic',
  rarity: 'legendary',
  colors: {
    primary: '#4682B4', // Steel blue
    secondary: '#F5DEB3', // Wheat
    tertiary: '#DDA0DD', // Plum
    accent: '#FFD700', // Gold
    background: '#F0F8FF', // Alice blue
    surface: '#FFFFFF',
    surfaceVariant: '#E6F3FF',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onTertiary: '#000000',
    onBackground: '#2F2F2F',
    onSurface: '#2F2F2F',
    onSurfaceVariant: '#2F2F2F',
    error: '#DC143C',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#4682B4',
    outlineVariant: '#6495ED',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#F0F8FF',
      level2: '#E6F3FF',
      level3: '#DCE8FF',
      level4: '#D2DDFF',
      level5: '#C8D2FF',
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
    emotionalMode: true,
    letterColors: ['#4682B4', '#F5DEB3', '#DDA0DD', '#FFD700'],
  },
};

export const dramaThemes: AnimeTheme[] = [
  violetEvergardenTheme,
]; 