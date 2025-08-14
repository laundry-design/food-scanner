const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  primary: '#0a7ea4',
  light: {
    text: '#1A1A1A', // Deep charcoal for high readability
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#555555', // Muted gray icons
    tabIconDefault: '#9E9E9E',
    tabIconSelected: tintColorLight,
    primaryColor: '#f97316', // Orange
    primaryLight: '#ffd6b4',
    primaryTextOnPrimary: '#ffffff', // White text on orange
    secondaryText: '#4B5563', // Slightly muted gray for less emphasis
  },
  dark: {
    text: '#F5F5F5', // Soft white for comfort
    background: '#151718',
    tint: tintColorDark,
    icon: '#B0B0B0',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: tintColorDark,
    primaryColor: '#f97316',
    primaryLight: '#ffd6b4',
    primaryTextOnPrimary: '#ffffff', // Still white text on orange
    secondaryText: '#D1D5DB', // Muted light gray
  },
};
