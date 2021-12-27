import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  Button,
  Image,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Container, Headline, ProductScore} from '../../../components';
import {request} from '../../../request';

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

  let isVisible = !!barcode;

  // Close this modal in a more native way using the correct props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setBarcode('')}
        onBackdropPress={() => setBarcode('')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        animationIn={'slideInUp'}
        isVisible={isVisible}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              marginTop: 15,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
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
                }}>
                <Headline>Seaching for item...</Headline>
              </View>
            ) : product ? (
              <ScrollView>
                <View style={styles.scoreContainer}>
                  <ProductScore score={product.reviewAggregate} large={true} />
                </View>
                <Headline>{product.productName}</Headline>
                <Text>{product.brand.name}</Text>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    marginTop: 20,
                    borderRadius: 50,
                  }}
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Headline>Sorry, we couldn't find this item.</Headline>
              </View>
            )}
          </Container>
        </View>
      </Modal>
    </View>
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

export default ProductModal;
