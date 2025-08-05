/**
 * Font constants for the app using Open Sans
 */

export const Fonts = {
  // Open Sans font families
  light: 'OpenSans_300Light',
  regular: 'OpenSans_400Regular',
  semiBold: 'OpenSans_600SemiBold',
  bold: 'OpenSans_700Bold',
  
  // Legacy font (kept for compatibility)
  spaceMono: 'SpaceMono',
} as const;

export type FontFamily = typeof Fonts[keyof typeof Fonts];

/**
 * Common font styles for consistent typography
 */
export const FontStyles = {
  // Headings
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  
  // Body text
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    lineHeight: 26,
  },
  
  // Special text
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonLarge: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
  },
  link: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
} as const;