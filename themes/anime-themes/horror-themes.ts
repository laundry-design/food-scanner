import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const tokyoGhoulTheme: AnimeTheme = {
  id: 'tokyo-ghoul-red',
  name: 'Tokyo Ghoul Red',
  description: 'Inspired by the dark world of ghouls and the red-eyed creatures',
  category: 'horror',
  series: 'Tokyo Ghoul',
  season: 'Classic',
  rarity: 'epic',
  colors: {
    primary: '#DC143C', // Crimson red
    secondary: '#2F2F2F', // Dark gray
    tertiary: '#000000', // Black
    accent: '#FFD700', // Gold
    background: '#1A1A1A', // Very dark gray
    surface: '#2F2F2F',
    surfaceVariant: '#404040',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#FFFFFF',
    error: '#DC143C',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#DC143C',
    outlineVariant: '#FF6B6B',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#FFFFFF',
    inverseOnSurface: '#000000',
    inversePrimary: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#1A1A1A',
      level2: '#2F2F2F',
      level3: '#404040',
      level4: '#4A4A4A',
      level5: '#555555',
    },
    surfaceDisabled: '#404040',
    onSurfaceDisabled: '#808080',
    backdrop: '#000000CC',
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
    ghoulMode: true,
    horrorColors: ['#DC143C', '#2F2F2F', '#000000', '#FFD700'],
  },
};

export const horrorThemes: AnimeTheme[] = [
  tokyoGhoulTheme,
]; 