import React, {useEffect, useState} from 'react';
import {Container, Headline} from '../../components';
import {Text, View, Button} from 'react-native';
import {request} from '../../request';

interface Product {
  productName: string;
  brandName: string;
  brandRating: number;
  productRating: number;
  productQuality: number;
  totalScore: number;
}

const ProductPage = ({navigation, route}: any) => {
  const [item, setItem] = useState({});
  const {barcode} = route.params;

  useEffect(() => {
    getProduct(barcode);
  }, [barcode]);

  const getProduct = async (barcode: string) => {
    try {
      const response = await request.get('/products/?barcode=' + barcode);
      console.log(response.data);
      setItem(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {item ? (
        <View>
          <Headline>{item.productName}</Headline>
          <Headline>{item.brandName}</Headline>
          <Text>Brand: {item.brandRating}</Text>
          <Text>Quality: {item.productQuality}</Text>
          <Text>Rating: {item.productRating}</Text>
          <Headline>Total score: {item.totalScore}</Headline>
          <Button
            title="How do we evaluate scores?"
            onPress={() => {
              navigation.navigate('How do we score?');
            }}
          />
          <Button
            title="Add a review"
            onPress={() => {
              navigation.navigate('Review', {barcode: item.barcode});
            }}
          />
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </Container>
  );
};

export default ProductPage;
