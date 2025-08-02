import { AnimeTheme, ThemeCategory, ThemeSettings } from '@/types/theme';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Convert AnimeTheme to React Native Paper theme
export const convertToPaperTheme = (animeTheme: AnimeTheme, isDark: boolean = false) => {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: animeTheme.colors.primary,
      onPrimary: animeTheme.colors.onPrimary,
      primaryContainer: animeTheme.colors.primaryContainer || animeTheme.colors.primary,
      onPrimaryContainer: animeTheme.colors.onPrimaryContainer || animeTheme.colors.onPrimary,
      secondary: animeTheme.colors.secondary,
      onSecondary: animeTheme.colors.onSecondary,
      secondaryContainer: animeTheme.colors.secondaryContainer || animeTheme.colors.secondary,
      onSecondaryContainer: animeTheme.colors.onSecondaryContainer || animeTheme.colors.onSecondary,
      tertiary: animeTheme.colors.tertiary,
      onTertiary: animeTheme.colors.onTertiary,
      tertiaryContainer: animeTheme.colors.tertiaryContainer || animeTheme.colors.tertiary,
      onTertiaryContainer: animeTheme.colors.onTertiaryContainer || animeTheme.colors.onTertiary,
      error: animeTheme.colors.error,
      onError: animeTheme.colors.onError,
      errorContainer: animeTheme.colors.errorContainer || animeTheme.colors.error,
      onErrorContainer: animeTheme.colors.onErrorContainer || animeTheme.colors.onError,
      background: animeTheme.colors.background,
      onBackground: animeTheme.colors.onBackground,
      surface: animeTheme.colors.surface,
      onSurface: animeTheme.colors.onSurface,
      surfaceVariant: animeTheme.colors.surfaceVariant,
      onSurfaceVariant: animeTheme.colors.onSurfaceVariant,
      outline: animeTheme.colors.outline,
      outlineVariant: animeTheme.colors.outlineVariant,
      shadow: animeTheme.colors.shadow,
      scrim: animeTheme.colors.scrim,
      inverseSurface: animeTheme.colors.inverseSurface,
      inverseOnSurface: animeTheme.colors.inverseOnSurface,
      inversePrimary: animeTheme.colors.inversePrimary,
      elevation: animeTheme.colors.elevation,
      surfaceDisabled: animeTheme.colors.surfaceDisabled,
      onSurfaceDisabled: animeTheme.colors.onSurfaceDisabled,
      backdrop: animeTheme.colors.backdrop,
    },
  };
};

// Get theme by ID
export const getThemeById = (themes: AnimeTheme[], themeId: string): AnimeTheme | undefined => {
  return themes.find(theme => theme.id === themeId);
};

// Get themes by category
export const getThemesByCategory = (themes: AnimeTheme[], category: string): AnimeTheme[] => {
  return themes.filter(theme => theme.category === category);
};

// Get themes by rarity
export const getThemesByRarity = (themes: AnimeTheme[], rarity: string): AnimeTheme[] => {
  return themes.filter(theme => theme.rarity === rarity);
};

// Get themes by series
export const getThemesBySeries = (themes: AnimeTheme[], series: string): AnimeTheme[] => {
  return themes.filter(theme => theme.series === series);
};

// Search themes by name or description
export const searchThemes = (themes: AnimeTheme[], query: string): AnimeTheme[] => {
  const lowercaseQuery = query.toLowerCase();
  return themes.filter(theme => 
    theme.name.toLowerCase().includes(lowercaseQuery) ||
    theme.description.toLowerCase().includes(lowercaseQuery) ||
    (theme.series && theme.series.toLowerCase().includes(lowercaseQuery))
  );
};

