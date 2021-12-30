import React from 'react';
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    fontSize: 30,
    // marginRight: 10,
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
    backgroundColor: '#648142',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

function ScoreItem({ action, score }: any) {
  const options = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
      {options.map((scoreOption) => {
        const selected = !!(score === scoreOption);
        return (
          <TouchableWithoutFeedback
            key={scoreOption}
            onPress={() => {
              action(scoreOption);
            }}
          >
            <View style={[styles.default, selected ? styles.selected : null]}>
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

export default ScoreItem;
