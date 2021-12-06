import React, {useEffect} from 'react';
import BottomNavigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../app/auth/auth-provider';
import Login from './auth';

const Main = () => {
  const {auth}: any = React.useContext(AuthContext);

  useEffect(() => {
    console.log('RERENDERING');
  }, [auth]);

  if (auth) {
    return (
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    );
  } else {
    return <Login />;
  }
};

export default Main;
