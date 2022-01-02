import React, { useEffect, useState } from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { withTheme } from '@/theme/theme-context';
import { IThemeProp } from '@/types';

interface Props {
  title: string,
  score: number,
  themeProp: IThemeProp
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  progressWrapper: {
    marginLeft: 'auto',
  },
});

function ScoreItem({
  title, score, themeProp,
}: Props) {
  const { theme } = themeProp;
  const [colour, setColour] = useState('');

  useEffect(() => {
    if (score !== null && score !== undefined) {
      const checkScore = score;
      if (checkScore <= 2) {
        setColour(theme.colors.score.low);
      } else if (checkScore <= 4) {
        setColour(theme.colors.score.med);
      } else if (checkScore <= 5) {
        setColour(theme.colors.score.high);
      }
    }
  }, [score]);

  return (
    <View style={styles.listItem}>
      <Text>{title}</Text>
      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={(score / 5)}
          width={250}
          height={20}
          borderRadius={40}
          unfilledColor="#F5F5F5"
          borderWidth={0}
          color={colour}
        />
      </View>
    </View>
  );
}

export default withTheme(ScoreItem);
