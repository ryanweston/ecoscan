import React from 'react';
import {Text, StyleSheet} from 'react-native';

// @ts-ignore
const Headline = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0,
  },
});

export default Headline;
