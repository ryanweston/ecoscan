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
  const {id} = route.params;

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (id: string) => {
    try {
      const response = await request.get('/products/' + id);
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
              navigation.navigate('Review');
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
