import React, { useEffect, useState, useContext } from 'react';
import {
  Text, ScrollView, View, Image, StyleSheet,
} from 'react-native';
import { Container, Headline } from '@/components';
import { ThemeContext } from '@/styles/theme-context';
import { request } from '@/request';
import { IUser } from '@/types';

const banner = require('../../styles/CLIP.png');

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#CCC',
    flexGrow: 1,
  },
  wrapper: {
    fontWeight: 600,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ProfilePage() {
  const [user, setUser] = useState<IUser | Record<string, never>>({});
  const { currentTheme } = useContext(ThemeContext);

  const fetchUser = async () => {
    try {
      const response = await request.get('/users/me');
      setUser(response.data);
    } catch (e) {
      throw Error('Error getting user');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ScrollView>
      <View>
        <Container background>
          { user ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  borderColor: `${currentTheme.secondary}`,
                  borderWidth: 7,
                  borderRadius: 100,
                  width: 200,
                  height: 200,
                }}
                source={{ uri: user.picture }}
              />
            </View>
          ) : null }
        </Container>
        <Image
          style={{
            width: '100%', height: 60, margin: 0, transform: [{ rotate: '180deg' }],
          }}
          source={banner}
        />
      </View>

      {user ? (
        <View>
          <Container>
            <Headline>
              Account
            </Headline>
            <View style={styles.wrapper}>
              <Text>
                Name:
              </Text>
              <View style={styles.container}>
                <Text>
                  {user.name}
                </Text>
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text>
                Email:
              </Text>
              <View style={styles.container}>
                <Text>
                  {user.email}
                </Text>
              </View>
            </View>
          </Container>
        </View>
      ) : (
        <Text> Loading </Text>
      ) }
      {/* <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      /> */}
    </ScrollView>
  );
}
export default ProfilePage;