// Get random theme
export const getRandomTheme = (themes: AnimeTheme[]): AnimeTheme => {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

// Get themes for daily rotation
export const getDailyThemes = (themes: AnimeTheme[], count: number = 5): AnimeTheme[] => {
  const shuffled = [...themes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Validate theme
export const validateTheme = (theme: AnimeTheme): boolean => {
  const requiredFields = ['id', 'name', 'description', 'category', 'rarity', 'colors'];
  
  for (const field of requiredFields) {
    if (!theme[field as keyof AnimeTheme]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Validate colors
  const requiredColors = ['primary', 'secondary', 'background', 'surface', 'onPrimary', 'onBackground', 'onSurface'];
  for (const color of requiredColors) {
    if (!theme.colors[color as keyof typeof theme.colors]) {
      console.error(`Missing required color: ${color}`);
      return false;
    }
  }
  
  return true;
};

// Create theme categories from themes
export const createThemeCategories = (themes: AnimeTheme[]): ThemeCategory[] => {
  const categories: { [key: string]: AnimeTheme[] } = {};
  
  themes.forEach(theme => {
    if (!categories[theme.category]) {
      categories[theme.category] = [];
    }
    categories[theme.category].push(theme);
  });
  
  return Object.entries(categories).map(([category, categoryThemes]) => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    description: `${categoryThemes.length} themes from ${category} anime`,
    icon: `🎌`, // Default icon, can be customized
    themes: categoryThemes,
  }));
};

// Get theme statistics
export const getThemeStats = (themes: AnimeTheme[]) => {
  const stats = {
    total: themes.length,
    byCategory: {} as { [key: string]: number },
    byRarity: {} as { [key: string]: number },
    bySeries: {} as { [key: string]: number },
  };
  
  themes.forEach(theme => {
    // Count by category
    stats.byCategory[theme.category] = (stats.byCategory[theme.category] || 0) + 1;
    
    // Count by rarity
    stats.byRarity[theme.rarity] = (stats.byRarity[theme.rarity] || 0) + 1;
    
    // Count by series
    if (theme.series) {
      stats.bySeries[theme.series] = (stats.bySeries[theme.series] || 0) + 1;
    }
  });
  
  return stats;
};

// Export all themes from different files
export const getAllThemes = (): AnimeTheme[] => {
  // This will be populated when we import all theme files
  const themes: AnimeTheme[] = [];
  
  // Import themes from different categories
  try {
    const { actionThemes } = require('./anime-themes/action-themes');
    themes.push(...actionThemes);
  } catch (error) {
    console.warn('Could not load action themes:', error);
  }
  
  try {
    const { romanceThemes } = require('./anime-themes/romance-themes');
    themes.push(...romanceThemes);
  } catch (error) {
    console.warn('Could not load romance themes:', error);
  }
  
  try {
    const { fantasyThemes } = require('./anime-themes/fantasy-themes');
    themes.push(...fantasyThemes);
  } catch (error) {
    console.warn('Could not load fantasy themes:', error);
  }
  
  try {
    const { sliceOfLifeThemes } = require('./anime-themes/slice-of-life-themes');
    themes.push(...sliceOfLifeThemes);
  } catch (error) {
    console.warn('Could not load slice-of-life themes:', error);
  }
  
  try {
    const { sportsThemes } = require('./anime-themes/sports-themes');
    themes.push(...sportsThemes);
  } catch (error) {
    console.warn('Could not load sports themes:', error);
  }
  
  try {
    const { mysteryThemes } = require('./anime-themes/mystery-themes');
    themes.push(...mysteryThemes);
  } catch (error) {
    console.warn('Could not load mystery themes:', error);
  }
  
  try {
    const { comedyThemes } = require('./anime-themes/comedy-themes');
    themes.push(...comedyThemes);
  } catch (error) {
    console.warn('Could not load comedy themes:', error);
  }
  
  try {
    const { dramaThemes } = require('./anime-themes/drama-themes');
    themes.push(...dramaThemes);
  } catch (error) {
    console.warn('Could not load drama themes:', error);
  }
  
  try {
    const { sciFiThemes } = require('./anime-themes/sci-fi-themes');
    themes.push(...sciFiThemes);
  } catch (error) {
    console.warn('Could not load sci-fi themes:', error);
  }
  
  try {
    const { horrorThemes } = require('./anime-themes/horror-themes');
    themes.push(...horrorThemes);
  } catch (error) {
    console.warn('Could not load horror themes:', error);
  }
  
  return themes;
}; 