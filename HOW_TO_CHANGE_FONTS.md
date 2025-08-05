# How to Change Fonts in the App

## Quick Font Change (3 Steps)

### Step 1: Install New Font Package
```bash
# Example: To switch to Roboto
npm install @expo-google-fonts/roboto

# Example: To switch to Inter  
npm install @expo-google-fonts/inter

# Example: To switch to Poppins
npm install @expo-google-fonts/poppins
```

### Step 2: Update Font Names in `/constants/Fonts.ts`
Open `/constants/Fonts.ts` and change the font names in the `Fonts` object:

```typescript
// CURRENT (Open Sans)
export const Fonts = {
  light: 'OpenSans_300Light',
  regular: 'OpenSans_400Regular', 
  semiBold: 'OpenSans_600SemiBold',
  bold: 'OpenSans_700Bold',
  spaceMono: 'SpaceMono',
} as const;

// CHANGE TO (Example: Roboto)
export const Fonts = {
  light: 'Roboto_300Light',
  regular: 'Roboto_400Regular',
  semiBold: 'Roboto_500Medium', // Roboto doesn't have 600
  bold: 'Roboto_700Bold', 
  spaceMono: 'SpaceMono',
} as const;
```

### Step 3: Update Font Loading in `/app/_layout.tsx`
Update the imports and font loading:

```typescript
// CURRENT (Open Sans)
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

const [loaded] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
});

// CHANGE TO (Example: Roboto)
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

const [loaded] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
});
```

That's it! All components will automatically use the new fonts.

## Why This Works

All components in the app use the centralized font system:

- **ThemedText**: Uses `FontStyles` from constants
- **OnboardingButton**: Uses `FontStyles.buttonLarge`
- **OnboardingScreen**: Uses `FontStyles.h1` and `FontStyles.bodyLarge`
- **FeaturesStep**: Uses `FontStyles.bodyLarge` and `FontStyles.bodySmall`
- **PermissionsStep**: Uses `FontStyles.bodyLarge` and `FontStyles.bodySmall`
- **SplashScreen**: Uses `FontStyles.h2` and `FontStyles.body`

When you change the font names in `/constants/Fonts.ts`, all these components automatically get the new fonts.

## Popular Font Options

### Roboto (Material Design)
```bash
npm install @expo-google-fonts/roboto
```
```typescript
light: 'Roboto_300Light',
regular: 'Roboto_400Regular',
semiBold: 'Roboto_500Medium',
bold: 'Roboto_700Bold',
```

### Inter (Modern, Clean)
```bash
npm install @expo-google-fonts/inter
```
```typescript
light: 'Inter_300Light',
regular: 'Inter_400Regular', 
semiBold: 'Inter_600SemiBold',
bold: 'Inter_700Bold',
```

### Poppins (Friendly, Rounded)
```bash
npm install @expo-google-fonts/poppins
```
```typescript
light: 'Poppins_300Light',
regular: 'Poppins_400Regular',
semiBold: 'Poppins_600SemiBold', 
bold: 'Poppins_700Bold',
```

### Lato (Humanist)
```bash
npm install @expo-google-fonts/lato
```
```typescript
light: 'Lato_300Light',
regular: 'Lato_400Regular',
semiBold: 'Lato_700Bold', // Lato doesn't have 600
bold: 'Lato_900Black',
```

## Testing
After making changes:
```bash
npm start
```

The app will reload with your new fonts applied everywhere!