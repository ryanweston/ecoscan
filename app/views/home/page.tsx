import React, {
  useEffect, useState, useCallback, useContext,
} from 'react';
import {
  SafeAreaView, Text, StyleSheet, Image, StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline, Container } from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later
import { request } from '../../request';
import { AuthContext } from '../../auth/auth-provider';
import { withTheme } from '../../styles/theme-context';
import ProductModal from '../product/scanner/product-modal';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 50,
    alignItems: 'center',
  },
  headerImg: {
    height: 30,
    marginLeft: 'auto',
  },
});

// Image imports
const logo = require('../../styles/100.png');
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
            <Headline propStyles={{ fontSize: 30 }}>Welcome</Headline>
            <Image
              style={styles.headerImg}
              source={logo}
            />
          </SafeAreaView>
        </Container>
        <Image
          style={{ width: '100%', height: 75, margin: 0 }}
          source={banner}
        />
        <Container background>
          <Headline propStyles={{ color: 'white' }}>{headerTitle}</Headline>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            products.map((item) => (
              <ProductItem
                navigation={navigation}
                info={item}
                setSelected={setSelected}
              />
            ))
          )}

          <Headline propStyles={{ marginTop: 20, color: 'white' }}>
            {headerTitle1}
          </Headline>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            products.map((item) => (
              <ProductItem
                navigation={navigation}
                info={item}
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
