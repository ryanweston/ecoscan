import React from 'react';
import BottomNavigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../app/auth/auth-provider';
import Login from './auth';

const Main = () => {
  const {auth}: any = React.useContext(AuthContext);

  // useEffect(() => {
  //   console.log('auth log:', auth.idToken);
  //   signInSilently();
  // }, [auth]);

  // const signInSilently = async () => {
  //   try {
  //     let userInfo = await GoogleSignin.signInSilently();
  //     setAuthState(userInfo);
  //   } catch (e) {
  //     console.log('silent error', e);
  //   }
  // };

  return auth.idToken ? (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  ) : (
    <Login />
  );
};

export default Main;
