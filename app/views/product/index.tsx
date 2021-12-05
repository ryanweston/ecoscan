import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BarcodeReader from './scan';
import ProductPage from './product';

const Product = () => {
  return (
    //@ts-ignore
    <Stack.Navigator screenOptions={{headerMode: 'none'}}>
      <Stack.Screen name="Scan" component={BarcodeReader} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
    </Stack.Navigator>
  );
};

export default Product;
