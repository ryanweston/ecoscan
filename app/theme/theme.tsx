export const defaultTheme = {
  colors: {
    primary: '#648142',
    secondary: '#FFFFFF',
    accent: '#95B46A',
    greys: {
      background: '#EDEDED',
      border: '#CCCCCC',
    },
    background: '#FFFFFF',
    text: '#000000',
    textContrast: '#FFFFFF',
    score: {
      noScore: '#CCCCCC',
      low: '#CE7741',
      med: '#F2CE35',
      high: '#7FCB12',
    },
  },
  tokens: {
    borderRadius: 20,
    gap: 20,
  },
};

export const shadowStyle = {
  shadowColor: '#171717',
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
};

// Override with theme options when we have
// designs for a dark & light option.
export const darkTheme = {
  ...defaultTheme,
};

export const lightTheme = {
  ...defaultTheme,
};

export const themeOptions = {
  dark: { ...darkTheme },
  light: { ...lightTheme },
};
