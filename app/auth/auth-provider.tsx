import React, { useState, useEffect, createContext } from 'react';
import Keychain from 'react-native-keychain';
import { request, setTokenHeaders } from '../request';

const authDefault = { isSignedIn: false, loading: true };
const AuthContext = createContext(authDefault);

function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState(authDefault);

  const getAuthState = async () => {
    try {
      // Called on mount, fetches tokens from keychain, sets headers & state
      const result = await Keychain.getGenericPassword({ service: 'netscapes' });
      if (result.password) {
        const tokens = JSON.parse(result.password);
        setTokenHeaders(tokens.accessToken);
        setAuth({ isSignedIn: true, loading: false });
        return;
      }
      setAuth({ isSignedIn: false, loading: false });
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async (value: any) => {
    try {
      // Validate user using our API
      const body = { code: value.serverAuthCode };
      const response = await request.post('/google-authentication/login', body);
      console.log(response);

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
      setAuth({ isSignedIn: true, loading: false });
    } catch (e) {
      console.log(e);
    }
  };

  const clearKeychain = async () => {
    try {
      await Keychain.resetGenericPassword({ service: 'netscapes' });
      setAuth({ isSignedIn: false, loading: false });
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    try {
      await request.post('/auth/logout');
      clearKeychain();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnauthorized = async (code: number) => {
    try {
      console.log('HANDLE UNAUTHORIZED', code);
      if (code === 401) {
        // Set loading to true while this process is happening
        setAuth({ ...auth, loading: true });

        // Fetch keychain tokens & parse so we can use them
        const result = await Keychain.getGenericPassword({
          service: 'netscapes',
        });
        let tokens = {};
        if (result.password) {
          tokens = JSON.parse(result.password);
        }
        console.log('TOKENS', tokens);
        if (tokens.refreshToken) {
          console.log('HAS REFRESH TOKEN');
          // Use refresh token to fetch a new valid access token
          setTokenHeaders(tokens.refreshToken);
          const response = await request.post('/auth/refresh-token');

          // If response is accessToken, it means you remain signed in,
          // it will set this new token in the keychain, set headers & state.
          if (response.data.accessToken) {
            console.log('GOT NEW ACCESS TOKEN');
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{
      auth, signIn, logOut, handleUnauthorized,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
