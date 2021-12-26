import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ProductScore} from '../components';

// Move this component to relevant place later
const ProductItem = ({navigation, info}: any) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Product', {barcode: info.barcode});
      }}>
      {info ? (
        <View style={styles.flex}>
          <Image
            style={{width: 50, height: 50, borderRadius: 35}}
            source={{uri: info.img}}
          />
          <Text style={{fontSize: 15, paddingLeft: 10}}>
            {info.productName}
          </Text>
          <ProductScore score={info.reviewAggregate} />
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
    alignItems: 'center',
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
