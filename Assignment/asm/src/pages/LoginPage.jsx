import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast, useAuth} from '../hooks/index';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user, isLoading, setRedirectAfterLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectProcessedRef = useRef(false);

  // Set redirect URL from query params only once
  useEffect(() => {
    if (!redirectProcessedRef.current) {
      const redirectUri = searchParams.get('redirect_uri');
      if (redirectUri) {
        setRedirectAfterLogin(redirectUri);
      }
      redirectProcessedRef.current = true;
    }
  }, [searchParams, setRedirectAfterLogin]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectUri = searchParams.get('redirect_uri') || '/';
      navigate(redirectUri);
    }
  }, [user, searchParams, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Cho phép nhập email hoặc tên đăng nhập => chỉ cần không rỗng
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email hoặc tên đăng nhập';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        showToast('Đăng nhập thành công!', 'success');
        const redirectUri = searchParams.get('redirect_uri') || '/';
        navigate(redirectUri);
      } else {
        showToast(result.message, 'danger');
      }
    } catch {
      showToast('Có lỗi xảy ra, vui lòng thử lại', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Đăng nhập</h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email hoặc Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email hoặc tên đăng nhập"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập mật khẩu"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </Form>

              <hr />
              
              <div className="text-center">
                <p className="mb-2">Khách hàng mới?</p>
                <Link to="/register" className="btn btn-outline-primary w-100">
                  Tạo tài khoản
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
