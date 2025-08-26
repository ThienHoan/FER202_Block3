import React, { createContext, useReducer, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// Initial state
const initialState = {
  items: []
};

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Helper: convert price (number | "$123") to number
const toNumberPrice = (price) => {
  if (price == null) return 0;
  if (typeof price === 'number') return price;
  const cleaned = String(price).replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return { items: action.payload };
    
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { ...action.payload, qty: 1 }]
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.INCREASE_QUANTITY:
      return {
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      };
    
    case CART_ACTIONS.DECREASE_QUANTITY:
      return {
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
        )
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return { items: [] };
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: cartData
        });
      } catch {
        localStorage.removeItem('cart');
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage when items change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isInitialized]);

  const addToCart = (product) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.salePrice || product.price,
      image: product.image
    };
    
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: cartItem
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: id
    });
  };

  const increaseQuantity = (id) => {
    dispatch({
      type: CART_ACTIONS.INCREASE_QUANTITY,
      payload: id
    });
  };

  const decreaseQuantity = (id) => {
    dispatch({
      type: CART_ACTIONS.DECREASE_QUANTITY,
      payload: id
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Derived values
  const count = state.items.reduce((total, item) => total + item.qty, 0);
  const subtotal = state.items.reduce((total, item) => total + (toNumberPrice(item.price) * item.qty), 0);

  const value = {
    items: state.items,
    count,
    subtotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartContext;
