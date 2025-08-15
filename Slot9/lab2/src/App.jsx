import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import RequestFormPage from './pages/RequestFormPage';
import './App.css';

// Component wrapper to get current location for navbar
const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <AppNavbar currentPath={location.pathname} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/request" element={<RequestFormPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App
