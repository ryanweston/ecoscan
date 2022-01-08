import React, { useEffect, useState } from 'react';
import {
  Text, ScrollView, View, Image, StyleSheet,
} from 'react-native';
import { Container, CurveContainer, Title } from '@/components';
import { request } from '@/utils/request';
import { ITheme, IThemeProp, IUser } from '@/types';
import { withTheme } from '@/theme/theme-context';
import { useStatusBar } from '@/utils/statusBar';

interface Props {
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    padding: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: theme.tokens.borderRadius,
    borderColor: theme.colors.greys.border,
    flexGrow: 1,
  },
  wrapper: {
    fontWeight: 600,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ProfilePage({ themeProp }: Props) {
  const [user, setUser] = useState<IUser | Record<string, never>>({});

  useStatusBar('light-content');
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  const fetchUser = async () => {
    const response = await request.get('/users/me');
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ScrollView>
      <View>
        <CurveContainer bottomRound>
          { user ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: theme.tokens.gap,
              }}
            >
              <Image
                style={{
                  borderColor: `${theme.colors.secondary}`,
                  borderWidth: 7,
                  borderRadius: 100,
                  width: 200,
                  height: 200,
                }}
                source={{ uri: user.picture }}
              />
            </View>
          ) : null }
        </CurveContainer>
      </View>

      {user ? (
        <View>
          <Container>
            <Title>
              Account
            </Title>
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
    </ScrollView>
  );
}
export default withTheme(ProfilePage);
