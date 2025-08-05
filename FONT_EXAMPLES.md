# Font Examples - See How Easy It Is!

## Current Setup: Open Sans
Your app currently uses Open Sans fonts. All components get their fonts from `/constants/Fonts.ts`.

## Example: Switching to Roboto

### 1. Install Roboto
```bash
npm install @expo-google-fonts/roboto
```

### 2. Update `/constants/Fonts.ts`
```typescript
// Change this:
export const Fonts = {
  light: 'OpenSans_300Light',
  regular: 'OpenSans_400Regular',
  semiBold: 'OpenSans_600SemiBold',
  bold: 'OpenSans_700Bold',
  spaceMono: 'SpaceMono',
} as const;

// To this:
export const Fonts = {
  light: 'Roboto_300Light',
  regular: 'Roboto_400Regular',
  semiBold: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
  spaceMono: 'SpaceMono',
} as const;
```

### 3. Update `/app/_layout.tsx`
```typescript
// Change imports:
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

// Change font loading:
const [loaded] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
});
```

### Result
🎉 **ALL components automatically use Roboto!**
- Splash screen title → Roboto Bold
- Onboarding titles → Roboto Bold  
- Button text → Roboto Medium
- Body text → Roboto Regular
- Small text → Roboto Regular

## Components That Automatically Update

✅ **ThemedText** - Uses FontStyles from constants
✅ **SplashScreen** - Uses FontStyles.h2 and FontStyles.body
✅ **OnboardingButton** - Uses FontStyles.buttonLarge
✅ **OnboardingScreen** - Uses FontStyles.h1 and FontStyles.bodyLarge
✅ **FeaturesStep** - Uses FontStyles for titles and descriptions
✅ **PermissionsStep** - Uses FontStyles for titles and descriptions

## No Need to Touch These Files
❌ Don't modify individual component files
❌ Don't search and replace font names
❌ Don't update styles manually

## The Magic
The centralized system means:
1. **One place to change** → `/constants/Fonts.ts`
2. **Automatic updates** → All components use FontStyles
3. **Consistent typography** → Same font scale everywhere
4. **Easy maintenance** → Change once, apply everywhere

## Try It!
1. Pick a font from the examples in `HOW_TO_CHANGE_FONTS.md`
2. Follow the 3 steps
3. Run `npm start`
4. See your entire app with new fonts! 🚀