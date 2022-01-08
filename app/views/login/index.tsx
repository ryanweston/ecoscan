import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './login';
import PrivacyPage from './privacy';
import { withTheme } from '@/theme/theme-context';
import { IThemeProp, LoginStackParamList } from '@/types';

interface Props {
  themeProp: IThemeProp
}

const Stack = createNativeStackNavigator<LoginStackParamList>();

function LoginStack({ themeProp }: Props) {
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
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
      <Stack.Screen name="Privacy" component={PrivacyPage} />
    </Stack.Navigator>
  );
}

export default withTheme(LoginStack);
