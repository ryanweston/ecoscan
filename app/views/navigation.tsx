import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable, View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import HomeStack from '@/views/home/index';
import ScanStack from '@/views/scan';
import { AuthContext } from '@/auth/auth-provider';
import ProfilePage from './profile/page'; // Change to index for the navigation
import { withTheme } from '@/theme/theme-context';
import { IThemeProp, TabParamList } from '@/types';

const logo = require('@/assets/tabbarIcon.png');

interface Props {
  themeProp: IThemeProp
}

function ButtonProp() {
  const { logOut } = useContext(AuthContext);

  return (
    <Pressable style={{ marginRight: 10 }} onPress={() => logOut()}>
      <MaterialCommunityIcons name="logout-variant" color="white" size={25} />
    </Pressable>
  );
}

function ScanButton() {
  return (
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
  );
}

function BottomNavigation({ themeProp }: Props) {
  const Tab = createBottomTabNavigator<TabParamList>();
  const { theme } = themeProp;

  const screenOptions = (route: RouteProp<TabParamList>, color?: string) => {
    let icon; let header; let size;

    switch (route.name) {
      case 'HomeStack':
        icon = 'home';
        header = false;
        size = 30;
        break;
      case 'ScanStack':
        icon = 'camera-iris';
        header = false;
        size = 30;
        return { header, icon: <ScanButton /> };
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
          backgroundColor: `${theme.colors.primary}`,
        },
        tabBarActiveTintColor: `${theme.colors.secondary}`,
        tabBarInactiveTintColor: `${theme.colors.accent}`,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        name="ScanStack"
        component={ScanStack}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
          },
          headerTitleStyle: {
            color: `${theme.colors.secondary}`,
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

export default withTheme(BottomNavigation);
