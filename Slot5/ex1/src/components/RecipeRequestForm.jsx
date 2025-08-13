import { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const RecipeRequestForm = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    maxPrepTime: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Recipe request submitted successfully!');
    onHide();
    setFormData({
      name: '',
      email: '',
      ingredient: '',
      maxPrepTime: '',
      notes: ''
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="me-2">📝</span>
          Recipe Request Form
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Desired Ingredient</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredient"
                  placeholder="e.g., salmon, quinoa, avocado, or any specific ingredient you'd like"
                  value={formData.ingredient}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify your desired ingredient
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Max Prep Time</Form.Label>
                <Form.Select
                  name="maxPrepTime"
                  value={formData.maxPrepTime}
                  onChange={handleChange}
                >
                  <option value="">Select time...</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select maximum prep time
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="notes"
              placeholder="Tell us more about your recipe preferences, dietary restrictions, or any specific requirements..."
              value={formData.notes}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please add some notes about your request
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <span className="me-2">✈️</span>
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeRequestForm;
