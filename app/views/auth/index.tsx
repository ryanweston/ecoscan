import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../auth/auth-provider';

const Login = () => {
  const {signIn}: any = React.useContext(AuthContext);

  useEffect(() => {
    console.log('Login page rendered');
  }, []);

  const signInUser = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      signIn(userInfo);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../../styles/logo.png')}
      />
      <GoogleSigninButton
        style={{width: 212, height: 48, marginTop: 20}}
        size={GoogleSigninButton.Size.Standard}
        onPress={() => {
          signInUser();
        }}
      />
    </View>
  );
};

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

export default Login;
