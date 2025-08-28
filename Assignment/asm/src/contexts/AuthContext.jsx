import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { accountAPI } from '../services/api';
import PropTypes from 'prop-types';

// Initial state
const initialState = {
  user: null,
  isLoading: false,
  redirectAfterLogin: '/'
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_REDIRECT: 'SET_REDIRECT',
  CLEAR_REDIRECT: 'CLEAR_REDIRECT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return { ...state, isLoading: true };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return { 
        ...state, 
        user: action.payload, 
        isLoading: false
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return { ...state, isLoading: false };
    
    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null };
    
    case AUTH_ACTIONS.SET_REDIRECT:
      return { ...state, redirectAfterLogin: action.payload };
    
    case AUTH_ACTIONS.CLEAR_REDIRECT:
      return { ...state, redirectAfterLogin: '/' };
    
    default:
      return state;
  }
};

// Context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: userData
        });
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      const currentUser = localStorage.getItem('user');
      const newUser = JSON.stringify(state.user);
      if (currentUser !== newUser) {
        localStorage.setItem('user', newUser);
      }
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Cho phép đăng nhập bằng email hoặc username và chặn tài khoản inactive
  const login = async (emailOrUsername, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Fetch accounts from JSON server
      const response = await accountAPI.getAll();
      const accounts = response.data;
      
      // Normalize input
      const input = (emailOrUsername || '').trim();
      const inputLower = input.toLowerCase();
      
      // Find account by email or username
      const account = accounts.find(acc => {
        const accEmail = (acc.email || '').toLowerCase();
        const accUsername = (acc.username || '').toLowerCase();
        return (accEmail === inputLower || accUsername === inputLower) && acc.password === password;
      });

      if (!account) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE });
        return { success: false, message: 'Thông tin đăng nhập không đúng' };
      }

      // Check status linh hoạt (string, boolean, number) - CHỈ DÙNG MAPPING
      const isAccountActive = () => {
        // Check status (boolean): true = active, false = inactive (từ mapping)
        if (typeof account.status === 'boolean') {
          return account.status === true;
        }
        
        // Check status (number): 1 = active, 0 = inactive
        if (typeof account.status === 'number') {
          return account.status === 1;
        }
        
        // Check status (string): "active" / "inactive"
        if (typeof account.status === 'string') {
          return account.status.toLowerCase() === 'active';
        }
        
        // Mặc định active nếu không có trường nào
        return true;
      };

      if (!isAccountActive()) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE });
        return { success: false, message: 'Tài khoản của bạn đang không hoạt động' };
      }

      const user = {
        id: account.id,
        name: account.username || account.fullName || 'User',
        email: account.email || ''
      };
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      return { success: true, user };
    } catch {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE });
      return { success: false, message: 'Lỗi kết nối server' };
    }
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      // Fetch existing accounts to get next ID
      const response = await accountAPI.getAll();
      const accounts = response.data;
      
      // Check if email already exists
      const existingAccount = accounts.find(acc => acc.email === userData.email);
      if (existingAccount) {
        dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE });
        return { success: false, message: 'Email đã được sử dụng' };
      }

      // Check if username already exists
      const existingUsername = accounts.find(acc => acc.username === userData.username);
      if (existingUsername) {
        dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE });
        return { success: false, message: 'Tên đăng nhập đã được sử dụng' };
      }

      // Generate new ID
      const newId = accounts.length > 0 ? Math.max(...accounts.map(acc => acc.id)) + 1 : 1;
      
      // Create new account
      const newAccount = {
        id: newId,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        secretQuestion: userData.secretQuestion,
        answer: userData.answer,
        status: 'active'
      };

      // Save to JSON server
      const createResponse = await accountAPI.create(newAccount);

      if (createResponse.status === 201) {
        const user = {
          id: newAccount.id,
          name: newAccount.username,
          email: newAccount.email
        };
        
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: user
        });
        
        return { success: true, user };
      } else {
        dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE });
        return { success: false, message: 'Lỗi tạo tài khoản' };
      }
    } catch {
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE });
      return { success: false, message: 'Lỗi kết nối server' };
    }
  };

  const logout = useCallback(() => {
    // Clear cart and wishlist when logout
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  const setRedirectAfterLogin = useCallback((path) => {
    dispatch({
      type: AUTH_ACTIONS.SET_REDIRECT,
      payload: path
    });
  }, []);

  const clearRedirectAfterLogin = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_REDIRECT });
  }, []);

  const value = {
    user: state.user,
    isLoading: state.isLoading,
    redirectAfterLogin: state.redirectAfterLogin,
    login,
    register,
    logout,
    setRedirectAfterLogin,
    clearRedirectAfterLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
