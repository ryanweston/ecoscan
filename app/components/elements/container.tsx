import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

// @ts-ignore
const Container = prop => {
  return <View style={styles.container}>{prop.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});

export default Container;
