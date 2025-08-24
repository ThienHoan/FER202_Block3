import React, { createContext, useReducer, useEffect, useState } from 'react';

// Initial state
const initialState = {
  items: []
};

// Action types
const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  LOAD_WISHLIST: 'LOAD_WISHLIST'
};

// Reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return { items: action.payload };
    
    case WISHLIST_ACTIONS.ADD_TO_WISHLIST: {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        items: [...state.items, action.payload]
      };
    }
    
    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return { items: [] };
    
    default:
      return state;
  }
};

// Context
const WishlistContext = createContext();

// Provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({
          type: WISHLIST_ACTIONS.LOAD_WISHLIST,
          payload: wishlistData
        });
      } catch {
        localStorage.removeItem('wishlist');
      }
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage when items change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  }, [state.items, isInitialized]);

  const addToWishlist = (product) => {
    dispatch({
      type: WISHLIST_ACTIONS.ADD_TO_WISHLIST,
      payload: product
    });
  };

  const removeFromWishlist = (id) => {
    dispatch({
      type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST,
      payload: id
    });
  };

  const clearWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
  };

  const isInWishlist = (id) => {
    return state.items.some(item => item.id === id);
  };

  // Derived values
  const count = state.items.length;

  const value = {
    items: state.items,
    count,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
