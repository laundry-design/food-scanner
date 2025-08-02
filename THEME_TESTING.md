# Theme System Testing Guide

## 🎯 How to Test the Anime Theme System

### 1. **Start the App**
```bash
npm start
# or
expo start
```

### 2. **Test Theme Dropdown**
- Open the app on your device/simulator
- Look for the **"Choose Theme"** button in the top-right corner of the home screen
- Tap it to open the theme dropdown menu
- You should see all available anime themes listed

### 3. **Available Themes to Test**
- **Naruto Orange** (Action - Common)
- **Dragon Ball Blue** (Action - Rare)
- **One Piece Straw Hat** (Action - Epic)
- **Your Name Pink** (Romance - Legendary)
- **Demon Slayer Red** (Fantasy - Rare)
- **Attack on Titan Green** (Fantasy - Epic)
- **K-On! Pink** (Slice-of-Life - Common)
- **Yuru Camp Orange** (Slice-of-Life - Rare)
- **Haikyuu Orange** (Sports - Common)
- **Detective Conan Blue** (Mystery - Rare)
- **Gintama Silver** (Comedy - Epic)
- **Violet Evergarden Blue** (Drama - Legendary)
- **Steins;Gate Green** (Sci-Fi - Legendary)
- **Tokyo Ghoul Red** (Horror - Epic)

### 4. **What You Should See**
When you select a theme:
- ✅ **Background color** changes to match the anime theme
- ✅ **Text colors** adapt to the theme
- ✅ **Button colors** change to theme colors
- ✅ **Theme name** appears below the subtitle
- ✅ **Series and rarity** information is displayed
- ✅ **Settings button** and **theme dropdown** use theme colors

### 5. **Theme Features to Test**
- **Theme Persistence**: Close and reopen the app - your selected theme should remain
- **Dark Mode**: Go to Settings and toggle dark mode - themes work in both light and dark
- **Theme Statistics**: Check Settings to see theme statistics
- **Theme Categories**: All themes are organized by anime categories

### 6. **Expected Behavior**
- **Home Screen**: Background, text, and buttons should reflect the selected theme
- **Settings Screen**: Theme management section shows current theme and statistics
- **Calories Screen**: Should inherit the theme colors
- **Navigation**: All screens should use the selected theme

### 7. **Troubleshooting**
If themes don't work:
1. Check that `ThemeProvider` is properly wrapped in `_layout.tsx`
2. Ensure all theme files are properly imported
3. Check console for any import errors
4. Verify that the theme context is being used correctly

### 8. **Adding More Themes**
To add a new theme:
1. Create a new theme object in the appropriate category file
2. Add it to the category array
3. The theme will automatically appear in the dropdown

## 🎨 Theme Colors Explained

Each theme includes:
- **Primary**: Main theme color (used for primary buttons)
- **Secondary**: Secondary theme color (used for secondary buttons)
- **Background**: Main background color
- **Surface**: Card and surface colors
- **Text Colors**: Proper contrast colors for readability

## 🚀 Next Steps

Once testing is complete:
1. Add real anime-themed images and animations
2. Create more themes for each category
3. Add theme unlock system
4. Implement theme-specific animations
5. Add theme preview images

The theme system is now fully functional and ready for use! 🎌✨ 