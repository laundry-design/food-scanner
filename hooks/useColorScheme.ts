import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  try {
    return _useColorScheme() as 'light' | 'dark';
  } catch (error) {
    // Fallback to dark theme if there's an error
    return 'dark';
  }
}
