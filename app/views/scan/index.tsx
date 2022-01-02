import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanPage from './page';
import ReviewPage from '@/views/product/review/page';
import InformationPage from '@/views/product/information/page';
import { withTheme } from '@/styles/theme-context';
import { IThemeProp, ScanStackParamList } from '@/types';

interface Props {
  themeProp: IThemeProp
}

const Stack = createNativeStackNavigator<ScanStackParamList>();

function Product({ themeProp }: Props) {
  const { theme } = themeProp;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: `${theme.colors.primary}`,
        },
        headerTitleStyle: {
          color: `${theme.colors.secondary}`,
        },
        headerTintColor: `${theme.colors.secondary}`,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="Scan" component={ScanPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
      <Stack.Screen name="Information" component={InformationPage} />
    </Stack.Navigator>
  );
}

export default withTheme(Product);
