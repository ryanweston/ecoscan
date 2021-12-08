import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Subtitle = (props: any) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default Subtitle;
