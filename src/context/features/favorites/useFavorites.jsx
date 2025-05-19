import {useContext} from 'react';
import {FavoritesContext} from './favoritesContext';

const useFavorites = () => useContext(FavoritesContext);

export default useFavorites;
