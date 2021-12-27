import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  containerBg: {
    padding: 30,
    marginTop: -1,
    backgroundColor: '#95B46A',
  },
});

function Container({ background, children }: any) {
  return (
    <View style={[background ? styles.containerBg : styles.container]}>
      {children}
    </View>
  );
}

export default Container;
