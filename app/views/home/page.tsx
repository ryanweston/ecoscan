import React, {useEffect, useState, useCallback, useContext} from 'react';
import {SafeAreaView, Text, StyleSheet, Image} from 'react-native';
import {Headline, Container} from '../../components';
import ProductItem from '../../components/product-item'; // Move to relevant place later
import {request} from '../../request';
import {AuthContext} from '../../auth/auth-provider';
import {ScrollView} from 'react-native-gesture-handler';
import {withTheme} from '../../styles/theme-context';
import ProductModal from '../product/scanner/product-modal';

const Home = ({navigation, theme}: any) => {
  const {handleUnauthorized}: any = useContext(AuthContext);
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
    console.log('THEME:', theme);
    getProducts();
  }, [getProducts, theme]);

  const headerTitle = 'Most popular';
  const headerTitle1 = 'Featured';

  return (
    <ScrollView>
      <Container>
        <SafeAreaView style={styles.header}>
          <Headline propStyles={{fontSize: 30}}>Welcome</Headline>
          <Image
            style={styles.headerImg}
            source={require('../../styles/100.png')}
          />
        </SafeAreaView>
      </Container>
      <Image
        style={{width: '100%', height: 75, margin: 0}}
        source={require('../../styles/CLIP.png')}
      />
      <Container background={true}>
        <Headline propStyles={{color: 'white'}}>{headerTitle}</Headline>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          products.map((item, index) => {
            return (
              <ProductItem
                key={index}
                navigation={navigation}
                info={item}
                setSelected={setSelected}
              />
            );
          })
        )}

        <Headline propStyles={{marginTop: 20, color: 'white'}}>
          {headerTitle1}
        </Headline>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          products.map((item, index) => {
            //@ts-ignore
            return (
              <ProductItem
                key={index}
                navigation={navigation}
                info={item}
                setSelected={setSelected}
              />
            );
          })
        )}
      </Container>
      {selected ? (
        <ProductModal barcode={selected} setBarcode={setSelected} />
      ) : null}
    </ScrollView>
  );
};

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

export default withTheme(Home);
