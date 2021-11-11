import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home-stack';
import BarcodeReader from './barcode-reader';
import ItemPage from './item';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();

  const screenOptions = (route: any, color?: string) => {
    let icon, header, size;

    switch (route.name) {
      case 'Home':
        icon = 'home';
        header = false;
        size = 30;
        break;
      case 'Scan':
        icon = 'camera-iris';
        header = false;
        size = 35;
        break;
      case 'Bunda':
        header = true;
        icon = 'face-man';
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
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        options={{
          tabBarStyle: {},
          title: '',
          tabBarLabelStyle: {height: 0},
        }}
        name="Scan"
        component={BarcodeReader}
      />
      <Tab.Screen name="Bunda" component={ItemPage} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
