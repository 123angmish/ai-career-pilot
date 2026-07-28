import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyLightOnly() {
  const root = window.document.documentElement;
  root.classList.remove('dark');
  root.classList.add('light');
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<ThemeMode>('light');
  const [resolvedTheme] = useState<'light'>('light');

  useEffect(() => {
    applyLightOnly();
    localStorage.setItem('cp_theme', 'light');
  }, []);

  const setTheme = () => {};
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
