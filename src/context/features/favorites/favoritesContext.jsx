import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import useUser from '../user/useUser';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const {token} = useUser();

  const toggleFavorite = async productId => {
    try {
      setLoading(true);
      const userDataString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userDataString);
      const userId = user?._id;

      if (userId) {
        const response = await fetch(
          'https://zaykaapi.vercel.app/favorites/toggle',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({
              userId,
              productId,
            }),
          },
        );

        const result = await response.json();
        const {success, message} = result;

        if (success) {
          getFavorites();
          setIsFavorite(!isFavorite);
          setTimeout(() => {
            showSuccessToast(message);
          }, 500);
        } else {
          showErrorToast(message);
        }
      } else {
        showErrorToast('User not logged in.');
      }
    } catch (error) {
      showErrorToast('Oops! Could not update favorites. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFavorites = async () => {
    try {
      // setLoading(true);
      const userDataString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userDataString);
      // console.log(user);
      const id = user?._id;
      // console.log(id);
      if (id) {
        const response = await fetch(
          `https://zaykaapi.vercel.app/users/${id}`,
          {
            method: 'GET',
          },
        );

        const result = await response.json();
        const {success, data} = result;

        if (success) {
          setFavoritesList(data.favorites);
        } else {
          setFavoritesList([]);
        }
      }
    } catch (error) {
      console.log('Error fetching: ', error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        toggleFavorite,
        favoritesList,
        getFavorites,
        loading,
        isFavorite,
        setIsFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
