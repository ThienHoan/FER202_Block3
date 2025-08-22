import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaHeart, FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const FavouritesPage = () => {
  const navigate = useNavigate();
  const { favourites, removeFromFavourites, clearFavourites } = useFavourites();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleRemoveFromFavourites = (id) => {
    removeFromFavourites(id);
    showToast('Removed from favourites', 'info');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleClearAll = () => {
    clearFavourites();
    showToast('All favourites cleared', 'info');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="border-0 bg-light">
              <Card.Body className="py-5">
                <FaHeart size={64} className="text-muted mb-3" />
                <h3 className="mb-3">Login Required</h3>
                <p className="text-muted mb-4">
                  Please login to view and manage your favourites.
                </p>
                <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (favourites.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="border-0 bg-light">
              <Card.Body className="py-5">
                <FaHeart size={64} className="text-muted mb-3" />
                <h3 className="mb-3">No favourites yet</h3>
                <p className="text-muted mb-4">
                  You haven't added any products to your favourites yet.
                </p>
                <Button variant="primary" size="lg" onClick={handleContinueShopping}>
                  Start Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <FaHeart className="me-2 text-danger" />
              My Favourites ({favourites.length})
            </h2>
            <div className="d-flex gap-2">
              <Button variant="outline-danger" size="sm" onClick={handleClearAll}>
                <FaTrash className="me-1" />
                Clear All
              </Button>
              <Button variant="outline-primary" size="sm" onClick={handleContinueShopping}>
                <FaArrowLeft className="me-1" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Favourites Grid */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {favourites.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm position-relative">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              
              {/* Remove from favourites button */}
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => handleRemoveFromFavourites(product.id)}
                title="Remove from favourites"
              >
                <FaTrash />
              </Button>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6 mb-2">{product.name}</Card.Title>
                <Card.Text className="flex-grow-1 small text-muted mb-2">
                  {product.description}
                </Card.Text>
                
                <div className="mb-3">
                  <span className="badge bg-primary fs-6">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart className="me-1" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Summary Card */}
      <Row className="mt-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="text-center">
              <h5 className="mb-3">Favourites Summary</h5>
              <p className="text-muted mb-3">
                You have {favourites.length} product{favourites.length !== 1 ? 's' : ''} in your favourites.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="primary" onClick={handleContinueShopping}>
                  <FaArrowLeft className="me-1" />
                  Continue Shopping
                </Button>
                <Button variant="outline-danger" onClick={handleClearAll}>
                  <FaTrash className="me-1" />
                  Clear All Favourites
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FavouritesPage;
