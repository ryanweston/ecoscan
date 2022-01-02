export const defaultTheme = {
  colors: {
    primary: '#648142',
    secondary: '#FFFFFF',
    accent: '#95B46A',
    greys: {
      background: '#CCC',
      button: '#AAABBC',
    },
    text: '#000000',
    textContrast: '#FFFFFF',
    score: {
      low: '#CE7741',
      med: '#F2CE35',
      high: '#7FCB12',
    },
  },
  tokens: {
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
};

export const shadowStyle = {
  shadowColor: '#171717',
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.3,
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
