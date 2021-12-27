import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { Container, Headline, ProductScore } from '@/components';
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';

const styles = StyleSheet.create({
  button: {
    padding: 20,
    color: 'white',
    backgroundColor: '#648142',
    borderRadius: 100,
  },
  scoreContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
  listItem: {
    marginTop: 40,
    marginBottom: 40,
    width: '100%',
    flexDirection: 'row',
  },
});

function ProductModal({ barcode, setBarcode, theme }: any) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const colours = theme.currentTheme;

  const getProduct = async () => {
    try {
      const response = await request.get(`/products/?barcode=${barcode}`);
      setProduct(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('PRODUCT MODAL BARCODE', barcode);
    console.log('MODAL:', theme);
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
            ) : product ? (
              <ScrollView>
                <View style={styles.scoreContainer}>
                  <ProductScore score={product.reviewAggregate} large />
                </View>
                <Headline>{product.productName}</Headline>
                <Text>{product.brand.name}</Text>
                <View style={styles.listItem}>
                  <Text>Sustainability:</Text>
                  <ProgressBar
                    progress={0.3}
                    width={200}
                    height={15}
                    borderRadius={40}
                    unfilledColor="#DDD"
                    borderWidth={0}
                    color={colours.accent}
                  />
                </View>
                {/* <Image
                  style={{
                    width: 200,
                    height: 200,
                    marginTop: 20,
                    borderRadius: 50,
                  }}
                  source={{ uri: product.img }}
                /> */}
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setBarcode('');
                  }}
                >
                  <Text style={{ color: colours.secondary }}>Add a review</Text>
                </Pressable>
              </ScrollView>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Headline>Sorry, we couldn't find this item.</Headline>
              </View>
            )}
          </Container>
        </View>
      </Modal>
    </View>
  );
}

export default withTheme(ProductModal);
