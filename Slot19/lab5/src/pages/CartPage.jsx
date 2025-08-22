import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Alert, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/format';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalValue, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      showToast('Item removed from cart', 'info');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'warning');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="border-0 bg-light">
              <Card.Body className="py-5">
                <FaShoppingCart size={64} className="text-muted mb-3" />
                <h3 className="mb-3">Your cart is empty</h3>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
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
      <Row>
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaShoppingCart className="me-2" />
              Shopping Cart
            </h2>
            <Button variant="outline-danger" size="sm" onClick={clearCart}>
              <FaTrash className="me-1" />
              Clear Cart
            </Button>
          </div>

          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted mb-0 small">{item.description}</p>
                      <div className="d-flex align-items-center mt-2">
                        <Badge bg="primary" className="me-3">
                          {formatPrice(parseFloat(item.price))}
                        </Badge>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <FaMinus />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="mb-2">
                        <strong>{formatPrice(parseFloat(item.price) * item.quantity)}</strong>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '2rem' }}>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({totalItems}):</span>
                <span>{formatPrice(parseFloat(totalValue))}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="fs-5">{formatPrice(parseFloat(totalValue))}</strong>
              </div>

              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={!isAuthenticated}
                >
                  <FaCreditCard className="me-2" />
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
                
                <Button
                  variant="outline-primary"
                  onClick={handleContinueShopping}
                >
                  <FaArrowLeft className="me-2" />
                  Continue Shopping
                </Button>
              </div>

              {!isAuthenticated && (
                <Alert variant="warning" className="mt-3">
                  <small>
                    Please <strong>login</strong> to complete your purchase
                  </small>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
