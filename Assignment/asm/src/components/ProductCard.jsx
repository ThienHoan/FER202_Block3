import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../hooks/useToast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, setRedirectAfterLogin } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    
    if (!user) {
      // User not logged in, redirect to login
      const currentPath = window.location.pathname;
      setRedirectAfterLogin(currentPath);
      showToast('Vui lòng đăng nhập để lưu danh sách yêu thích', 'info');
      navigate(`/login?redirect_uri=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
      addToWishlist(product);
      showToast('Đã thêm vào danh sách yêu thích!', 'success');
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleViewWishlist = (e) => {
    e.stopPropagation();
    navigate('/wishlist');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderWishlistButton = () => {
    if (!user) {
      return (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleWishlistToggle}
          className="w-100 mb-2"
        >
          <FaHeart className="me-1" />
          <span className="d-none d-md-inline">Thêm yêu thích</span>
          <span className="d-md-none">Yêu thích</span>
        </Button>
      );
    }

    if (isInWishlist(product.id)) {
      return (
        <Button
          variant="danger"
          size="sm"
          onClick={handleViewWishlist}
          className="w-100 mb-2"
        >
          <FaHeart className="me-1" />
          <span className="d-none d-md-inline">Xem danh sách</span>
          <span className="d-md-none">Đã thích</span>
        </Button>
      );
    }

    return (
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleWishlistToggle}
        className="w-100 mb-2"
      >
        <FaHeart className="me-1" />
        <span className="d-none d-md-inline">Thêm yêu thích</span>
        <span className="d-md-none">Yêu thích</span>
      </Button>
    );
  };

  return (
    <Card className="h-100 shadow-sm border-0" style={{ width: '100%' }}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '250px', objectFit: 'cover' }}
          onClick={handleViewDetails}
          className="rounded-top"
        />
        
        {/* Tags */}
        <div className="position-absolute top-0 start-0 p-2">
          {product.tags?.includes('hot') && (
            <Badge bg="danger" className="me-1">
              HOT
            </Badge>
          )}
          {product.tags?.includes('sale') && (
            <Badge bg="warning" text="dark">
              SALE
            </Badge>
          )}
        </div>
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="flex-grow-1 text-center" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
          <Card.Title 
            className="h6 mb-2" 
            style={{ 
              height: '3rem', 
              overflow: 'hidden', 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.5rem'
            }}
          >
            {product.title}
          </Card.Title>
          
          <Card.Subtitle className="mb-3 text-muted small">
            {product.name}
          </Card.Subtitle>
          
          <div className="mb-3">
            {product.salePrice ? (
              <div>
                <div className="fw-bold text-danger fs-5 mb-1">
                  {formatPrice(product.salePrice)}
                </div>
                <div className="text-muted text-decoration-line-through small">
                  {formatPrice(product.price)}
                </div>
              </div>
            ) : (
              <div className="fw-bold text-primary fs-5">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-grid gap-2">
            {renderWishlistButton()}
            
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                className="flex-fill"
              >
                <FaShoppingCart className="me-1" />
                Thêm giỏ hàng
              </Button>
              
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleViewDetails}
                className="d-flex align-items-center justify-content-center px-3"
              >
                <FaEye />
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
