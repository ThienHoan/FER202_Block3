import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaHeart, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth, useCart, useWishlist } from '../hooks/index';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = () => {
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            📱 BikesStore
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Trang chủ</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav className="align-items-center">
            {/* Wishlist */}
            <LinkContainer to="/wishlist">
              <Nav.Link className="position-relative me-2 d-flex align-items-center">
                <FaHeart className="me-1" />
                <span className="d-lg-none">Yêu thích</span>
                {wishlistCount > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {wishlistCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="position-relative me-2 d-flex align-items-center">
                <FaShoppingCart className="me-1" />
                <span className="d-lg-none">Giỏ hàng</span>
                {cartCount > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User Menu */}
            {user ? (
              <NavDropdown 
                title={
                  <span className="d-flex align-items-center">
                    <FaUser className="me-1" />
                    <span className="d-none d-md-inline">{user.name}</span>
                    <span className="d-md-none">Tài khoản</span>
                  </span>
                } 
                id="user-nav-dropdown"
                align="end"
              >
                <LinkContainer to="/account">
                  <NavDropdown.Item>
                    <FaUser className="me-2" />
                    Tài khoản
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/wishlist">
                  <NavDropdown.Item>
                    <FaHeart className="me-2" />
                    Danh sách yêu thích
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="d-flex align-items-center">
                  <FaSignInAlt className="me-1" />
                  Đăng nhập
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Checkout */}
            <LinkContainer to="/checkout">
              <Nav.Link className="ms-2 d-flex align-items-center">
                Thanh toán
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Header không cần PropTypes vì không nhận props

export default Header;
