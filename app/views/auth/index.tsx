import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../auth/auth-provider';

const logoImg = require('../../styles/logo.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Login() {
  const { signIn }: any = React.useContext(AuthContext);

  const signInUser = async () => {
    const userInfo = await GoogleSignin.signIn();
    signIn(userInfo);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={logoImg}
      />
      <GoogleSigninButton
        style={{ width: 212, height: 48, marginTop: 20 }}
        size={GoogleSigninButton.Size.Standard}
        onPress={() => {
          signInUser();
        }}
      />
    </View>
  );
}

export default Login;
