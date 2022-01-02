import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './page';
import InformationPage from '../product/information/page';
import ReviewPage from '../product/review/page';
import { withTheme } from '@/styles/theme-context';
import { HomeStackParamList, IThemeProp } from '@/types';

interface Props {
  themeProp: IThemeProp
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack({ themeProp }: Props) {
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomePage}
      />
      <Stack.Screen name="Information" component={InformationPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
    </Stack.Navigator>
  );
}

export default withTheme(HomeStack);
