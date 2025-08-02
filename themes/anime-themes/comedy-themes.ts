import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const gintamaTheme: AnimeTheme = {
  id: 'gintama-silver',
  name: 'Gintama Silver',
  description: 'Inspired by the silver-haired samurai and his wacky adventures',
  category: 'comedy',
  series: 'Gintama',
  season: 'Classic',
  rarity: 'epic',
  colors: {
    primary: '#C0C0C0', // Silver
    secondary: '#FFD700', // Gold
    tertiary: '#DC143C', // Red
    accent: '#32CD32', // Green
    background: '#F5F5F5', // Light gray
    surface: '#FFFFFF',
    surfaceVariant: '#E8E8E8',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onTertiary: '#FFFFFF',
    onBackground: '#2F2F2F',
    onSurface: '#2F2F2F',
    onSurfaceVariant: '#2F2F2F',
    error: '#DC143C',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#C0C0C0',
    outlineVariant: '#D3D3D3',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#000000',
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
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
    comedyMode: true,
    samuraiColors: ['#C0C0C0', '#FFD700', '#DC143C', '#32CD32'],
  },
};

export const comedyThemes: AnimeTheme[] = [
  gintamaTheme,
]; 