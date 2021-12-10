import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
      <GoogleSigninButton
        onPress={() => {
          signInUser();
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
