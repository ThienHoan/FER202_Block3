import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavouritesContext = createContext();

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('movieFavourites');
    if (savedFavourites) {
      try {
        const parsed = JSON.parse(savedFavourites);
        setFavourites(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading favourites from localStorage:', error);
        setFavourites([]);
      }
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movieId) => {
    setFavourites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const isFavourite = (movieId) => {
    return favourites.includes(movieId);
  };

  const value = {
    favourites,
    addToFavourites,
    isFavourite
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

FavouritesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
