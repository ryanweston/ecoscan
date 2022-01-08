// Disable prop spreading for HOC component
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { themeOptions } from './theme';

interface Props {
  children: React.ReactNode
}

const initializeTheme = {
  dark: true,
  theme: themeOptions.dark,
  toggle: () => {},
};

// Create context using initial theme that's accessible through the whole component tree
const ThemeContext = React.createContext(initializeTheme);

function ThemeProvider({ children }: Props) {
  const [dark, setDark] = React.useState(true);

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark;
    setDark(isDark);
  };

  const theme = dark ? themeOptions.dark : themeOptions.light;

  const themeValues = useMemo(() => ({
    dark, theme, toggle,
  }), [dark]);

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}

// Compositional HOC component that wraps given component in a context consumer
// eslint-disable-next-line func-names
const withTheme = <P extends object>(Component: React.FunctionComponent<P>) => function
({ ...props }) {
  return (
    <ThemeContext.Consumer>
      {(themeValues) => <Component themeProp={themeValues} {...props as P} />}
    </ThemeContext.Consumer>
  );
};

export { ThemeContext, ThemeProvider, withTheme };
