import React from 'react';
import BottomNavigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../app/auth/auth-provider';
import Login from './auth';

const Main = () => {
  const {auth}: any = React.useContext(AuthContext);

  return auth.idToken ? (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  ) : (
    <Login />
  );
};

export default Main;
