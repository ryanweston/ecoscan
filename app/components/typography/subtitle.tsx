import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

function Subtitle(props: any) {
  return <Text style={styles.text}>{props.children}</Text>;
}

export default Subtitle;
