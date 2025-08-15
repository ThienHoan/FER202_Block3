import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { allGenres } from '../movie.js';

const RequestFormPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Movie title is required';
    }

    // Genre validation
    if (!formData.genre || formData.genre === 'All') {
      newErrors.genre = 'Please select a genre';
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.year);
    if (!formData.year) {
      newErrors.year = 'Release year is required';
    } else if (isNaN(year) || year < 1900 || year > currentYear + 5) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 5}`;
    }

    // Duration validation
    const duration = parseInt(formData.duration);
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else if (isNaN(duration) || duration <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    } else if (duration > 600) {
      newErrors.duration = 'Duration seems too long (max 600 minutes)';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          genre: '',
          year: '',
          duration: '',
          description: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  const genreOptions = allGenres.filter(genre => genre !== 'All');

  return (
    <div className="page-content">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="mb-4">Movie Request Form</h2>
            <p className="text-muted mb-4">
              Can't find the movie you're looking for? Submit a request and we'll consider adding it to our collection!
            </p>

            {showSuccess && (
              <Alert variant="success" className="mb-4">
                <Alert.Heading>Request submitted. Thank you!</Alert.Heading>
                <p>We've received your movie request and will review it soon.</p>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Movie Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter movie title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre *</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  isInvalid={!!errors.genre}
                >
                  <option value="">Select a genre</option>
                  {genreOptions.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Release Year *</Form.Label>
                    <Form.Control
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      isInvalid={!!errors.year}
                      placeholder="e.g. 2023"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.year}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration (minutes) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      isInvalid={!!errors.duration}
                      placeholder="e.g. 120"
                      min="1"
                      max="600"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  isInvalid={!!errors.description}
                  placeholder="Provide a detailed description of the movie (minimum 30 characters)"
                />
                <Form.Text className="text-muted">
                  {formData.description.length}/500 characters
                  {formData.description.length < 30 && formData.description.length > 0 && 
                    ` (${30 - formData.description.length} more needed)`
                  }
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </Form>

            <div className="mt-4">
              <small className="text-muted">* Required fields</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestFormPage;
