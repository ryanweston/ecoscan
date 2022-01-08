import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import Keychain from 'react-native-keychain';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { request, setTokenHeaders } from '@/utils/request';
import { ITokens } from '@/types';

interface Props {
  children: React.ReactNode;
}

interface IAuth {
  isSignedIn: boolean,
  loading: boolean,
  message: string
}

interface IAuthContext {
  auth: IAuth,
  handleUnauthorized: (() => Promise<void>) | (() => void),
  // eslint-disable-next-line no-unused-vars
  signIn: ((value: User) => Promise<void>) | (() => void),
  logOut: (() => Promise<void>) | (() => void),
}

const authObjectDefault: IAuth = {
  isSignedIn: false, loading: false, message: '',
};

const authContextDefault: IAuthContext = {
  auth: { isSignedIn: false, loading: false, message: '' },
  handleUnauthorized: () => {},
  signIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<IAuth>(authObjectDefault);

  async function getAuthState() {
    try {
      setAuth({ ...auth, loading: true, message: 'Signing in' });
      // Called on mount, fetches tokens from keychain, sets headers & state
      const result = await Keychain.getGenericPassword({ service: 'netscapes' });
      if (result && result.password) {
        const tokens = JSON.parse(result.password);
        setTokenHeaders(tokens.accessToken);
        setAuth({ isSignedIn: true, loading: false, message: '' });
        return;
      }
      setAuth({ isSignedIn: false, loading: false, message: '' });
    } catch (e) {
      throw Error('Error getting auth state');
    }
  }

  async function signIn(value: User) {
    setAuth({ ...auth, loading: true, message: 'Logging in' });
    // Validate user using our API
    const body = { code: value.serverAuthCode };
    const response = await request.post('/google-authentication/login', body);

    // Add accessToken response to the keychain to manage sessions
    await Keychain.setGenericPassword(
      value.user.email,
      JSON.stringify(response.data),
      {
        service: 'netscapes',
      },
    );

    // Set headers to use access token
    setTokenHeaders(response.data.accessToken);

    // Change state to reflect signed in user
    setAuth({ isSignedIn: true, loading: false, message: '' });
  }

  async function clearKeychain() {
    await Keychain.resetGenericPassword({ service: 'netscapes' });
    setAuth({ isSignedIn: false, loading: false, message: '' });
  }

  async function logOut() {
    setAuth({ ...auth, loading: true, message: 'Logging out' });
    await GoogleSignin.signOut();
    await request.post('/auth/logout');
    clearKeychain();
  }

  async function handleUnauthorized() {
    // Set loading to true while this process is happening
    setAuth({ ...auth, loading: true, message: 'Reauthenticating' });

    // Fetch keychain tokens & parse so we can use them
    const result = await Keychain.getGenericPassword({
      service: 'netscapes',
    });
    let tokens: ITokens | Record<string, never> = {};
    if (result && result.password) {
      tokens = JSON.parse(result.password);
    }
    if (tokens.refreshToken) {
      // Use refresh token to fetch a new valid access token
      setTokenHeaders(tokens.refreshToken);
      const response = await request.post('/auth/refresh-token');

      // If response is accessToken, it means you remain signed in,
      // it will set this new token in the keychain, set headers & state.
      if (response.data.accessToken) {
        setTokenHeaders(response.data.accessToken);
        await Keychain.setGenericPassword(
          response.data.email,
          JSON.stringify({
            ...tokens,
            accessToken: response.data.accessToken,
          }),
          {
            service: 'netscapes',
          },
        );
        setAuth({ ...auth, loading: false });
        return;
      }
    }
    // If you have no tokens & you get no new access token from using the refresh
    // reset our client by clearing the keychain, setting isSignedIn to false.
    clearKeychain();
  }

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = useMemo(() => ({
    auth, signIn, logOut, handleUnauthorized,
  }), [auth.loading, auth.isSignedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
