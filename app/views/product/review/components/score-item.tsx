import React from 'react';
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { shadowStyle } from '@/styles/theme';
import { withTheme } from '@/styles/theme-context';
import { ITheme, IThemeProp } from '@/types';

interface Props {
  // eslint-disable-next-line no-unused-vars
  action: (value: number) => void,
  score: number,
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  input: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 0,
  },
  default: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 120,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
  shadowStyle,
});

function ScoreItem({ action, score, themeProp }: Props) {
  const options = [1, 2, 3, 4, 5];
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <View style={{
      flexDirection: 'row',
      marginTop: 15,
      justifyContent: 'space-between',
    }}
    >
      {options.map((scoreOption) => {
        const selected = !!(score === scoreOption);
        return (
          <TouchableWithoutFeedback
            key={scoreOption}
            onPress={() => {
              action(scoreOption);
            }}
          >
            <View style={[
              styles.default,
              selected ? [styles.selected, styles.shadowStyle] : null,
            ]}
            >
              <Text
                style={[
                  styles.input,
                ]}
              >
                {scoreOption}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

export default withTheme(ScoreItem);
