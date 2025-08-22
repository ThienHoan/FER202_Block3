// LocalStorage utility cho favourites
const FAVOURITES_KEY = 'movieFavourites'; // Key cố định để lưu trong localStorage

export const getFavourites = () => { // Đọc danh sách favourites từ localStorage
  try {
    const saved = localStorage.getItem(FAVOURITES_KEY); // Lấy chuỗi JSON đã lưu
    return saved ? JSON.parse(saved) : []; // Parse JSON hoặc trả về mảng rỗng
  } catch (error) {
    console.error('Error loading favourites:', error); // Log lỗi nếu JSON không hợp lệ
    return []; // Fallback an toàn
  }
};

export const saveFavourites = (favourites) => { // Ghi danh sách vào localStorage và phát sự kiện
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites)); // Lưu JSON
    // Dispatch custom event để notify các components khác
    window.dispatchEvent(new CustomEvent('favouritesChanged', { 
      detail: favourites // Gửi kèm danh sách mới
    }));
  } catch (error) {
    console.error('Error saving favourites:', error); // Log lỗi nếu setItem thất bại
  }
};

export const addToFavourites = (movieId) => { // Toggle một ID trong danh sách
  const currentFavourites = getFavourites(); // Lấy danh sách hiện tại
  const newFavourites = currentFavourites.includes(movieId) // Nếu đã có thì loại bỏ
    ? currentFavourites.filter(id => id !== movieId)
    : [...currentFavourites, movieId]; // Nếu chưa có thì thêm vào
  
  saveFavourites(newFavourites); // Lưu và phát sự kiện
  return newFavourites; // Trả về danh sách mới
};

export const isFavourite = (movieId) => { // Kiểm tra một ID có đang được yêu thích
  return getFavourites().includes(movieId); // Đọc từ storage và kiểm tra
};

export const clearAllFavourites = () => { // Xóa toàn bộ danh sách yêu thích
  saveFavourites([]); // Lưu mảng rỗng
  return []; // Trả về mảng rỗng
};
