import React, {
  useEffect, useState, useCallback, useContext,
} from 'react';
import {
  SafeAreaView, Text, StyleSheet, Image, StatusBar, Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline, Container } from '@/components';
import ProductItem from '@/components/product-item'; // Move to relevant place later
import { request } from '@/request';
import { AuthContext } from '@/auth/auth-provider';
import { withTheme } from '@/styles/theme-context';
import ProductModal from '@/views/product/scanner/product-modal';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  headerImg: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
});

// Image imports
const logo = require('@/styles/scanColour.png');
const banner = require('../../styles/CLIP.png');

function Home({ navigation, theme }: any) {
  const { handleUnauthorized }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('');

  const getProducts = useCallback(async () => {
    try {
      const response = await request.get('/products/most-popular');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleUnauthorized(error.response.status);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    getProducts();
  }, [getProducts, theme]);

  const headerTitle = 'Most popular';
  const headerTitle1 = 'Featured';

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Container>
          <SafeAreaView style={styles.header}>
            <Headline propStyles={{ fontSize: 35, lineHeight: 0 }}>Welcome</Headline>
            <Pressable
              onPress={() => {
                navigation.navigate('Product');
              }}
            >
              <Image
                style={styles.headerImg}
                source={logo}
              />
            </Pressable>
          </SafeAreaView>
        </Container>
        <Image
          style={{
            width: '100%', height: 75, margin: 0,
          }}
          source={banner}
        />
        <Container background>
          <Headline propStyles={{ color: 'white' }}>{headerTitle}</Headline>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            products.map((item) => (
              <ProductItem
                // TODO: Add type for item and use barcode as key
                key={item.barcode}
                colour="#86A25E"
                info={item}
                setSelected={setSelected}
              />
            ))
          )}

        </Container>

        <Image
          style={{
            width: '100%', height: 60, margin: 0, transform: [{ rotate: '180deg' }],
          }}
          source={banner}
        />
        <Container>
          <Headline propStyles={{ marginTop: 20 }}>
            {headerTitle1}
          </Headline>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            products.map((item) => (
              <ProductItem
                key={item.barcode}
                info={item}
                colour={theme.currentTheme.accent}
                setSelected={setSelected}
              />
            ))
          )}
        </Container>
        {selected ? (
          <ProductModal barcode={selected} setBarcode={setSelected} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(Home);
