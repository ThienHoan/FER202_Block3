import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useToast, useCart, useWishlist, useAuth} from '../hooks/index';

const WishlistPage = () => {
  const { user } = useAuth();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect_uri=' + encodeURIComponent('/wishlist'));
    }
  }, [user, navigate]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    showToast('Đã xóa khỏi danh sách yêu thích', 'info');
  };

  const formatPrice = (price) => {
    // Xử lý price có thể là string hoặc number
    let numericPrice;
    
    if (typeof price === 'string') {
      // Loại bỏ ký hiệu $ và các ký tự không phải số
      const cleanPrice = price.replace(/[^0-9.-]+/g, '');
      numericPrice = parseFloat(cleanPrice);
      
      // Kiểm tra nếu parseFloat trả về NaN
      if (isNaN(numericPrice)) {
        console.warn('Không thể parse giá:', price);
        return 'Giá không hợp lệ';
      }
    } else if (typeof price === 'number') {
      numericPrice = price;
    } else {
      console.warn('Kiểu dữ liệu giá không hợp lệ:', typeof price, price);
      return 'Giá không hợp lệ';
    }
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(numericPrice);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Danh sách yêu thích</h2>
      
      {items.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h4>Danh sách yêu thích trống</h4>
          <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Tiếp tục mua sắm
          </Button>
        </Alert>
      ) : (
        <Row>
          {items.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6">{product.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{product.name}</Card.Subtitle>
                  
                  <div className="price-section mb-3">
                    {product.salePrice ? (
                      <>
                        <div className="fw-bold text-danger fs-5">
                          {formatPrice(product.salePrice)}
                        </div>
                        <div className="text-muted text-decoration-line-through">
                          {formatPrice(product.price)}
                        </div>
                      </>
                    ) : (
                      <div className="fw-bold fs-5">
                        {formatPrice(product.price)}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="d-flex gap-2 mb-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex-fill"
                      >
                        <FaShoppingCart className="me-1" />
                        Thêm vào giỏ
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/motorbikes/${product.id}`)}
                      className="w-100"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;
