import React from 'react';
import {Modal} from 'react-native';
import ProductPage from '../product-page';

const ProductModal = () => {
  return (
    <Modal>
      <ProductPage />
    </Modal>
  );
};

export default ProductModal;
