import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="h-100 shadow-sm">
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

          <Button 
            variant="success" 
            size="sm" 
            className="w-100"
            onClick={handleShow}
          >
            View Recipe
          </Button>
        </Card.Body>
      </Card>

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
                  minerals, and antioxidants to support your wellness goals.
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
