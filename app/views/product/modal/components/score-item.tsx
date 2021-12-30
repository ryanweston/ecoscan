import React, { useEffect, useState } from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { withTheme } from '@/styles/theme-context';

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
  title, score, theme,
}: any) {
  const [colour, setColour] = useState('');

  useEffect(() => {
    console.log(score);
    if (score !== null && score !== undefined) {
      console.log('INSIDE SCORE');
      const checkScore = parseFloat(score);
      console.log(checkScore);
      if (checkScore <= 2) {
        setColour(theme.currentTheme.score.low);
        console.log('LOW');
      } else if (checkScore <= 4) {
        setColour(theme.currentTheme.score.med);
        console.log('MED');
      } else if (checkScore === 5) {
        setColour(theme.currentTheme.score.high);
        console.log('HIGH');
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
