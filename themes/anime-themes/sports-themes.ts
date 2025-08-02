import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const haikyuuTheme: AnimeTheme = {
  id: 'haikyuu-orange',
  name: 'Haikyuu Orange',
  description: 'Inspired by the Karasuno volleyball team and their passion for the sport',
  category: 'sports',
  series: 'Haikyuu',
  season: 'Classic',
  rarity: 'common',
  colors: {
    primary: '#FF8C00', // Dark orange
    secondary: '#000080', // Navy blue
    tertiary: '#FFD700', // Gold
    accent: '#32CD32', // Green
    background: '#F0F8FF', // Alice blue
    surface: '#FFFFFF',
    surfaceVariant: '#E6F3FF',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#000000',
    onBackground: '#1A1A1A',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#1A1A1A',
    error: '#DC143C',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#FF8C00',
    outlineVariant: '#FFA500',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#1A1A1A',
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
    volleyballMode: true,
    teamColors: ['#FF8C00', '#000080', '#FFD700', '#32CD32'],
  },
};

export const sportsThemes: AnimeTheme[] = [
  haikyuuTheme,
]; 