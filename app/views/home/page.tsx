import React, {useEffect, useState, useCallback, useContext} from 'react';
import {Text} from 'react-native';
import {Headline, Container} from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later
import {request} from '../../request';
import {AuthContext} from '../../auth/auth-provider';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}: any) => {
  const {handleUnauthorized}: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await request.get('/products/most-popularss');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleUnauthorized(error.response.status);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const headerTitle = 'Most popular';
  const headerTitle1 = 'Featured';

  return (
    <ScrollView>
      <Container>
        <Headline>{headerTitle}</Headline>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          products.map((item, index) => {
            return (
              <ProductItem key={index} navigation={navigation} info={item} />
            );
          })
        )}

        <Headline propStyles={{marginTop: 20}}>{headerTitle1}</Headline>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          products.map((item, index) => {
            //@ts-ignore
            return (
              <ProductItem key={index} navigation={navigation} info={item} />
            );
          })
        )}
      </Container>
    </ScrollView>
  );
};

export default Home;
