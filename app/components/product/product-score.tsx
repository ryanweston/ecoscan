import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { withTheme } from '@/styles/theme-context';

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
  containerMedium: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    borderRadius: 150 / 2,
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
  scoreMedium: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  scoreLarge: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 48,
  },
});

function ProductScore({
  score, large, medium, small, theme,
}: any) {
  const [background, setBackground] = useState(theme.currentTheme.grey);
  const [colour, setColour] = useState('#CCC');

  useEffect(() => {
    if (score !== null && score !== undefined) {
      const checkScore = parseFloat(score.sustainabilityScore);
      if (checkScore <= 2) {
        setBackground(theme.currentTheme.score.low);
        setColour(theme.currentTheme.secondary);
      } else if (checkScore <= 4) {
        setBackground(theme.currentTheme.score.med);
        setColour(theme.currentTheme.secondary);
      } else if (checkScore === 5) {
        setBackground(theme.currentTheme.score.high);
        setColour(theme.currentTheme.secondary);
      }
    }
  }, [score, large]);

  return (
    <View
      style={[
        large ? styles.containerLarge : null,
        medium ? styles.containerMedium : null,
        small ? styles.containerSmall : null,
        { backgroundColor: background },
        styles.shadowProp,
      ]}
    >
      <Text style={[
        large ? styles.scoreLarge : null,
        medium ? styles.scoreMedium : null,
        small ? styles.scoreSmall : null,
        { color: colour },
      ]}
      >
        {score ? score.sustainabilityScore : '?'}
      </Text>
    </View>
  );
}

export default withTheme(ProductScore);
