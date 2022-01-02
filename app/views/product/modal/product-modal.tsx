import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Pressable,
} from 'react-native';
import {
  Container, Title,
} from '@/components';
import { request } from '@/request';
import { withTheme } from '@/theme/theme-context';
import ProductPage from './product-page';
import { IThemeProp } from '@/types';

interface Props {
  barcode: string,
  // eslint-disable-next-line no-unused-vars
  closeModal(): void
  navigation: object,
  themeProp: IThemeProp
}

function ProductModal({
  barcode, closeModal, navigation, themeProp,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const { theme } = themeProp;

  const getProduct = async () => {
    const response = await request.get(`/products/?barcode=${barcode}`);
    setProduct(response.data);
    setLoading(false);
  };

  const isVisible = !!barcode;

  useEffect(() => {
    if (barcode) getProduct();
  }, [barcode]);

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
        onSwipeComplete={() => closeModal()}
        onBackdropPress={() => closeModal()}
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
            borderTopLeftRadius: theme.tokens.borderRadius,
            borderTopRightRadius: theme.tokens.borderRadius,
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
                borderRadius: theme.tokens.borderRadius,
                height: 5,
                backgroundColor: theme.colors.greys.border,
              }}
              onPress={() => {
                closeModal();
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
                <Title>Seaching for item...</Title>
              </View>
            ) : <ProductPage product={product} navigation={navigation} closeModal={closeModal} /> }
          </Container>
        </View>
      </Modal>
    </View>
  );
}

export default withTheme(ProductModal);
