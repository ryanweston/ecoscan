import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from './home';
import ItemPage from './item';

const HomeStack = () => {
  return (
    //@ts-ignore
    <Stack.Navigator screenOptions={{headerMode: 'none'}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BUNDA" component={ItemPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
