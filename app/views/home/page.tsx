import React, {useEffect, useState} from 'react';
import {Headline, Container} from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later
import {request} from '../../request';

const Home = ({navigation}: any) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const headerTitle = 'Recently scanned';
  const headerTitle1 = 'Featured';

  const getProducts = async () => {
    try {
      const response = await request.get('/products');
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Headline>{headerTitle}</Headline>
      {products.length > 0 ? (
        products.map((item, index) => {
          return (
            <ProductItem key={index} navigation={navigation} info={item} />
          );
        })
      ) : (
        <ProductItem />
      )}

      <Headline>{headerTitle1}</Headline>
      {products.length > 0 ? (
        products.map((item, index) => {
          //@ts-ignore
          return (
            <ProductItem key={index} navigation={navigation} info={item} />
          );
        })
      ) : (
        <ProductItem />
      )}
    </Container>
  );
};

export default Home;
