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
    const savedFavourites = localStorage.getItem('favourites');
    if (savedFavourites) {
      dispatch({ 
        type: FAVOURITES_ACTIONS.SET_FAVOURITES, 
        payload: JSON.parse(savedFavourites) 
      });
    }
  }, []);

  // Save favourites to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
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
