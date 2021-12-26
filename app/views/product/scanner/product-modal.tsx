import React, {useEffect, useState, useContext} from 'react';
import {Modal, Text, Button, Image, ScrollView, View} from 'react-native';
import {Container, Headline} from '../../../components';
import {request} from '../../../request';
import {AuthContext} from '../../../auth/auth-provider';

const ProductModal = ({barcode, setBarcode}: any) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log('PRODUCT MODAL BARCODE', barcode);
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await request.get('/products/?barcode=' + barcode);
      setProduct(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Close this modal in a more native way using the correct props
  return (
    <Modal presentationStyle="formSheet">
      <Button
        title="Close"
        onPress={() => {
          setBarcode('');
        }}
      />
      <Container>
        {loading ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Headline>Seaching for item...</Headline>
          </View>
        ) : product ? (
          <ScrollView>
            <Headline>{product.productName}</Headline>
            <Text>{product.brand.name}</Text>
            <Image
              style={{width: 200, height: 200, marginTop: 20, borderRadius: 50}}
              source={{uri: product.img}}
            />
            <Button
              title="Add a review"
              onPress={() => {
                setBarcode('');
              }}
            />
          </ScrollView>
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Headline>Sorry, we couldn't find this item.</Headline>
          </View>
        )}
      </Container>
    </Modal>
  );
};

export default ProductModal;
