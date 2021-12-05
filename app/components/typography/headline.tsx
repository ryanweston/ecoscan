import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';

const Headline = ({prop}: any) => {
  useEffect(() => {
    console.log('wow', prop);
  });
  return <Text style={styles.text}>{prop}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0,
  },
});

export default Headline;
