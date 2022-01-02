import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { withTheme } from '@/theme/theme-context';
import { IThemeProp } from '@/types';

interface Props {
  action(): void
  themeProp: IThemeProp
}

function Tooltip({ action, themeProp }: Props) {
  const { theme } = themeProp;
  return (
    <Pressable onPress={() => {
      action();
    }}
    >
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 25,
        borderColor: theme.colors.greys.border,
        borderWidth: 2,
        borderRadius: 40,
      }}
      >
        <Text style={{ fontWeight: 'bold', color: theme.colors.greys.border }}>?</Text>
      </View>
    </Pressable>
  );
}

export default withTheme(Tooltip);
