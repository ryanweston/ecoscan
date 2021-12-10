import React from 'react';
import BottomNavigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../app/auth/auth-provider';
import Login from './auth';
import {Text} from 'react-native';
import {Container} from '../components/';

const Main = () => {
  const {auth}: any = React.useContext(AuthContext);

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
};

export default Main;
