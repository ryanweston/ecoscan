import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  SafeAreaView, Text, StyleSheet, Image, StatusBar, Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  Headline, Container, CurveContainer, Title,
} from '@/components';
import ProductItem from '@/components/product/product-item'; // Move to relevant place later
import { request } from '@/request';
import { withTheme } from '@/styles/theme-context';
import ProductModal from '@/views/product/modal/product-modal';
import {
  HomeStackParamList, IProducts, ISustainableProducts, IThemeProp,
  TabParamList,
} from '@/types';

type HomeScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  BottomTabScreenProps<TabParamList>
>;
interface Props {
  navigation: HomeScreenNavigationProp['navigation']
  themeProp: IThemeProp
}

// Image imports
const logo = require('@/assets/scanColour.png');

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

function Home({ navigation, themeProp }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState<IProducts>([]);
  const [sustainableProducts, setSustainableProducts] = useState<ISustainableProducts>([]);
  const [selected, setSelected] = useState('');

  const { theme } = themeProp;

  const isVisible = !!selected;
  const closeModal = () => setSelected('');

  const getProducts = useCallback(async () => {
    const popularResponse = await request.get('/products/most-popular');
    const sustainableResponse = await request.get('/products/most-sustainable');
    setPopularProducts(popularResponse.data);
    setSustainableProducts(sustainableResponse.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView>

        <Container>
          <SafeAreaView style={styles.header}>
            <Headline style={{ lineHeight: 0 }}>
              Welcome!
            </Headline>
            <Pressable
              style={{ marginLeft: 'auto' }}
              onPress={() => {
                navigation.navigate('ScanStack', { screen: 'Scan' });
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
          <Title dark>Most popular</Title>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            popularProducts.map((item) => (
              <ProductItem
                // TODO: Add type for item and use barcode as key
                key={item.barcode}
                colour="#89A760"
                product={item}
                action={setSelected}
                dark
              />
            ))
          )}
        </CurveContainer>

        <Container>
          <Title style={{ marginTop: 20 }}>
            Most sustainable
          </Title>
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
                  product={newItem}
                  dark
                  colour={theme.colors.accent}
                  action={setSelected}
                />
              );
            }))}
        </Container>

        {selected ? (
          <ProductModal
            barcode={selected}
            isVisible={isVisible}
            closeModal={closeModal()}
            navigation={navigation}
          />
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(Home);
