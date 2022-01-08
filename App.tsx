/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GOOGLE_WEB_CLIENT, GOOGLE_IOS_CLIENT } from '@env';
import Main from './app/views/main';
import { ThemeProvider } from './app/theme/theme-context';
import { AuthProvider } from './app/auth/auth-provider';
import 'react-native-gesture-handler';

function App() {
  // Establish Google config on app load
  useEffect(() => {
    GoogleSignin.configure({
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId: GOOGLE_WEB_CLIENT,
      offlineAccess: true, // if you want to access Google API on behalf of the user
      // [iOS] if you want to specify the client ID of type iOS
      iosClientId: GOOGLE_IOS_CLIENT,
    });
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
