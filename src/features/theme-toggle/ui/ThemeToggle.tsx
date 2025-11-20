import React, { useEffect } from 'react';
import { Button } from 'shared/ui/Button';
import { useThemeStore } from '../model/theme.store';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <Button onClick={toggleTheme} variant="secondary" className={styles.button}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};

