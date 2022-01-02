import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { withTheme } from '@/styles/theme-context';
import { shadowStyle } from '@/styles/theme';
import { ITheme, IThemeProp, IReview } from '@/types';

interface Props {
  score: IReview | undefined | null,
  large: boolean,
  medium: boolean,
  small: boolean,
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  containerSmall: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 70 / 2,
    marginLeft: 'auto',
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
    color: theme.colors.textContrast,
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
  shadowStyle,
});

function ProductScore({
  score, large, medium, small, themeProp,
}: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  const [background, setBackground] = useState(theme.colors.greys.background);
  const [colour, setColour] = useState('#CCC');

  // TODO: Handle this in a cleaner way
  useEffect(() => {
    if (score !== null && score !== undefined) {
      const checkScore = score.sustainabilityScore;
      if (checkScore <= 2) {
        setBackground(theme.colors.score.low);
        setColour(theme.colors.secondary);
      } else if (checkScore <= 4) {
        setBackground(theme.colors.score.med);
        setColour(theme.colors.secondary);
      } else if (checkScore === 5) {
        setBackground(theme.colors.score.high);
        setColour(theme.colors.secondary);
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
        styles.shadowStyle,
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
