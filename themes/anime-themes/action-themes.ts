import { AnimeTheme } from '@/types/theme';
import { baseTheme } from '../base-theme';

export const narutoTheme: AnimeTheme = {
  id: 'naruto-orange',
  name: 'Naruto Orange',
  description: 'Inspired by Naruto Uzumaki\'s signature orange jumpsuit and the Hidden Leaf Village',
  category: 'action',
  series: 'Naruto',
  season: 'Classic',
  rarity: 'common',
  colors: {
    primary: '#FF6B35', // Naruto orange
    secondary: '#2E8B57', // Leaf green
    tertiary: '#FFD700', // Konoha yellow
    accent: '#DC143C', // Uchiha red
    background: '#FFF8DC', // Cream background
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5DC',
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
    outline: '#FF6B35',
    outlineVariant: '#FFB366',
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
    ninjaMode: true,
    chakraColors: ['#FF6B35', '#2E8B57', '#FFD700', '#DC143C'],
  },
};

export const dragonBallTheme: AnimeTheme = {
  id: 'dragon-ball-blue',
  name: 'Dragon Ball Blue',
  description: 'Inspired by Goku\'s blue gi and the energy of Dragon Ball',
  category: 'action',
  series: 'Dragon Ball',
  season: 'Super',
  rarity: 'rare',
  colors: {
    primary: '#0066CC', // Dragon Ball blue
    secondary: '#FFD700', // Super Saiyan gold
    tertiary: '#FF4500', // Kamehameha orange
    accent: '#FF1493', // Pink energy
    background: '#F0F8FF', // Light blue background
    surface: '#FFFFFF',
    surfaceVariant: '#E6F3FF',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onTertiary: '#FFFFFF',
    onBackground: '#1A1A1A',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#1A1A1A',
    error: '#FF4500',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#0066CC',
    outlineVariant: '#4DA6FF',
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
    powerLevel: true,
    energyColors: ['#0066CC', '#FFD700', '#FF4500', '#FF1493'],
  },
};

export const onePieceTheme: AnimeTheme = {
  id: 'one-piece-straw-hat',
  name: 'Straw Hat Pirates',
  description: 'Inspired by the Straw Hat Pirates and their adventures',
  category: 'action',
  series: 'One Piece',
  season: 'Grand Line',
  rarity: 'epic',
  colors: {
    primary: '#FFD700', // Straw hat yellow
    secondary: '#FF4500', // Luffy's red vest
    tertiary: '#4169E1', // Ocean blue
    accent: '#32CD32', // Zoro's green
    background: '#F0F8FF', // Sky blue background
    surface: '#FFFFFF',
    surfaceVariant: '#E6F3FF',
    onPrimary: '#000000',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onBackground: '#1A1A1A',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#1A1A1A',
    error: '#FF4500',
    onError: '#FFFFFF',
    success: '#32CD32',
    onSuccess: '#FFFFFF',
    warning: '#FFD700',
    onWarning: '#000000',
    outline: '#FFD700',
    outlineVariant: '#FFE55C',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#1A1A1A',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#000000',
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
    pirateMode: true,
    crewColors: ['#FFD700', '#FF4500', '#4169E1', '#32CD32'],
  },
};

export const actionThemes: AnimeTheme[] = [
  narutoTheme,
  dragonBallTheme,
  onePieceTheme,
]; 