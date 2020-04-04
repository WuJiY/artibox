import React, { ReactNode, createContext, useContext } from 'react';

export const ThemeContext = createContext<string>('');
export type ThemeContext = typeof ThemeContext;

export interface ThemeProviderProps {
  theme?: string;
  children: ReactNode;
}

/**
 * Add prefix to theme name.
 */
export function addThemeNamePrefix(theme?: string) {
  return `artibox-theme-${theme || 'artibox'}`;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const themeName = addThemeNamePrefix(theme);

  return <ThemeContext.Provider value={themeName}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
