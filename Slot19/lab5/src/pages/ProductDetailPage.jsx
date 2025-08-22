import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { dishes } from '../data/db';
import { formatPrice, assetUrl } from '../utils/format';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const product = dishes.find(dish => dish.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')} variant="primary">
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleToggleFavourite = () => {
    if (isFavourite(product.id)) {
      removeFromFavourites(product.id);
      showToast('Removed from favourites', 'info');
    } else {
      addToFavourites(product);
      showToast('Added to favourites', 'success');
    }
  };

  const handleBackToList = () => {
    navigate('/products');
  };

  const isProductFavourite = isFavourite(product.id);

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <img
            src={assetUrl(product.image)}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        </Col>
        <Col lg={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <Badge bg="primary" className="fs-5 mb-2">
                  {formatPrice(parseFloat(product.price))}
                </Badge>
                <h2 className="mb-2">{product.name}</h2>
                <p className="text-muted">{product.description}</p>
              </div>

              <div className="mt-auto">
                <ButtonGroup className="w-100 mb-3">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-fill"
                  >
                    <FaCartPlus className="me-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant={isProductFavourite ? "danger" : "outline-danger"}
                    size="lg"
                    onClick={handleToggleFavourite}
                    className="flex-fill"
                    disabled={!isAuthenticated}
                    title={!isAuthenticated ? "Please login to add favourites" : ""}
                  >
                    {isProductFavourite ? (
                      <>
                        <FaHeartBroken className="me-2" />
                        Remove
                      </>
                    ) : (
                      <>
                        <FaHeart className="me-2" />
                        Favourite
                      </>
                    )}
                  </Button>
                </ButtonGroup>

                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={handleBackToList}
                  className="w-100"
                >
                  <FaArrowLeft className="me-2" />
                  Back to List
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Information */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 bg-light">
            <Card.Body>
              <h3>Product Details</h3>
              <Row>
                <Col md={6}>
                  <h5>Ingredients</h5>
                  <p className="text-muted">
                    Fresh ingredients carefully selected to ensure the best quality and taste.
                  </p>
                </Col>
                <Col md={6}>
                  <h5>Preparation</h5>
                  <p className="text-muted">
                    Prepared with traditional methods and modern culinary techniques.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
