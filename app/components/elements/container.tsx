import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

// @ts-ignore
const Container = ({background, children}: any) => {
  return (
    <View style={[background ? styles.containerBg : styles.container]}>
      {children}
    </View>
  );
};

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

export default Container;
