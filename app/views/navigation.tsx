import React, { useContext } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable, View, Image } from 'react-native';
import HomeStack from '@/views/home/index';
import ScanPage from '@/views/scan/page';
import { ThemeContext } from '@/styles/theme-context';
import { AuthContext } from '@/auth/auth-provider';
import ProfilePage from './profile/page'; // Change to index for the navigation

const logo = require('../styles/tabbarIcon.png');

function ButtonProp() {
  const { logOut }: any = useContext(AuthContext);

  return (
    <Pressable style={{ marginRight: 10 }} onPress={() => logOut()}>
      <MaterialCommunityIcons name="logout-variant" color="white" size={25} />
    </Pressable>
  );
}

function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const { currentTheme } = useContext(ThemeContext);

  const screenOptions = (route: any, color?: string) => {
    let icon; let header; let size;

    switch (route.name) {
      case 'HomeStack':
        icon = 'home';
        header = false;
        size = 30;
        break;
      case 'Scan':
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
      icon: route.name === 'Scan'
        ? (
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 85,
            width: 80,
            borderRadius: 120,
            backgroundColor: '#648142',
            zIndex: 1000,
          }}
          >
            <Image
              style={{
                aspectRatio: 0.7,
                resizeMode: 'contain',
                marginBottom: 12,
              }}
              source={logo}
            />
          </View>
        )
        : <MaterialCommunityIcons name={icon} color={color} size={size} />,
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
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen options={{ headerShown: false, tabBarStyle: { display: 'none' } }} name="Scan" component={ScanPage} />
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
