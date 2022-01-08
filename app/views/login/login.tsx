import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Body, TextLink } from '@/components';
import { AuthContext } from '../../auth/auth-provider';
import { ITheme, IThemeProp, LoginStackParamList } from '@/types';
import { withTheme } from '@/theme/theme-context';
import { useStatusBar } from '@/utils/statusBar';

const logoImg = require('@/assets/logo.png');

interface Props {
  navigation: NativeStackNavigationProp<LoginStackParamList, 'Login'>,
  themeProp: IThemeProp,
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacySection: {
    marginTop: theme.tokens.sectionGap,
    opacity: 0.65,
  },
});

// This component has very hacky styles
// Look at better variant component practices before fixing

function Login({ navigation, themeProp }: Props) {
  const { signIn } = React.useContext(AuthContext);

  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  useStatusBar('dark-content');

  const signInUser = async () => {
    const userInfo = await GoogleSignin.signIn();
    signIn(userInfo);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 212, height: 250, marginTop: theme.tokens.sectionGap }}
        source={logoImg}
      />
      <GoogleSigninButton
        style={{ width: 212, height: 48, marginTop: 20 }}
        size={GoogleSigninButton.Size.Standard}
        onPress={() => {
          signInUser();
        }}
      />
      <Body style={styles.privacySection}>
        By signing up you agree to our
      </Body>
      <TextLink
        action={() => {
          navigation.navigate('Privacy');
        }}
        style={{ opacity: 0.65 }}
      >
        privacy policy
      </TextLink>
    </View>
  );
}

export default withTheme(Login);
