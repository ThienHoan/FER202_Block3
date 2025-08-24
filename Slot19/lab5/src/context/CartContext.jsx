import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: [],

  
  loading: false
};

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART: 'SET_CART',
  SET_LOADING: 'SET_LOADING'
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };
    
    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
    
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        cartItems: action.payload
      };
    
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      console.log('Loading cart from localStorage:', savedCart);
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Parsed cart data:', parsedCart);
        
        if (Array.isArray(parsedCart)) {
          dispatch({ type: CART_ACTIONS.SET_CART, payload: parsedCart });
          console.log('Cart loaded successfully with', parsedCart.length, 'items');
        } else {
          console.warn('Saved cart is not an array, clearing localStorage');
          localStorage.removeItem('cartItems');
        }
      } else {
        console.log('No saved cart found in localStorage');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('cartItems');
    }
  }, []);

  // Save cart to localStorage when state changes
  useEffect(() => {
    try {
      if (state.cartItems && state.cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      } else {
        // Clear localStorage if cart is empty
        localStorage.removeItem('cartItems');
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.cartItems]);

  const addToCart = (dish) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: dish });
  };

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const totalValue = state.cartItems
    .reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0)
    .toFixed(2);

  const totalItems = state.cartItems
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cartItems: state.cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        totalValue,
        totalItems,
        loading: state.loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
