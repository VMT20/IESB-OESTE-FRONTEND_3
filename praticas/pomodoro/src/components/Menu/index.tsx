import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink'; // Trocado para o nosso wrapper
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink className={styles.menuLink} href="/">
        <HouseIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink} href="/history">
        <HistoryIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink} href="/settings">
        <SettingsIcon />
      </RouterLink>

      <button 
  className={styles.menuLink} 
  onClick={handleThemeChange} 
  aria-label="Mudar Tema" 
  title="Mudar Tema"
  style={{ cursor: 'pointer' }} // 🎯 Correção visual aplicada aqui!
>
  {nextThemeIcon[theme]}
</button>
    </nav>
  );
}