import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './page';
import InformationPage from '../product/information/page';
import ReviewPage from '../product/review/page';
import { ThemeContext } from '../../styles/theme-context';

const Stack = createNativeStackNavigator();

function HomeStack() {
  const { currentTheme } = useContext(ThemeContext);

  return (
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

export default HomeStack;
