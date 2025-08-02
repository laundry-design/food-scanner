import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const steinsGateTheme: AnimeTheme = {
  id: 'steins-gate-green',
  name: 'Steins;Gate Green',
  description: 'Inspired by the mad scientist and time travel experiments',
  category: 'sci-fi',
  series: 'Steins;Gate',
  season: 'Classic',
  rarity: 'legendary',
  colors: {
    primary: '#32CD32', // Lime green
    secondary: '#2F2F2F', // Dark gray
    tertiary: '#FFD700', // Gold
    accent: '#DC143C', // Red
    background: '#F0F0F0', // Light gray
    surface: '#FFFFFF',
    surfaceVariant: '#E8E8E8',
    onPrimary: '#000000',
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
    outline: '#32CD32',
    outlineVariant: '#90EE90',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#000000',
    elevation: {
      level0: 'transparent',
      level1: '#F0F0F0',
      level2: '#E8E8E8',
      level3: '#E0E0E0',
      level4: '#D8D8D8',
      level5: '#D0D0D0',
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
    timeTravelMode: true,
    labColors: ['#32CD32', '#2F2F2F', '#FFD700', '#DC143C'],
  },
};

export const sciFiThemes: AnimeTheme[] = [
  steinsGateTheme,
]; 