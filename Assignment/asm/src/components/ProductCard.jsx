import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCart, useWishlist, useToast } from '../hooks/index';
import PropTypes from 'prop-types';
import { formatPricePreserve, toNumberPrice } from '../utils/price';
import { resolveImageUrl } from '../utils/assets';

const ProductCard = ({ product, onDecreaseStock }) => {
  const navigate = useNavigate();
  const { user, setRedirectAfterLogin } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    // Giảm stock tại UI nếu có
    if (typeof product.stock === 'number' && onDecreaseStock) {
      onDecreaseStock(product.id, 1);
    }
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
    navigate(`/products/${product.id}`);
  };

  const handleViewWishlist = (e) => {
    e.stopPropagation();
    navigate('/wishlist');
  };

  // Button Yêu thích (khôi phục hàm bị thiếu)
  const renderWishlistButton = () => {
    if (!user) {
      return (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleViewWishlist}
          className="w-100"
        >
          <FaHeart className="me-1" />
          Yêu thích
        </Button>
      );
    }

    return (
      <Button
        variant={isInWishlist(product.id) ? 'danger' : 'outline-danger'}
        size="sm"
        onClick={handleWishlistToggle}
        className="w-100"
      >
        <FaHeart className="me-1" />
        {isInWishlist(product.id) ? 'Đã yêu thích' : 'Thêm yêu thích'}
      </Button>
    );
  };

  // Sử dụng normalized data từ config mapping
  const title = product.title || 'Không có tên';
  const brand = product.brand || 'Không có thương hiệu';
  const image = resolveImageUrl(product.image || '/images/default.jpg');
  const price = product.price || 0;
  const salePrice = product.salePrice || null;
  const description = product.description || 'Không có mô tả';
  const tags = product.tags || [];
  
  // Các trường mới có thể có
  const stock = product.stock;
  const rating = product.rating;
  const year = product.year;
  const warranty = product.warranty;
  const colors = product.colors;

  return (
    <Card 
      className="h-100 product-card shadow-sm" 
      onClick={handleViewDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        {/* Tags */}
        <div className="position-absolute top-0 start-0 p-2">
          {tags.includes('hot') && (
            <Badge bg="danger" className="me-1">
              HOT
            </Badge>
          )}
          {tags.includes('sale') && (
            <Badge bg="warning" text="dark">
              SALE
            </Badge>
          )}
          {/* Hiển thị tồn kho nếu có trường stock */}
          {typeof stock === 'number' && (
            stock > 0 ? (
              <Badge bg="info" className="me-1">CÒN {stock}</Badge>
            ) : (
              <Badge bg="secondary" className="me-1">HẾT HÀNG</Badge>
            )
          )}
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2 text-truncate">
          {title}
        </Card.Title>
        
        <Card.Text className="text-muted small mb-2">
          {brand}
        </Card.Text>
        
        <Card.Text className="small text-muted mb-2 line-clamp-2">
          {description}
        </Card.Text>

        {/* Hiển thị các thông tin mới nếu có */}
        {year && (
          <Card.Text className="small text-muted mb-1">
            Năm: {year}
          </Card.Text>
        )}
        
        {warranty && (
          <Card.Text className="small text-muted mb-1">
            Bảo hành: {warranty}
          </Card.Text>
        )}
        
        {colors && colors.length > 0 && (
          <Card.Text className="small text-muted mb-1">
            Màu: {colors.join(', ')}
          </Card.Text>
        )}
        
        {typeof stock === 'number' && (
          <Card.Text className="small text-muted mb-1">
            Tồn kho: {stock > 0 ? stock : 'Hết hàng'}
          </Card.Text>
        )}
        
        {rating > 0 && (
          <div className="mb-2">
            <span className="text-warning">★</span>
            <span className="small text-muted ms-1">{rating}/5</span>
          </div>
        )}

        <div className="price-section mb-3">
          {salePrice ? (
            <>
              <div className="fw-bold text-danger fs-5">
                {formatPricePreserve(salePrice)}
              </div>
              <div className="text-muted text-decoration-line-through">
                {formatPricePreserve(price)}
              </div>
            </>
          ) : (
            <div className="fw-bold fs-5">
              {formatPricePreserve(price)}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="w-100 mb-2"
          >
            <FaShoppingCart className="me-1" />
            Thêm vào giỏ
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
            className="w-100 mb-2"
          >
            <FaEye className="me-1" />
            Xem chi tiết
          </Button>
          
          {renderWishlistButton()}
        </div>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    salePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    // Các trường mới
    stock: PropTypes.number,
    rating: PropTypes.number,
    year: PropTypes.number,
    warranty: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    isNew: PropTypes.bool,
    isHot: PropTypes.bool,
    isSale: PropTypes.bool
  }).isRequired,
  onDecreaseStock: PropTypes.func
};

export default ProductCard;
