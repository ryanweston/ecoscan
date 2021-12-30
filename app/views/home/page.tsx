import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  SafeAreaView, Text, StyleSheet, Image, StatusBar, Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline, Container, CurveContainer } from '@/components';
import ProductItem from '@/components/product/product-item'; // Move to relevant place later
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';
import ProductModal from '@/views/product/modal/product-modal';
import { IProducts } from '@/types';

// Image imports
const logo = require('@/styles/scanColour.png');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  headerImg: {
    aspectRatio: 1.1,
    resizeMode: 'contain',
  },
});

function Home({ navigation, theme }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState<IProducts>([]);
  const [sustainableProducts, setSustainableProducts] = useState<IProducts>([]);
  const [selected, setSelected] = useState('');

  const getProducts = useCallback(async () => {
    const popularResponse = await request.get('/products/most-popular');
    const sustainableResponse = await request.get('/products/most-sustainable');
    setPopularProducts(popularResponse.data);
    console.log(sustainableResponse.data);
    setSustainableProducts(sustainableResponse.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // console.log('HOME RENDER');
    getProducts();
  }, [getProducts, theme]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView>

        <Container>
          <SafeAreaView style={styles.header}>
            <Headline propStyles={{ fontSize: 35, lineHeight: 0 }}>
              Welcome!
            </Headline>
            <Pressable
              style={{ marginLeft: 'auto' }}
              onPress={() => {
                navigation.navigate('Scan');
              }}
            >
              <Image
                style={styles.headerImg}
                source={logo}
              />
            </Pressable>
          </SafeAreaView>
        </Container>

        <CurveContainer topRound bottomRound>
          <Headline propStyles={{ color: 'white' }}>Most popular</Headline>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            popularProducts.map((item) => (
              <ProductItem
                // TODO: Add type for item and use barcode as key
                key={item.barcode}
                colour="#89A760"
                info={item}
                setSelected={setSelected}
                dark
              />
            ))
          )}
        </CurveContainer>

        <Container>
          <Headline propStyles={{ marginTop: 20 }}>
            Most sustainable
          </Headline>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sustainableProducts.map((item) => {
              // Temporary remap until API is fixed
              const newItem = {
                ...item.product,
                reviewAggregate: {
                  sustainabilityScore: item.sustainabilityScore,
                  qualityScore: item.qualityScore,
                },
              };
              return (
                <ProductItem
                  key={newItem.barcode}
                  info={newItem}
                  dark
                  colour={theme.currentTheme.accent}
                  setSelected={setSelected}
                />
              );
            }))}
        </Container>

        {selected ? (
          <ProductModal barcode={selected} setBarcode={setSelected} navigation={navigation} />
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(Home);
