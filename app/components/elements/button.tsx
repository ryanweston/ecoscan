import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { withTheme } from '@/theme/theme-context';
import { ITheme, IThemeProp } from '@/types';

interface Props {
  style: {},
  disabled: boolean,
  text: string,
  action(): void
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  button: {
    padding: theme.tokens.gap,
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.textContrast,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.2,
  },
});

function Button({
  style, disabled, text, action, themeProp,
}: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <Pressable
      style={[styles.button, disabled ? styles.disabled : null, { ...style }]}
      onPress={() => {
        action();
      }}
    >
      <Text style={styles.text}>{ text }</Text>
    </Pressable>
  );
}

export default withTheme(Button);
