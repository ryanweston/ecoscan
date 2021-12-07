import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState({});

  const setAuthState = async (value: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
      // console.log('SETTING TOKEN', value);
      console.log(typeof value);
      setAuth(value);
      console.log('AUTH SET AFTER LOGIN', value);
    } catch (e) {
      console.log(e);
    }
  };

  const getAuthState = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      // @ts-ignore
      let token = data ? JSON.parse(data) : {};
      console.log(typeof token);
      // console.log(token);
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
