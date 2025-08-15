import { useState, useEffect } from 'react';
import { 
  getFavourites, 
  addToFavourites as addToFavouritesStorage, 
  clearAllFavourites
} from '../utils/favouritesStorage';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites từ localStorage khi component mount
  useEffect(() => {
    const loadedFavourites = getFavourites();
    setFavourites(loadedFavourites);
  }, []);

  // Listen for changes từ các components khác
  useEffect(() => {
    const handleFavouritesChanged = (event) => {
      setFavourites(event.detail);
    };

    window.addEventListener('favouritesChanged', handleFavouritesChanged);
    
    return () => {
      window.removeEventListener('favouritesChanged', handleFavouritesChanged);
    };
  }, []);

  const addToFavourites = (movieId) => {
    const newFavourites = addToFavouritesStorage(movieId);
    setFavourites(newFavourites);
    return newFavourites;
  };

  const isFavourite = (movieId) => {
    return favourites.includes(movieId);
  };

  const clearFavourites = () => {
    const newFavourites = clearAllFavourites();
    setFavourites(newFavourites);
    return newFavourites;
  };

  return {
    favourites,
    addToFavourites,
    isFavourite,
    clearFavourites,
    favouritesCount: favourites.length
  };
};
