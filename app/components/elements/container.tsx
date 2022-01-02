import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});

function Container({ style, children }: Props) {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
}

interface Props {
  style?: object,
  children: React.ReactNode
}

Container.defaultProps = {
  style: {},
};

export default Container;
