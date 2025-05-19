import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const localUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);

    const token = await AsyncStorage.getItem('token');

    if (user) {
      setUser(user);
      setToken(token);
    } else {
      setUser('');
      setToken('');
    }
  };

  useEffect(() => {
    localUser();
  }, []);

  return (
    <UserContext.Provider value={{token, user, localUser}}>
      {children}
    </UserContext.Provider>
  );
};
