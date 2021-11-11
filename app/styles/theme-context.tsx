import React from 'react';
import theme from './theme';

const initializeTheme = {
  dark: true,
  currentTheme: theme.dark,
  toggle: () => {},
};

// Create context using initial theme that's accessible through the whole component tree
const ThemeContext = React.createContext(initializeTheme);

const ThemeProvider = ({children}: any) => {
  const [dark, setDark] = React.useState(true); // Default theme is light

  // On mount, read the preferred theme from the persistence

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark;
    setDark(isDark);
  };

  const currentTheme = dark ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{currentTheme, dark, toggle}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
