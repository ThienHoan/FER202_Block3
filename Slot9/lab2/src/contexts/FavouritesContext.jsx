import { createContext, useContext, useState, useEffect } from 'react'; // Import các hook React cần thiết
import PropTypes from 'prop-types'; // Import PropTypes để kiểm tra kiểu props
import { 
  getFavourites as getFavouritesFromStorage, // Hàm lấy danh sách yêu thích từ localStorage
  addToFavourites as addToFavouritesInStorage, // Hàm toggle thêm/xóa ID phim vào danh sách và lưu
  clearAllFavourites as clearAllFavouritesInStorage // Hàm xóa toàn bộ danh sách yêu thích
} from '../utils/favouritesStorage'; // Import các tiện ích thao tác storage

const FavouritesContext = createContext(); // Tạo Context để chia sẻ trạng thái favourites toàn app

export const useFavourites = () => { // Hook tiện dụng để lấy value từ Context
  const context = useContext(FavouritesContext); // Lấy giá trị context hiện tại
  if (!context) { // Nếu dùng ngoài Provider
    throw new Error('useFavourites must be used within a FavouritesProvider'); // Thông báo lỗi rõ ràng
  }
  return context; // Trả về object giá trị từ Provider
};

export const FavouritesProvider = ({ children }) => { // Provider bao bọc app để cung cấp context
  const [favourites, setFavourites] = useState([]); // State lưu danh sách ID phim yêu thích

  // Load initial favourites
  useEffect(() => { // Chạy 1 lần khi mount
    setFavourites(getFavouritesFromStorage()); // Lấy dữ liệu từ localStorage
  }, []); // Chỉ chạy một lần

  // Sync with custom event from storage utils
  useEffect(() => { // Lắng nghe sự kiện custom để đồng bộ giữa các component/tab
    const handleFavouritesChanged = (event) => { // Handler khi danh sách thay đổi
      setFavourites(event.detail); // Cập nhật state theo dữ liệu mới
    };
    window.addEventListener('favouritesChanged', handleFavouritesChanged); // Đăng ký lắng nghe
    return () => window.removeEventListener('favouritesChanged', handleFavouritesChanged); // Hủy khi unmount
  }, []); // Đăng ký một lần

  const addToFavourites = (movieId) => { // Hàm toggle thêm/xóa một phim khỏi danh sách
    const newFavourites = addToFavouritesInStorage(movieId); // Cập nhật trong storage và nhận danh sách mới
    setFavourites(newFavourites); // Đồng bộ state
    return newFavourites; // Trả về để dùng nếu cần
  };

  const isFavourite = (movieId) => favourites.includes(movieId); // Kiểm tra một ID có trong danh sách không

  const clearFavourites = () => { // Xóa toàn bộ danh sách yêu thích
    const newFavourites = clearAllFavouritesInStorage(); // Cập nhật storage
    setFavourites(newFavourites); // Cập nhật state
    return newFavourites; // Trả về danh sách rỗng
  };

  const value = { // Đóng gói giá trị cung cấp qua Context
    favourites, // Mảng ID phim yêu thích hiện tại
    addToFavourites, // Hàm toggle yêu thích
    isFavourite, // Hàm kiểm tra yêu thích
    clearFavourites, // Hàm xóa hết
    favouritesCount: favourites.length // Số lượng phim yêu thích
  };

  return (
    <FavouritesContext.Provider value={value}> {/* Cung cấp value cho cây component */}
      {children} {/* Render các component con */}
    </FavouritesContext.Provider>
  );
};

FavouritesProvider.propTypes = { // Kiểm tra kiểu cho props children
  children: PropTypes.node.isRequired // Bắt buộc phải có children
};
