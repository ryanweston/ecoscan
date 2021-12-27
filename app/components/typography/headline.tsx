import React from 'react';
import {Text, StyleSheet} from 'react-native';

// @ts-ignore
const Headline = ({children, propStyles}: any) => {
  return <Text style={{...styles.text, ...propStyles}}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0,
  },
});

export default Headline;
