import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import BottomNavigation from './navigation';
import { AuthContext } from '../../app/auth/auth-provider';
import Login from './auth';
import { Container } from '../components';

function Main() {
  const { auth }: any = React.useContext(AuthContext);

  return auth.loading ? (
    <Container>
      <Text>Loading</Text>
    </Container>
  ) : auth.isSignedIn ? (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  ) : (
    <Login />
  );
}

export default Main;
