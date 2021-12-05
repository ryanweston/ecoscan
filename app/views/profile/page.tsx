import React from 'react';
import {Text, View, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../auth/auth-provider';

const ProfilePage = () => {
  let data = '';
  const {setAuthState}: any = React.useContext(AuthContext);

  const signOut = async () => {
    const userInfo = await GoogleSignin.signOut();
    console.log(userInfo);
    setAuthState('');
  };

  return (
    <View>
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
      <Text>Yo yo yo</Text>
      {data ? <Text>{data}</Text> : null}
    </View>
  );
};
export default ProfilePage;
