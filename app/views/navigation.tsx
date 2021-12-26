import React, {useContext, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home/index';
import BarcodeReader from './product/index';
import {ThemeContext} from '../styles/theme-context';
import ProfilePage from './profile/page'; // Change to index for the navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  const {currentTheme} = useContext(ThemeContext);

  const screenOptions = (route: any, color?: string) => {
    let icon, header, size;

    switch (route.name) {
      case 'HomePage':
        icon = 'home';
        header = false;
        size = 30;
        break;
      case 'Product':
        icon = 'camera-iris';
        header = false;
        size = 30;
        break;
      case 'Profile':
        header = true;
        icon = 'account-cowboy-hat';
        size = 30;
        break;
      default:
        break;
    }
    return {
      header: header,
      icon: <MaterialCommunityIcons name={icon} color={color} size={size} />,
    };
  };

  return (
    // mention that active colours weren't considered in the designs and that i mentioned them during design review
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color).icon,
        headerShown: screenOptions(route).header,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: `${currentTheme.primary}`,
        },
        tabBarActiveTintColor: `${currentTheme.accent}`,
        tabBarInactiveTintColor: `${currentTheme.secondary}`,
      })}>
      <Tab.Screen name="HomePage" component={HomeStack} />
      <Tab.Screen options={{}} name="Product" component={BarcodeReader} />
      <Tab.Screen
        options={{
          headerMode: 'none',
          headerStyle: {
            backgroundColor: `${currentTheme.primary}`,
          },
          headerTitleStyle: {
            color: `${currentTheme.secondary}`,
          },
        }}
        name="Profile"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
