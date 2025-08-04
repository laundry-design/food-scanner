import { useEffect, useState } from 'react';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) {
    try {
      // Try to get system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        return mediaQuery.matches ? 'dark' : 'light';
      }
    } catch (error) {
      console.warn('Error getting color scheme:', error);
    }
  }

  return 'dark'; // Default to dark theme
}
