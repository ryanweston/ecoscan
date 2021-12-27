import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  containerSmall: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 70 / 2,
    marginLeft: 'auto',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerLarge: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    borderRadius: 240 / 2,
  },
  scoreSmall: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
  scoreLarge: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 48,
  },
});

function ProductScore({ score, large }: any) {
  const [colour, setColour] = useState('grey');

  useEffect(() => {
    if (score !== null && score !== undefined) {
      const checkScore = parseFloat(score.sustainabilityScore);

      if (checkScore <= 2) {
        setColour('red');
      } else if (checkScore <= 4) {
        setColour('orange');
      } else if (checkScore === 5) {
        setColour('green');
      }
    }
  }, [score, large]);

  return (
    <View
      style={[
        large ? styles.containerLarge : [styles.containerSmall],
        { backgroundColor: colour },
      ]}
    >
      <Text style={[large ? styles.scoreLarge : styles.scoreSmall]}>
        {score ? score.sustainabilityScore : '?'}
      </Text>
    </View>
  );
}

export default ProductScore;
