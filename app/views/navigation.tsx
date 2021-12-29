import React, { useContext } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HomeStack from './home/index';
import BarcodeReader from './product/index';
import { ThemeContext } from '../styles/theme-context';
import { AuthContext } from '@/auth/auth-provider';
import ProfilePage from './profile/page'; // Change to index for the navigation

function ButtonProp() {
  const { logOut }: any = useContext(AuthContext);

  const signOut = async () => {
    await GoogleSignin.signOut();
    logOut();
  };

  return (
    <Pressable style={{ marginRight: 10 }} onPress={() => signOut()}>
      <MaterialCommunityIcons name="logout-variant" color="white" size={25} />
    </Pressable>
  );
}

function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const { currentTheme } = useContext(ThemeContext);

  const screenOptions = (route: any, color?: string) => {
    let icon; let header; let
      size;

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
        icon = 'account';
        size = 30;
        break;
      default:
        break;
    }
    return {
      header,
      icon: <MaterialCommunityIcons name={icon} color={color} size={size} />,
    };
  };

  return (
    // mention that active colours weren't considered in the designs
    // and that i mentioned them during design review
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color).icon,
        headerShown: screenOptions(route).header,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: `${currentTheme.primary}`,
        },
        tabBarActiveTintColor: `${currentTheme.secondary}`,
        tabBarInactiveTintColor: `${currentTheme.accent}`,
      })}
    >
      <Tab.Screen name="HomePage" component={HomeStack} />
      <Tab.Screen options={{ headerShown: false, tabBarStyle: { display: 'none' } }} name="Product" component={BarcodeReader} />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: `${currentTheme.primary}`,
          },
          headerTitleStyle: {
            color: `${currentTheme.secondary}`,
          },
          headerRight: () => (
            ButtonProp()
          ),
        }}
        name="Profile"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
