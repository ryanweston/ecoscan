import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, setTokenHeaders} from '../request';

const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState({});

  const setAuthState = async (value: any) => {
    try {
      console.log('idToken:', value.idToken);
      const body = {token: value.idToken};
      let response;
      if (value.idToken) {
        console.log('SIGNING IN');
        response = await request.post('/google-authentication', body);
        // change this in a second to remove authentication
        setTokenHeaders(response.data.token);
        console.log('JWT:', response.data.token);
      }

      await AsyncStorage.setItem('user', JSON.stringify(value));
      setAuth(value);
    } catch (e) {
      console.log(e);
    }
  };

  const getAuthState = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      // @ts-ignore
      let token = data ? JSON.parse(data) : {};
      setAuth(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
