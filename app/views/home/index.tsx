import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomePage from './page';
import ProductPage from '../product/product-page';
import ItemPage from '../profile/page';
import HowPage from '../product/information-page';
import ReviewPage from '../product/review-page';
import {ThemeContext} from '../../styles/theme-context';

const HomeStack = () => {
  const {currentTheme} = useContext(ThemeContext);

  return (
    //@ts-ignore
    <Stack.Navigator
      screenOptions={{
        headerMode: 'none',
        headerStyle: {
          backgroundColor: `${currentTheme.primary}`,
        },
        headerTitleStyle: {
          color: `${currentTheme.secondary}`,
        },
        headerTintColor: `${currentTheme.secondary}`,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomePage}
      />
      <Stack.Screen name="Product" component={ProductPage} />
      <Stack.Screen name="Profile" component={ItemPage} />
      <Stack.Screen name="How do we score?" component={HowPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
