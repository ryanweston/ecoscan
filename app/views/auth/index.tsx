import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import {AuthContext} from '../../auth/auth-provider';

const Login = () => {
  // const {setAuthState}: any = React.useContext(AuthContext);
  const {setAuthState}: any = React.useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '267142607446-edbitha6hcpm4ih0841sn154af5fo3vv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      iosClientId:
        '267142607446-edbitha6hcpm4ih0841sn154af5fo3vv.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  });

  const signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setAuthState(userInfo.idToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        onPress={() => {
          signIn();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});

export default Login;
