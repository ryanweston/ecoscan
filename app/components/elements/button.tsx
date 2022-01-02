import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { withTheme } from '@/styles/theme-context';
import { ITheme, IThemeProp } from '@/types';

interface Props {
  text: string,
  action(): void
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  button: {
    padding: 20,
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.text,
    fontWeight: 'bold',
  },
});

function Button({ text, action, themeProp }: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        action();
      }}
    >
      <Text style={styles.text}>{ text }</Text>
    </Pressable>
  );
}

export default withTheme(Button);
