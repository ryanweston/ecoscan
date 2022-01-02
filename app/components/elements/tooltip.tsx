import React from 'react';
import { Text } from 'react-native';
import { withTheme } from '@/styles/theme-context';

function Tooltip() {
  return (
    <Text>Tooltip</Text>
  );
}

export default withTheme(Tooltip);
