import React from 'react';
import {FavoritesProvider} from '../features/favorites/favoritesContext';
import {UserProvider} from '../features/user/userContext';

export const MainContext = ({children}) => {
  return (
    <UserProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </UserProvider>
  );
};
