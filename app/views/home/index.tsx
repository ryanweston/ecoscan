import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomePage from './page';
import ProductPage from '../product/product';
import ItemPage from '../profile/page';
import HowPage from '../product/how';
import ReviewPage from '../product/add-review';

const HomeStack = () => {
  return (
    //@ts-ignore
    <Stack.Navigator screenOptions={{headerMode: 'none'}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Product" component={ProductPage} />
      <Stack.Screen name="Profile" component={ItemPage} />
      <Stack.Screen name="How do we score?" component={HowPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
