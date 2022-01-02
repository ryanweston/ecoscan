import React from 'react';
import { Image, View } from 'react-native';
import { Container } from '@/components';
import { IThemeProp } from '@/types';
import { withTheme } from '@/styles/theme-context';

interface Props {
  topRound: boolean,
  bottomRound: boolean,
  children: React.ReactNode
  themeProp: IThemeProp
}

const banner = require('@/assets/curve.png');

function CurveContainer({
  topRound, bottomRound, children, themeProp,
}: Props) {
  const { theme } = themeProp;
  return (
    <View>
      { topRound ? (
        <Image
          style={{
            width: '100%', height: 75, margin: 0,
          }}
          source={banner}
        />
      ) : null }

      <Container style={{
        marginTop: -1,
        backgroundColor: theme.colors.accent,
        paddingTop: 10,
      }}
      >
        {children}
      </Container>

      { bottomRound ? (
        <Image
          style={{
            width: '100%', height: 60, margin: 0, transform: [{ rotate: '180deg' }],
          }}
          source={banner}
        />
      ) : null }

    </View>
  );
}

export default withTheme(CurveContainer);
