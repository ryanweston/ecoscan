import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { setUnhandledPromiseRejectionTracker } from 'react-native-promise-rejection-utils';
import BottomNavigation from './navigation';
import { AuthContext } from '@/auth/auth-provider';
import Login from './login/page';
import LoadingPage from './loading';

function Main() {
  const { auth, handleUnauthorized } = useContext(AuthContext);

  // Error handling inside scope of Auth provider to check for issues with being
  // unauthenticated.

  function errorAlert() {
    Alert.alert(
      'Unexpected error',
      'Sorry about this. We\'re looking into it.',
      [{
        text: 'Close',
      }],
    );
  }

  // TODO: Type errors & cleanup error handling. Look at errory boundary
  const errorHandler = (e: any, isFatal: boolean) => {
    // Check that it's not an API response error
    if (isFatal && e.response === undefined) {
      // Handle JS errors with an alert
      errorAlert();
    } else if (e.response && e.response.status === 401) {
      // Handle unauthenticated error
      handleUnauthorized();
    } else {
      // Catch all other errors
      errorAlert();
    }
  };

  setJSExceptionHandler(errorHandler, true);

  // Handle all promise rejections with the promise handler
  setUnhandledPromiseRejectionTracker((id, error) => {
    errorHandler(error, false);
  });

  if (auth.loading) {
    return (
      <LoadingPage message={auth.message} />
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
