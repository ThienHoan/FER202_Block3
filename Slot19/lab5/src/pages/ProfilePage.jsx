import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaSignOutAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="border-0 bg-light">
              <Card.Body className="py-5">
                <FaUser size={64} className="text-muted mb-3" />
                <h3 className="mb-3">Access Denied</h3>
                <p className="text-muted mb-4">
                  Please login to view your profile.
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

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaUser className="me-2" />
              User Profile
            </h2>
            <Button variant="outline-secondary" onClick={handleBackToHome}>
              <FaArrowLeft className="me-2" />
              Back to Home
            </Button>
          </div>

          <Row>
            <Col md={4}>
              <Card className="text-center mb-4">
                <Card.Body className="py-4">
                  <div className="mb-3">
                    <FaUser size={80} className="text-primary" />
                  </div>
                  <h5 className="mb-2">{user?.name || 'User'}</h5>
                  <p className="text-muted mb-0">{user?.email || 'user@example.com'}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <h6 className="mb-3">Quick Actions</h6>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" onClick={() => navigate('/favourites')}>
                      <FaEdit className="me-2" />
                      My Favourites
                    </Button>
                    <Button variant="outline-success" onClick={() => navigate('/cart')}>
                      <FaEdit className="me-2" />
                      View Cart
                    </Button>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Personal Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label text-muted">Full Name</label>
                        <p className="mb-0 fw-bold">{user?.name || 'Not provided'}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label text-muted">Email</label>
                        <p className="mb-0 fw-bold">{user?.email || 'Not provided'}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label text-muted">User ID</label>
                        <p className="mb-0 fw-bold">{user?.id || 'N/A'}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label text-muted">Account Status</label>
                        <p className="mb-0">
                          <span className="badge bg-success">Active</span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Account Features</h5>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <Col md={6}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <FaUser className="text-primary" />
                        </div>
                        <div>
                          <h6 className="mb-1">Profile Management</h6>
                          <small className="text-muted">Update your personal information</small>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <FaEnvelope className="text-success" />
                        </div>
                        <div>
                          <h6 className="mb-1">Email Notifications</h6>
                          <small className="text-muted">Stay updated with your orders</small>
                        </div>
                      </div>
                    </Col>
                  </div>
                </Card.Body>
              </Card>

              <Alert variant="info">
                <h6>Need Help?</h6>
                <p className="mb-2">
                  If you have any questions or need assistance, please contact our support team.
                </p>
                <Button variant="outline-info" size="sm">
                  Contact Support
                </Button>
              </Alert>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
