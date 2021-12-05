import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const ProductPage = ({barcode}: any) => {
  useEffect(() => {
    getProduct(barcode);
  });

  let productInfo;

  const getProduct = (id: string) => {
    return fetch('http://localhost:3000/users/' + id)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        productInfo = json;
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>{productInfo ? productInfo : 'loading'}</Text>
    </View>
  );
};

export default ProductPage;
