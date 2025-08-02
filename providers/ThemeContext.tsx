import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimeTheme, ThemeSettings } from '@/types/theme';
import { getAllThemes, convertToPaperTheme, getThemeById, validateTheme } from '@/themes/theme-utils';

interface ThemeContextProps {
  // Current theme state
  currentTheme: AnimeTheme | null;
  paperTheme: any; // React Native Paper theme
  isDarkMode: boolean;
  
  // Theme management
  allThemes: AnimeTheme[];
  themeSettings: ThemeSettings;
  
  // Theme actions
  setCurrentTheme: (themeId: string) => Promise<void>;
  toggleDarkMode: () => Promise<void>;
  setDarkMode: (isDark: boolean) => Promise<void>;
  unlockTheme: (themeId: string) => Promise<void>;
  addToFavorites: (themeId: string) => Promise<void>;
  removeFromFavorites: (themeId: string) => Promise<void>;
  setAutoTheme: (enabled: boolean) => Promise<void>;
  
  // Theme utilities
  getThemeById: (themeId: string) => AnimeTheme | undefined;
  getThemesByCategory: (category: string) => AnimeTheme[];
  getThemesByRarity: (rarity: string) => AnimeTheme[];
  searchThemes: (query: string) => AnimeTheme[];
  getRandomTheme: () => AnimeTheme;
  getDailyThemes: (count?: number) => AnimeTheme[];
  getThemeStats: () => any;
  
  // Loading state
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_THEME: 'current_theme_id',
  DARK_MODE: 'dark_mode',
  AUTO_THEME: 'auto_theme',
  UNLOCKED_THEMES: 'unlocked_themes',
  FAVORITE_THEMES: 'favorite_themes',
  THEME_SETTINGS: 'theme_settings',
};

