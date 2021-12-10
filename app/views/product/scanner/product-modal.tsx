import React, {useEffect} from 'react';
import {Modal, Text, Button} from 'react-native';
import {Container, Headline} from '../../../components';
import ProductPage from '../product-page';
// import ProductPage from '../product-page';

const ProductModal = ({barcode, setBarcode}: any) => {
  useEffect(() => {
    console.log('PRODUCT MODAL RENDERED');
    console.log(setBarcode);
  });

  // Close this modal in a more native way using the correct props
  return (
    <Modal presentationStyle="formSheet">
      <Container>
        <Button
          title="Close"
          onPress={() => {
            setBarcode('');
          }}
        />
        <Headline>Product name</Headline>
        <Text>{barcode.barcode}</Text>
      </Container>
    </Modal>
  );
};

export default ProductModal;
