import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BarcodeReader from './scanner/scan';
import { ThemeContext } from '../../styles/theme-context';
import ProductPage from './product-page';

const Stack = createNativeStackNavigator();

function Product() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    // @ts-ignore
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: `${currentTheme.primary}`,
        },
        headerTitleStyle: {
          color: `${currentTheme.secondary}`,
        },
        headerTintColor: `${currentTheme.secondary}`,
      }}
    >
      <Stack.Screen name="Scan" component={BarcodeReader} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
    </Stack.Navigator>
  );
}

export default Product;
