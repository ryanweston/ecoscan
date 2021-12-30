import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});

function Container({ propStyles, children }: any) {
  return (
    <View style={{ ...styles.container, ...propStyles }}>
      {children}
    </View>
  );
}

export default Container;
