# Anime Theme System

A comprehensive theme system for your food nutrition app with anime-inspired themes. This system supports hundreds of themes across different anime categories with easy management and customization.

## 🎨 Theme Categories

- **Action**: Naruto, Dragon Ball, One Piece, etc.
- **Romance**: Your Name, Weathering With You, etc.
- **Fantasy**: Demon Slayer, Attack on Titan, etc.
- **Slice-of-Life**: K-On!, Yuru Camp, etc.
- **Sports**: Haikyuu, Kuroko's Basketball, etc.
- **Mystery**: Detective Conan, Death Note, etc.
- **Comedy**: Gintama, One Punch Man, etc.
- **Drama**: Violet Evergarden, March Comes in Like a Lion, etc.
- **Sci-Fi**: Steins;Gate, Ghost in the Shell, etc.
- **Horror**: Tokyo Ghoul, Parasyte, etc.

## 🏗️ Architecture

### File Structure
```
themes/
├── base-theme.ts              # Base theme template
├── theme-utils.ts             # Theme utilities and helpers
└── anime-themes/
    ├── index.ts               # Export all themes
    ├── action-themes.ts       # Action anime themes
    ├── romance-themes.ts      # Romance anime themes
    ├── fantasy-themes.ts      # Fantasy anime themes
    ├── slice-of-life-themes.ts # Slice-of-life anime themes
    ├── sports-themes.ts       # Sports anime themes
    ├── mystery-themes.ts      # Mystery anime themes
    ├── comedy-themes.ts       # Comedy anime themes
    ├── drama-themes.ts        # Drama anime themes
    ├── sci-fi-themes.ts       # Sci-fi anime themes
    └── horror-themes.ts       # Horror anime themes
```

### Key Components

1. **ThemeContext** (`providers/ThemeContext.tsx`)
   - Manages current theme state
   - Handles theme switching
   - Provides theme utilities
   - Persists theme preferences

2. **ThemeSelector** (`components/ThemeSelector.tsx`)
   - Beautiful theme selection interface
   - Search and filter functionality
   - Category-based browsing
   - Favorites management

3. **Settings Integration** (`app/settings.tsx`)
   - Theme management in settings
   - Dark mode toggle
   - Theme statistics
   - Current theme display

## 🚀 Usage

### Basic Theme Usage
```typescript
import { useTheme } from '@/providers/ThemeContext';

function MyComponent() {
  const { currentTheme, setCurrentTheme, isDarkMode } = useTheme();
  
  return (
    <View style={{ backgroundColor: currentTheme.colors.background }}>
      <Text style={{ color: currentTheme.colors.onBackground }}>
        Hello Anime World!
      </Text>
    </View>
  );
}
```

### Theme Selection
```typescript
import ThemeSelector from '@/components/ThemeSelector';

function SettingsScreen() {
  const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);
  
  return (
    <>
      <Button onPress={() => setThemeSelectorVisible(true)}>
        Change Theme
      </Button>
      
      <ThemeSelector
        visible={themeSelectorVisible}
        onDismiss={() => setThemeSelectorVisible(false)}
        onThemeSelect={(theme) => console.log('Selected:', theme.name)}
      />
    </>
  );
}
```

## 🎯 Adding New Themes

### 1. Create a New Theme
```typescript
export const myNewTheme: AnimeTheme = {
  id: 'my-anime-theme',
  name: 'My Anime Theme',
  description: 'Inspired by my favorite anime',
  category: 'action', // or any other category
  series: 'My Anime',
  season: 'Season 1',
  rarity: 'common', // common, rare, epic, legendary
  colors: {
    primary: '#FF6B35',
    secondary: '#2E8B57',
    // ... all other color properties
  },
  assets: {
    backgroundImage: require('@/assets/themes/my-anime-bg.jpg'),
    iconImage: require('@/assets/themes/my-anime-icon.png'),
    previewImage: require('@/assets/themes/my-anime-preview.jpg'),
    // ... animations
  },
  ...baseTheme, // Extends base theme properties
  custom: {
    // Theme-specific custom properties
    myCustomProperty: true,
  },
};
```

### 2. Add to Category Array
```typescript
export const actionThemes: AnimeTheme[] = [
  narutoTheme,
  dragonBallTheme,
  onePieceTheme,
  myNewTheme, // Add your new theme here
];
```

### 3. The System Automatically Picks It Up!
The theme will be available in the theme selector immediately.

## 🎨 Theme Properties

### Colors
- `primary`, `secondary`, `tertiary`, `accent`
- `background`, `surface`, `surfaceVariant`
- `onPrimary`, `onSecondary`, `onBackground`, `onSurface`
- `error`, `success`, `warning` with their `on` variants
- `elevation` levels for Material Design 3

### Typography
- Font families: `regular`, `medium`, `bold`, `light`
- Font sizes: `displayLarge` to `labelSmall`
- Line heights for each size

### Effects
- Border radius: `small`, `medium`, `large`, `extraLarge`
- Spacing: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- Shadows: `small`, `medium`, `large`
- Animation durations and easing

### Assets
- `backgroundImage`: Theme background
- `iconImage`: Theme icon
- `previewImage`: Preview for theme selector
- `loadingAnimation`, `successAnimation`, `errorAnimation`: Custom animations

## 🔧 Customization

### Custom Properties
Each theme can have custom properties in the `custom` object:
```typescript
custom: {
  ninjaMode: true,
  chakraColors: ['#FF6B35', '#2E8B57', '#FFD700', '#DC143C'],
  specialEffects: 'fire',
}
```

### Theme Rarity System
- **Common**: Basic themes, always unlocked
- **Rare**: Special themes, unlock through achievements
- **Epic**: Premium themes, unlock through special events
- **Legendary**: Exclusive themes, unlock through rare achievements

## 📱 Integration with React Native Paper

The theme system automatically converts anime themes to React Native Paper themes:
```typescript
const { paperTheme } = useTheme();
// Use paperTheme with Paper components
```

## 🎯 Features

- ✅ **10 Anime Categories** with themed colors and assets
- ✅ **Theme Selector** with search and filtering
- ✅ **Favorites System** for quick access
- ✅ **Dark Mode Support** for all themes
- ✅ **Theme Statistics** and management
- ✅ **Easy Theme Addition** - just add to category files
- ✅ **Type Safety** with TypeScript
- ✅ **Persistent Storage** of theme preferences
- ✅ **Material Design 3** compatibility
- ✅ **Custom Animations** support

## 🚀 Getting Started

1. **Wrap your app** with `ThemeProvider`:
```typescript
import { ThemeProvider } from '@/providers/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

2. **Use themes** in your components:
```typescript
import { useTheme } from '@/providers/ThemeContext';

function MyComponent() {
  const { currentTheme } = useTheme();
  // Use currentTheme.colors, currentTheme.effects, etc.
}
```

3. **Add theme selection** to your settings:
```typescript
import ThemeSelector from '@/components/ThemeSelector';
// See settings.tsx for full implementation
```

That's it! Your app now has a beautiful, scalable anime theme system! 🎌✨ 