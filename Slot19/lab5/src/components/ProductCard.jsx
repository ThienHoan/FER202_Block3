import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/format';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourites();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleAddFavourite = () => {
    addToFavourites(product);
    showToast('Added to favourites', 'success');
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const isProductFavourite = isFavourite(product.id);

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">
          {product.description}
        </Card.Text>
        
        <div className="mb-3">
          <Badge bg="primary" className="fs-6">
            {formatPrice(product.price)}
          </Badge>
        </div>

        <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleViewDetails}
            className="flex-fill"
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          
          <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            className="flex-fill"
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          
          {isProductFavourite ? (
            <Button
              variant="warning"
              size="sm"
              onClick={() => navigate('/favourites')}
              className="flex-fill"
            >
              Browse to My favourites
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleAddFavourite}
              className="flex-fill"
              disabled={!isAuthenticated}
              title={!isAuthenticated ? "Please login to add favourites" : ""}
            >
              <FaHeart className="me-1" />
              Favourite
            </Button>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
