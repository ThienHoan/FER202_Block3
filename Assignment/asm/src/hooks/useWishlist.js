import { useContext } from 'react';
import WishlistContext from '../contexts/WishlistContext';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist phải được sử dụng trong WishlistProvider');
  }
  return context;
};
