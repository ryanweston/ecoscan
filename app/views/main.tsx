import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Alert } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { setUnhandledPromiseRejectionTracker } from 'react-native-promise-rejection-utils';
import BottomNavigation from './navigation';
import { AuthContext } from '../../app/auth/auth-provider';
import Login from './auth';
import { Container } from '../components';

function Main() {
  const { auth, handleUnauthorized }: any = useContext(AuthContext);

  // Error handling inside scope of Auth provider to check for issues with being
  // unauthenticated.

  const errorHandler = (e: any, isFatal: any) => {
    if (e.response.status && e.response.status === 401) {
      handleUnauthorized();
    } else if (isFatal) {
      Alert.alert(
        'Unexpected error',
        `Sorry about this. Please restart EcoScan. Error: ${e.message}`,
        [{
          text: 'Close',
        }],
      );
    }
  };

  setJSExceptionHandler(errorHandler, true);

  // Handle all promise rejections with the promise handler
  setUnhandledPromiseRejectionTracker((id, error) => {
    errorHandler(error, true);
  });

  if (auth.loading) {
    return (
      <Container>
        <Text>Loading</Text>
      </Container>
    );
  } if (auth.isSignedIn) {
    return (
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    );
  }
  return (
    <Login />
  );
}

export default Main;
