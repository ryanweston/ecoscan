import React, {useState, useEffect, createContext} from 'react';
import {request, setTokenHeaders} from '../request';
import Keychain from 'react-native-keychain';

const authDefault = {isSignedIn: false, loading: true};
const AuthContext = createContext(authDefault);

const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState(authDefault);

  const getAuthState = async () => {
    try {
      const result = await Keychain.getGenericPassword({service: 'netscapes'});
      if (result.password) {
        console.log('PASSWORD:', result.password);
        setTokenHeaders(result.password);
        setAuth({isSignedIn: true, loading: false});
        return;
      }
      setAuth({isSignedIn: false, loading: false});
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async (value: any) => {
    try {
      const body = {token: value.idToken};
      const response = await request.post('/google-authentication', body);
      await Keychain.setGenericPassword(value.user.id, response.data.token, {
        service: 'netscapes',
      });
      setTokenHeaders(response.data.token);
      setAuth({isSignedIn: true, loading: false});
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    try {
      Keychain.resetGenericPassword({service: 'netscapes'});
      setAuth({isSignedIn: false, loading: false});
    } catch (e) {}
  };

  const handleUnauthorized = (code: number) => {
    if (code === 401) {
      logOut();
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, signIn, logOut, handleUnauthorized}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
