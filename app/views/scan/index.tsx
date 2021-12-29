import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BarcodeReader from './page';
import { ThemeContext } from '../../styles/theme-context';

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
      <Stack.Screen name="Scan" component={BarcodeReader} />
    </Stack.Navigator>
  );
}

export default Product;
