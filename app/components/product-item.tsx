import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ProductScore} from '../components';

// Move this component to relevant place later
const ProductItem = ({info, setSelected}: any) => {
  useEffect(() => {
    console.log(setSelected);
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSelected(info.barcode);
      }}>
      {info ? (
        <View style={styles.flex}>
          <Image
            style={{width: 50, height: 50, borderRadius: 35}}
            source={{uri: info.img}}
          />
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 16,
              color: 'white',
            }}>
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
    backgroundColor: '#648041',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default ProductItem;
