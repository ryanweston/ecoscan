import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanPage from './page';
import ReviewPage from '@/views/product/review/page';
import InformationPage from '@/views/product/information/page';
import { ThemeContext } from '@/styles/theme-context';

const Stack = createNativeStackNavigator();

function Product() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: `${currentTheme.primary}`,
        },
        headerTitleStyle: {
          color: `${currentTheme.secondary}`,
        },
        headerTintColor: `${currentTheme.secondary}`,
      }}
    >
      <Stack.Screen name="Scan" component={ScanPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
      <Stack.Screen name="Information" component={InformationPage} />
    </Stack.Navigator>
  );
}

export default Product;
