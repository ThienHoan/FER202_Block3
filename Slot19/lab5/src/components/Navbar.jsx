import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { FaUtensils, FaShoppingCart, FaHeart, FaUser, FaHome, FaUserPlus } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { getFavouritesCount } = useFavourites();
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BootstrapNavbar 
      bg={isDark ? "dark" : "light"} 
      variant={isDark ? "dark" : "light"} 
      expand="lg" 
      className="mb-4 shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand 
          onClick={() => handleNavigation('/')} 
          className="d-flex align-items-center cursor-pointer"
          style={{ cursor: 'pointer' }}
        >
          <FaUtensils className="me-2" />
          Restaurant Menu
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation('/')} className="d-flex align-items-center">
              <FaHome className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/products')} className="d-flex align-items-center">
              Products
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/register')} className="d-flex align-items-center">
              <FaUserPlus className="me-1" />
              Register Account
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {/* Theme Toggle */}
            <Button
              variant={isDark ? "outline-light" : "outline-dark"}
              size="sm"
              onClick={toggleTheme}
              className="me-2"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </Button>

            {/* Cart Icon */}
            <Nav.Link onClick={() => handleNavigation('/cart')} className="position-relative me-3 cursor-pointer">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {/* Favourites Icon */}
            <Nav.Link onClick={() => handleNavigation('/favourites')} className="position-relative me-3 cursor-pointer">
              <FaHeart size={20} />
              {getFavouritesCount() > 0 && (
                <Badge 
                  bg="warning" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {getFavouritesCount()}
                </Badge>
              )}
            </Nav.Link>

            {/* User Profile Dropdown */}
            <Dropdown>
              <Dropdown.Toggle 
                variant={isDark ? "outline-light" : "outline-dark"}
                size="sm"
                className="d-flex align-items-center"
              >
                <FaUser className="me-1" />
                {isAuthenticated ? user?.name || 'Profile' : 'Account'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item onClick={() => handleNavigation('/profile')}>
                      <FaUser className="me-2" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigation('/favourites')}>
                      <FaHeart className="me-2" />
                      My Favourites
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => handleNavigation('/login')}>
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigation('/register')}>
                      <FaUserPlus className="me-2" />
                      Register
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
