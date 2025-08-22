import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Router điều hướng
import AppNavbar from './components/AppNavbar'; // Thanh điều hướng
import HomePage from './pages/HomePage'; // Trang chủ danh sách phim
import FavouritesPage from './pages/FavouritesPage'; // Trang yêu thích
import RequestFormPage from './pages/RequestFormPage'; // Trang form yêu cầu
import './App.css'; // CSS cho app

// Component wrapper to get current location for navbar
const AppContent = () => { // Bọc để lấy đường dẫn hiện tại cho Navbar
  const location = useLocation(); // Hook lấy location hiện tại
  
  return (
    <>
      <AppNavbar currentPath={location.pathname} /> {/* Truyền path để set active */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/favourites" element={<FavouritesPage />} /> {/* Trang yêu thích */}
        <Route path="/request" element={<RequestFormPage />} /> {/* Form yêu cầu phim */}
      </Routes>
    </>
  );
};

function App() { // Root component của ứng dụng
  return (
    <Router> {/* Bọc bởi Router để dùng điều hướng */}
      <div className="App"> {/* Wrapper chính */}
        <AppContent /> {/* Nội dung chính */}
      </div>
    </Router>
  );
}

export default App // Xuất mặc định App
