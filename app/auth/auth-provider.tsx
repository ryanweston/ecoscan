import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState({});

  const setAuthState = async (value: any) => {
    try {
      await AsyncStorage.setItem('token', value);
      console.log('SETTING TOKEN', value);
      setAuth(value);
    } catch (e) {
      console.log(e);
    }
  };

  const getAuthState = async () => {
    try {
      const data = await AsyncStorage.getItem('token');
      let token = data ? data : '';
      // console.log(token);
      setAuth(token);
      console.log('auth is now', auth);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('RENDERING PROVIDER TWICE');
    getAuthState();
  });

  return (
    <AuthContext.Provider value={{auth, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
