import { useState } from 'react';
import { Card, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm position-relative">
        {/* Favorite Button */}
        <Button
          variant="link"
          className="position-absolute top-0 end-0 mt-2 me-2 p-1 bg-white rounded-circle shadow-sm"
          style={{ zIndex: 10, width: '40px', height: '40px' }}
          onClick={handleFavorite}
        >
          <span style={{ fontSize: '1.2rem', color: isFavorite ? '#e74c3c' : '#6c757d' }}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </Button>

        <Card.Img 
          variant="top" 
          src={recipe.image} 
          style={{ height: '200px', objectFit: 'cover' }}
          alt={recipe.title}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6 fw-bold mb-2">
            {recipe.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-3 flex-grow-1">
            {recipe.description}
          </Card.Text>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <span className="me-2">👥</span>
              <small className="text-muted">Servings: {recipe.servings}</small>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2">⏱️</span>
              <small className="text-muted">Prep: {recipe.prep} mins</small>
            </div>
          </div>

          {recipe.cook > 0 && (
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">🔥</span>
              <small className="text-muted">Cook: {recipe.cook} mins</small>
            </div>
          )}

          <div className="d-flex gap-2">
            <Button 
              variant="outline-danger" 
              size="sm" 
              className="flex-fill"
              onClick={handleFavorite}
            >
              <span className="me-1">{isFavorite ? '❤️' : '🤍'}</span>
              {isFavorite ? 'Favourited' : 'Add to Favourite'}
            </Button>
            <Button 
              variant="success" 
              size="sm" 
              className="flex-fill"
              onClick={handleShow}
            >
              View Recipe
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={5000} 
          autohide
          bg={isFavorite ? "success" : "secondary"}
        >
          <Toast.Header>
            <span className="me-2">{isFavorite ? '❤️' : '🤍'}</span>
            <strong className="me-auto">Favourites</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {isFavorite ? 'Added to favourites!' : 'Removed from favourites!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Recipe Detail Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">{recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="img-fluid rounded"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <h5 className="mb-3">Recipe Details</h5>
              <p className="text-muted mb-4">{recipe.description}</p>
              
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">👥</span>
                  <strong>Servings:</strong> <span className="ms-2">{recipe.servings}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">⏱️</span>
                  <strong>Prep Time:</strong> <span className="ms-2">{recipe.prep} minutes</span>
                </div>
                {recipe.cook > 0 && (
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">🔥</span>
                    <strong>Cook Time:</strong> <span className="ms-2">{recipe.cook} minutes</span>
                  </div>
                )}
                <div className="d-flex align-items-center">
                  <span className="me-2">🕒</span>
                  <strong>Total Time:</strong> <span className="ms-2">{recipe.prep + recipe.cook} minutes</span>
                </div>
              </div>

              <div className="border-top pt-3">
                <h6 className="mb-2">Nutritional Benefits:</h6>
                <p className="small text-muted">
                  This healthy recipe is packed with nutritious ingredients that provide essential vitamins, 
                  minerals, and antioxidants to support your wellness goalsaaa.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-between">
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => alert('Added to Cart!')}>
            <span className="me-2">🛒</span>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipeCard;
