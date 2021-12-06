import React, {useEffect} from 'react';
import {Text, Image, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../auth/auth-provider';
import {Container} from '../../components';

const ProfilePage = () => {
  let data = '';
  const {auth, setAuthState}: any = React.useContext(AuthContext);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setAuthState({});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <Container>
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
      <Image
        style={{borderRadius: 50, width: 100, height: 100}}
        source={{uri: auth.user.photo}}
      />
      <Text>Name: {auth.user.name}</Text>
      <Text>Email: {auth.user.email}</Text>
      <Text>Email: {auth.user.email}</Text>
      {data ? <Text>{data}</Text> : null}
    </Container>
  );
};
export default ProfilePage;
