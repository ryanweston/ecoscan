import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';

// Move this component to relevant place later
const ProductItem = ({navigation, info}: any) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Product', {id: info.id});
      }}>
      {info ? (
        <View style={styles.flex}>
          <Text>{info.brandName}</Text>
          <Text style={styles.score}>Score: {info.totalScore}</Text>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
  },
  score: {
    marginLeft: 'auto',
  },
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
