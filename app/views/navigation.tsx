import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home/index';
import BarcodeReader from './product/index';
import ProfilePage from './profile/page'; // Change to index for the navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();

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
        size = 35;
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
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color).icon,
        headerShown: screenOptions(route).header,
      })}>
      <Tab.Screen name="HomePage" component={HomeStack} />
      <Tab.Screen
        options={{
          tabBarStyle: {},
          title: '',
          tabBarLabelStyle: {height: 0},
        }}
        name="Product"
        component={BarcodeReader}
      />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
