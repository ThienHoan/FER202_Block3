import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../hooks/useToast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, setRedirectAfterLogin } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error('Không tìm thấy sản phẩm');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleWishlistToggle = () => {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>Lỗi</h4>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <h4>Không tìm thấy sản phẩm</h4>
          <Button variant="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-1" />
        Quay lại
      </Button>

      <Row>
        <Col md={6}>
          <Card>
            <div className="position-relative">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              
              {/* Tags */}
              <div className="position-absolute top-0 start-0 p-3">
                {product.tags?.includes('hot') && (
                  <Badge bg="danger" className="me-2 fs-6">
                    HOT
                  </Badge>
                )}
                {product.tags?.includes('sale') && (
                  <Badge bg="warning" text="dark" className="fs-6">
                    SALE
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <div className="ps-md-4">
            <h1 className="h2 mb-3">{product.title}</h1>
            <h5 className="text-muted mb-4">{product.name}</h5>

            <div className="price-section mb-4">
              {product.salePrice ? (
                <>
                  <div className="display-6 fw-bold text-danger mb-2">
                    {formatPrice(product.salePrice)}
                  </div>
                  <div className="text-muted text-decoration-line-through fs-4">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-success mt-2">
                    <small>
                      Tiết kiệm: {formatPrice(product.price - product.salePrice)}
                    </small>
                  </div>
                </>
              ) : (
                <div className="display-6 fw-bold">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>

            <div className="mb-4">
              <h6>Mô tả sản phẩm:</h6>
              <p className="text-muted">{product.description}</p>
            </div>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="me-2" />
                Thêm vào giỏ hàng
              </Button>

              <Button
                variant={isInWishlist(product.id) ? "danger" : "outline-danger"}
                size="lg"
                onClick={handleWishlistToggle}
              >
                <FaHeart className="me-2" />
                {isInWishlist(product.id) ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              </Button>
            </div>

            <div className="mt-4 p-3 bg-light rounded">
              <h6>Thông tin bổ sung:</h6>
              <ul className="list-unstyled mb-0">
                <li>✓ Bảo hành chính hãng</li>
                <li>✓ Miễn phí vận chuyển</li>
                <li>✓ Đổi trả trong 7 ngày</li>
                <li>✓ Hỗ trợ kỹ thuật 24/7</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
