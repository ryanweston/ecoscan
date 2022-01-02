import { useCallback } from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useStatusBar = (style: StatusBarStyle) => {
  // When navigation is focused, during render lifecycle, set style
  // for the status bar. Reuse on every top-level page component.
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
    }, []),
  );
};

export default { useStatusBar };
