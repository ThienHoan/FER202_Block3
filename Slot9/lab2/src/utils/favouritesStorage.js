// LocalStorage utility cho favourites
const FAVOURITES_KEY = 'movieFavourites';

export const getFavourites = () => {
  try {
    const saved = localStorage.getItem(FAVOURITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favourites:', error);
    return [];
  }
};

export const saveFavourites = (favourites) => {
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    // Dispatch custom event để notify các components khác
    window.dispatchEvent(new CustomEvent('favouritesChanged', { 
      detail: favourites 
    }));
  } catch (error) {
    console.error('Error saving favourites:', error);
  }
};

export const addToFavourites = (movieId) => {
  const currentFavourites = getFavourites();
  const newFavourites = currentFavourites.includes(movieId)
    ? currentFavourites.filter(id => id !== movieId)
    : [...currentFavourites, movieId];
  
  saveFavourites(newFavourites);
  return newFavourites;
};

export const isFavourite = (movieId) => {
  return getFavourites().includes(movieId);
};

export const clearAllFavourites = () => {
  saveFavourites([]);
  return [];
};
