import React from 'react';
import { Pressable } from 'react-native';
import { withTheme } from '@/theme/theme-context';
import { ITypeComponentProps } from '@/types';
import { Body } from '@/components';

interface Props extends ITypeComponentProps {
  action(): void
}

function TextLink({
  children, style, themeProp, action,
}: Props) {
  const { theme } = themeProp;

  return (
    <Pressable
      onPress={() => {
        action();
      }}
    >
      <Body style={{
        color: theme.colors.link,
        ...style,
      }}
      >
        {children}
      </Body>
    </Pressable>
  );
}

export default withTheme(TextLink);