const DEFAULT_THEME_ID = 'naruto-orange'; // Default theme

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<AnimeTheme | null>(null);
  const [paperTheme, setPaperTheme] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [allThemes, setAllThemes] = useState<AnimeTheme[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    currentThemeId: DEFAULT_THEME_ID,
    autoTheme: false,
    themeCategories: [],
    unlockedThemes: [DEFAULT_THEME_ID], // Default theme is always unlocked
    favoriteThemes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load all themes
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themes = getAllThemes();
        setAllThemes(themes);
        
        // Create theme categories
        const categories = themes.reduce((acc, theme) => {
          if (!acc[theme.category]) {
            acc[theme.category] = [];
          }
          acc[theme.category].push(theme);
          return acc;
        }, {} as { [key: string]: AnimeTheme[] });
        
        const themeCategories = Object.entries(categories).map(([category, categoryThemes]) => ({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
          description: `${categoryThemes.length} themes from ${category} anime`,
          icon: '🎌',
          themes: categoryThemes,
        }));
        
        setThemeSettings(prev => ({
          ...prev,
          themeCategories,
        }));
      } catch (error) {
        console.error('Error loading themes:', error);
      }
    };
    
    loadThemes();
  }, []);

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [
          savedThemeId,
          savedDarkMode,
          savedAutoTheme,
          savedUnlockedThemes,
          savedFavoriteThemes,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.CURRENT_THEME),
          AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE),
          AsyncStorage.getItem(STORAGE_KEYS.AUTO_THEME),
          AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_THEMES),
          AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_THEMES),
        ]);

        const themeId = savedThemeId || DEFAULT_THEME_ID;
        const isDark = savedDarkMode === 'true';
        const autoTheme = savedAutoTheme === 'true';
        const unlockedThemes = savedUnlockedThemes ? JSON.parse(savedUnlockedThemes) : [DEFAULT_THEME_ID];
        const favoriteThemes = savedFavoriteThemes ? JSON.parse(savedFavoriteThemes) : [];

        setIsDarkMode(isDark);
        setThemeSettings(prev => ({
          ...prev,
          currentThemeId: themeId,
          autoTheme,
          unlockedThemes,
          favoriteThemes,
        }));

        // Set current theme
        const theme = getThemeById(allThemes, themeId);
        if (theme && validateTheme(theme)) {
          setCurrentThemeState(theme);
          setPaperTheme(convertToPaperTheme(theme, isDark));
        }
      } catch (error) {
        console.error('Error loading theme settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (allThemes.length > 0) {
      loadSettings();
    }
  }, [allThemes]);

  // Update theme when current theme or dark mode changes
  useEffect(() => {
    if (currentTheme) {
      setPaperTheme(convertToPaperTheme(currentTheme, isDarkMode));
    }
  }, [currentTheme, isDarkMode]);

  const setCurrentTheme = useCallback(async (themeId: string) => {
    try {
      const theme = getThemeById(allThemes, themeId);
      if (!theme) {
        throw new Error(`Theme with ID ${themeId} not found`);
      }

      if (!validateTheme(theme)) {
        throw new Error(`Invalid theme: ${themeId}`);
      }

      setCurrentThemeState(theme);
      setThemeSettings(prev => ({ ...prev, currentThemeId: themeId }));
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_THEME, themeId);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [allThemes]);

  const toggleDarkMode = useCallback(async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, newDarkMode.toString());
  }, [isDarkMode]);

  const setDarkMode = useCallback(async (isDark: boolean) => {
    setIsDarkMode(isDark);
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, isDark.toString());
  }, []);

  const unlockTheme = useCallback(async (themeId: string) => {
    try {
      const theme = getThemeById(allThemes, themeId);
      if (!theme) {
        throw new Error(`Theme with ID ${themeId} not found`);
      }

      setThemeSettings(prev => ({
        ...prev,
        unlockedThemes: [...new Set([...prev.unlockedThemes, themeId])],
      }));
      
      const updatedUnlockedThemes = [...new Set([...themeSettings.unlockedThemes, themeId])];
      await AsyncStorage.setItem(STORAGE_KEYS.UNLOCKED_THEMES, JSON.stringify(updatedUnlockedThemes));
    } catch (error) {
      console.error('Error unlocking theme:', error);
    }
  }, [allThemes, themeSettings.unlockedThemes]);

  const addToFavorites = useCallback(async (themeId: string) => {
    try {
      setThemeSettings(prev => ({
        ...prev,
        favoriteThemes: [...new Set([...prev.favoriteThemes, themeId])],
      }));
      
      const updatedFavorites = [...new Set([...themeSettings.favoriteThemes, themeId])];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_THEMES, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }, [themeSettings.favoriteThemes]);

  const removeFromFavorites = useCallback(async (themeId: string) => {
    try {
      setThemeSettings(prev => ({
        ...prev,
        favoriteThemes: prev.favoriteThemes.filter(id => id !== themeId),
      }));
      
      const updatedFavorites = themeSettings.favoriteThemes.filter(id => id !== themeId);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_THEMES, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }, [themeSettings.favoriteThemes]);

  const setAutoTheme = useCallback(async (enabled: boolean) => {
    setThemeSettings(prev => ({ ...prev, autoTheme: enabled }));
    await AsyncStorage.setItem(STORAGE_KEYS.AUTO_THEME, enabled.toString());
  }, []);

  // Theme utility functions
  const getThemeByIdUtil = useCallback((themeId: string) => {
    return getThemeById(allThemes, themeId);
  }, [allThemes]);

  const getThemesByCategory = useCallback((category: string) => {
    return allThemes.filter(theme => theme.category === category);
  }, [allThemes]);

  const getThemesByRarity = useCallback((rarity: string) => {
    return allThemes.filter(theme => theme.rarity === rarity);
  }, [allThemes]);

  const searchThemes = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return allThemes.filter(theme => 
      theme.name.toLowerCase().includes(lowercaseQuery) ||
      theme.description.toLowerCase().includes(lowercaseQuery) ||
      (theme.series && theme.series.toLowerCase().includes(lowercaseQuery))
    );
  }, [allThemes]);

  const getRandomTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * allThemes.length);
    return allThemes[randomIndex];
  }, [allThemes]);

  const getDailyThemes = useCallback((count: number = 5) => {
    const shuffled = [...allThemes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [allThemes]);

  const getThemeStats = useCallback(() => {
    const stats = {
      total: allThemes.length,
      byCategory: {} as { [key: string]: number },
      byRarity: {} as { [key: string]: number },
      bySeries: {} as { [key: string]: number },
    };
    
    allThemes.forEach(theme => {
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
  }, [allThemes]);

  const value: ThemeContextProps = {
    currentTheme,
    paperTheme,
    isDarkMode,
    allThemes,
    themeSettings,
    setCurrentTheme,
    toggleDarkMode,
    setDarkMode,
    unlockTheme,
    addToFavorites,
    removeFromFavorites,
    setAutoTheme,
    getThemeById: getThemeByIdUtil,
    getThemesByCategory,
    getThemesByRarity,
    searchThemes,
    getRandomTheme,
    getDailyThemes,
    getThemeStats,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 