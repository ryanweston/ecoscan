import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { withTheme } from '@/styles/theme-context';
import { ITypeComponentProps } from '@/types';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0,
  },
});

function Subtitle({
  dark, children, style, themeProp,
}: ITypeComponentProps) {
  const { theme } = themeProp;

  return (
    <Text style={[
      styles.text,
      dark ? { color: theme.colors.textContrast } : { color: theme.colors.text },
      { ...style },
    ]}
    >
      {children}
    </Text>
  );
}

Subtitle.defaultProps = {
  dark: false,
  style: {},
};

export default withTheme(Subtitle);
