import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import {AuthContext} from '../../auth/auth-provider';

const Login = () => {
  const {setAuthState}: any = React.useContext(AuthContext);

  useEffect(() => {
    console.log('LOGIN RENDERED');
  });

  const signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setAuthState(userInfo);
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
