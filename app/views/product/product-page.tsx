import React, {useEffect, useState} from 'react';
import {Container, Headline, ProductScore} from '../../components';
import {Text, View, Button, StyleSheet} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(true);
  const {barcode} = route.params;

  useEffect(() => {
    console.log('PRODUCT PAGE RENDER');
    getProduct(barcode);
  }, [barcode]);

  const getProduct = async (barcode: string) => {
    try {
      setIsLoading(true);
      const response = await request.get('/products/?barcode=' + barcode);
      console.log(response.data);
      setItem(response.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <View style={styles.scoreContainer}>
            <ProductScore score={item.reviewAggregate} large={true} />
          </View>
          <Headline>{item.productName}</Headline>
          <Headline>
            {item.brand.name ? item.brand.name : 'No brand available'}
          </Headline>
          {item.reviewAggregate ? (
            <View>
              <Headline>Quality: {item.reviewAggregate.qualityScore}</Headline>
              <Headline>
                Sustainability: {item.reviewAggregate.sustainabilityScore}
              </Headline>
            </View>
          ) : (
            <Text>No scores yet</Text>
          )}

          <Headline style={{marginTop: 30}}>Brand:</Headline>
          {item.brand.qualityScore !== 'NaN' ? (
            <View>
              <Text>Quality: {item.brand.qualityScore}</Text>
              <Text>Sustainability: {item.brand.sustainabilityScore}</Text>
            </View>
          ) : (
            <Text>No brand information yet</Text>
          )}

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
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default ProductPage;
