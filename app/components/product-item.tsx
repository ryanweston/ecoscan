import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Move this component to relevant place later
const ProductItem = () => {
  return (
    <View style={styles.container}>
      <Text>Product</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ProductItem;
