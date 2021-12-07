import React, {useEffect, useState} from 'react';
import {Headline, Container} from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later

const Home = ({navigation}: any) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('RENDERING HOME');
    getProducts();
  }, []);

  const headerTitle = 'Recently scanned';
  const headerTitle1 = 'Featured';

  const getProducts = async () => {
    return fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(json => {
        setProducts(json);
      })
      .catch(error => {
        console.error(error);
      });
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
