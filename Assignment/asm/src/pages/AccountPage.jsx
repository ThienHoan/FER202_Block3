import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaHeart, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect_uri=' + encodeURIComponent('/account'));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={3} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <FaUser size={60} className="text-muted mb-3" />
              <h5>{user.name}</h5>
              <p className="text-muted">{user.email}</p>
              <Button variant="outline-danger" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" />
                Đăng xuất
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <h2 className="mb-4">Tài khoản của tôi</h2>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <FaHeart size={40} className="text-danger mb-3" />
                  <h5>Danh sách yêu thích</h5>
                  <p className="text-muted">Xem các sản phẩm bạn đã lưu</p>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => navigate('/wishlist')}
                  >
                    Xem danh sách
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <FaShoppingBag size={40} className="text-primary mb-3" />
                  <h5>Đơn hàng của tôi</h5>
                  <p className="text-muted">Theo dõi các đơn hàng đã đặt</p>
                  <Button 
                    variant="outline-primary" 
                    disabled
                  >
                    Sắp có
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Thông tin cá nhân</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Tên đăng nhập:</strong>
                    <p className="text-muted mb-0">{user.name}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Email:</strong>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </Col>
              </Row>
              
              <div className="mt-3">
                <Button variant="outline-primary" disabled>
                  Chỉnh sửa thông tin (Sắp có)
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
