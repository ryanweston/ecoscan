import React from 'react';
import { Image, View } from 'react-native';
import { Container } from '@/components';

const banner = require('../../styles/CLIP.png');

function CurveContainer({
  topRound, bottomRound, children,
}: any) {
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

      <Container propStyles={{
        marginTop: -1,
        backgroundColor: '#95B46A',
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

export default CurveContainer;
