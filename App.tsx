/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Main from './app/views/main';
import { ThemeProvider } from './app/styles/theme-context';
import { AuthProvider } from './app/auth/auth-provider';
import 'react-native-gesture-handler';

function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '267142607446-ea4jh5etipmenei9apdnog59gg4jc8o9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user
      iosClientId:
        '267142607446-edbitha6hcpm4ih0841sn154af5fo3vv.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
