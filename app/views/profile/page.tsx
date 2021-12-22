import React, {useEffect, useState, useContext} from 'react';
import {Text, Button, View, Image} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../auth/auth-provider';
import {Container} from '../../components';
import {ThemeContext} from '../../styles/theme-context';
import {request} from '../../request';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const {logOut}: any = useContext(AuthContext);
  const {currentTheme} = useContext(ThemeContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await request.get('/users/me');
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      logOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {user ? (
        <View>
          <View
            style={{
              width: '100%',
              paddingTop: 40,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              style={{
                borderColor: `${currentTheme.primary}`,
                borderWidth: 5,
                borderRadius: 100,
                width: 200,
                height: 200,
              }}
              source={{uri: user.picture}}
            />
          </View>
          {/* </View> */}
          <Container>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
          </Container>
        </View>
      ) : (
        <Text> Loading </Text>
      )}
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
export default ProfilePage;
