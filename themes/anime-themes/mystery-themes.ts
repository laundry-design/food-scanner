import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const detectiveConanTheme: AnimeTheme = {
  id: 'detective-conan-blue',
  name: 'Detective Conan Blue',
  description: 'Inspired by the mysterious detective and his investigations',
  category: 'mystery',
  series: 'Detective Conan',
  season: 'Classic',
  rarity: 'rare',
  colors: {
    primary: '#4169E1', // Royal blue
    secondary: '#2F2F2F', // Dark gray
    tertiary: '#FFD700', // Gold
    accent: '#DC143C', // Red
    background: '#F8F8FF', // Ghost white
    surface: '#FFFFFF',
    surfaceVariant: '#F0F0F0',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
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
    outline: '#4169E1',
    outlineVariant: '#6495ED',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#F8F8FF',
      level2: '#F0F0F0',
      level3: '#E8E8E8',
      level4: '#E0E0E0',
      level5: '#D8D8D8',
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
    detectiveMode: true,
    mysteryColors: ['#4169E1', '#2F2F2F', '#FFD700', '#DC143C'],
  },
};

export const mysteryThemes: AnimeTheme[] = [
  detectiveConanTheme,
]; 