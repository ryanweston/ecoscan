import React from 'react';
import {Headline, Container} from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later

const Home = () => {
  const headerTitle = 'Featured';

  return (
    <Container>
      <Headline>{headerTitle}</Headline>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </Container>
  );
};

export default Home;
