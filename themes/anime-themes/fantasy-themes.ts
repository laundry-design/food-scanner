import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const demonSlayerTheme: AnimeTheme = {
  id: 'demon-slayer-red',
  name: 'Demon Slayer Red',
  description: 'Inspired by Tanjiro\'s red haori and the demon slayer corps',
  category: 'fantasy',
  series: 'Demon Slayer',
  season: 'Classic',
  rarity: 'rare',
  colors: {
    primary: '#DC143C', // Demon slayer red
    secondary: '#000080', // Navy blue
    tertiary: '#FFD700', // Gold
    accent: '#32CD32', // Green
    background: '#FFF5EE', // Seashell
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
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
    outline: '#DC143C',
    outlineVariant: '#FF6B6B',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F2F2F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#FFF5EE',
      level2: '#F5F5F5',
      level3: '#F0F0F0',
      level4: '#EBEBEB',
      level5: '#E6E6E6',
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
    breathingStyle: true,
    demonColors: ['#DC143C', '#000080', '#FFD700', '#32CD32'],
  },
};

export const attackOnTitanTheme: AnimeTheme = {
  id: 'attack-on-titan-green',
  name: 'Attack on Titan Green',
  description: 'Inspired by the Survey Corps and the walls of humanity',
  category: 'fantasy',
  series: 'Attack on Titan',
  season: 'Final',
  rarity: 'epic',
  colors: {
    primary: '#228B22', // Forest green
    secondary: '#8B4513', // Brown
    tertiary: '#FFD700', // Wings of freedom gold
    accent: '#DC143C', // Blood red
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
    outline: '#228B22',
    outlineVariant: '#32CD32',
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
    odmGear: true,
    titanColors: ['#228B22', '#8B4513', '#FFD700', '#DC143C'],
  },
};

export const fantasyThemes: AnimeTheme[] = [
  demonSlayerTheme,
  attackOnTitanTheme,
]; 