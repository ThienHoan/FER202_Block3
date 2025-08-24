import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavouritesContext = createContext();

// Initial state
const initialState = {
  favourites: [],
  loading: false
};

// Action types
const FAVOURITES_ACTIONS = {
  ADD_FAVOURITE: 'ADD_FAVOURITE',
  REMOVE_FAVOURITE: 'REMOVE_FAVOURITE',
  SET_FAVOURITES: 'SET_FAVOURITES',
  SET_LOADING: 'SET_LOADING'
};

// Reducer function
function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.ADD_FAVOURITE:
      if (state.favourites.find(item => item.id === action.payload.id)) {
        return state; // Already exists
      }
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    
    case FAVOURITES_ACTIONS.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter(item => item.id !== action.payload)
      };
    
    case FAVOURITES_ACTIONS.SET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      };
    
    case FAVOURITES_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
}

export function FavouritesProvider({ children }) {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavourites = localStorage.getItem('favourites');
      console.log('Loading favourites from localStorage:', savedFavourites);
      
      if (savedFavourites) {
        const parsedFavourites = JSON.parse(savedFavourites);
        console.log('Parsed favourites data:', parsedFavourites);
        
        if (Array.isArray(parsedFavourites)) {
          dispatch({ 
            type: FAVOURITES_ACTIONS.SET_FAVOURITES, 
            payload: parsedFavourites 
          });
          console.log('Favourites loaded successfully with', parsedFavourites.length, 'items');
        } else {
          console.warn('Saved favourites is not an array, clearing localStorage');
          localStorage.removeItem('favourites');
        }
      } else {
        console.log('No saved favourites found in localStorage');
      }
    } catch (error) {
      console.error('Error loading favourites from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('favourites');
    }
  }, []);

  // Save favourites to localStorage when state changes
  useEffect(() => {
    try {
      if (state.favourites && state.favourites.length > 0) {
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
        console.log('Favourites saved to localStorage:', state.favourites.length, 'items');
      } else {
        // Clear localStorage if favourites is empty
        localStorage.removeItem('favourites');
        console.log('Favourites cleared from localStorage (empty)');
      }
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error);
    }
  }, [state.favourites]);

  const addToFavourites = (item) => {
    dispatch({ type: FAVOURITES_ACTIONS.ADD_FAVOURITE, payload: item });
  };

  const removeFromFavourites = (id) => {
    dispatch({ type: FAVOURITES_ACTIONS.REMOVE_FAVOURITE, payload: id });
  };

  const isFavourite = (id) => {
    return state.favourites.some(item => item.id === id);
  };

  const getFavouritesCount = () => {
    return state.favourites.length;
  };

  const clearFavourites = () => {
    dispatch({ type: FAVOURITES_ACTIONS.SET_FAVOURITES, payload: [] });
  };

  return (
    <FavouritesContext.Provider value={{
      favourites: state.favourites,
      loading: state.loading,
      addToFavourites,
      removeFromFavourites,
      isFavourite,
      getFavouritesCount,
      clearFavourites
    }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
