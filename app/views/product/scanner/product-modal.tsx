import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Pressable,
} from 'react-native';
// @ts-ignore
import {
  Container, Headline,
} from '@/components';
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';
import ProductPage from '../product-page';

function ProductModal({ barcode, setBarcode }: any) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const response = await request.get(`/products/?barcode=${barcode}`);
      setProduct(response.data);
      setLoading(false);
    } catch (e) {
      throw Error('Error getting product');
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const isVisible = !!barcode;

  // Close this modal in a more native way using the correct props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setBarcode('')}
        onBackdropPress={() => setBarcode('')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        animationIn="slideInUp"
        isVisible={isVisible}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              marginTop: 15,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Pressable
              style={{
                width: 100,
                borderRadius: 50,
                height: 5,
                backgroundColor: '#CCC',
              }}
              onPress={() => {
                setBarcode('');
              }}
            />
          </View>
          <Container>
            {loading ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Headline>Seaching for item...</Headline>
              </View>
            ) : <ProductPage product={product} setBarcode={setBarcode} /> }
          </Container>
        </View>
      </Modal>
    </View>
  );
}

export default withTheme(ProductModal);
