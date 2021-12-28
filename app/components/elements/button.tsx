import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 20,
    color: 'white',
    backgroundColor: '#648142',
    borderRadius: 100,
  },
  text: {
    color: 'white',
  },
});

function Button({ text, action }: any) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        action();
      }}
    >
      <Text style={styles.text}>{ text }</Text>
    </Pressable>
  );
}

export default Button;
