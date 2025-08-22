import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

// Initial state
const initialState = {
  toasts: []
};

// Action types
const TOAST_ACTIONS = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_TOASTS: 'CLEAR_TOASTS'
};

// Reducer function
function toastReducer(state, action) {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      const newToast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 3000
      };
      return {
        ...state,
        toasts: [...state.toasts, newToast]
      };
    
    case TOAST_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    
    case TOAST_ACTIONS.CLEAR_TOASTS:
      return {
        ...state,
        toasts: []
      };
    
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const showToast = (message, type = 'info', duration = 3000) => {
    dispatch({
      type: TOAST_ACTIONS.ADD_TOAST,
      payload: { message, type, duration }
    });
  };

  const removeToast = (id) => {
    dispatch({
      type: TOAST_ACTIONS.REMOVE_TOAST,
      payload: id
    });
  };

  const clearToasts = () => {
    dispatch({
      type: TOAST_ACTIONS.CLEAR_TOASTS
    });
  };

  // Auto-remove toasts after duration
  React.useEffect(() => {
    state.toasts.forEach(toast => {
      if (toast.duration > 0) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [state.toasts]);

  return (
    <ToastContext.Provider value={{
      toasts: state.toasts,
      showToast,
      removeToast,
      clearToasts
    }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
