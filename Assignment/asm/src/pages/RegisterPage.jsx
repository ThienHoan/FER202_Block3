import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast, useAuth} from '../hooks/index';

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: About
    fullName: '',
    email: '',
    avatar: null,
    avatarPreview: '',
    
    // Step 2: Account
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, user, isLoading, setRedirectAfterLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const secretQuestions = [
    'Tên con vật nuôi đầu tiên của bạn là gì?',
    'Bạn sinh ra ở thành phố nào?',
    'Món ăn yêu thích của bạn là gì?',
    'Tên trường tiểu học của bạn là gì?',
    'Tên bạn thân nhất của bạn là gì?'
  ];

  // Set redirect URL from query params
  useEffect(() => {
    const redirectUri = searchParams.get('redirect_uri');
    if (redirectUri) {
      setRedirectAfterLogin(redirectUri);
    }
  }, [searchParams, setRedirectAfterLogin]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectUri = searchParams.get('redirect_uri') || '/';
      navigate(redirectUri);
    }
  }, [user, navigate, searchParams]);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (formData.avatar && formData.avatar.size > 2 * 1024 * 1024) {
      newErrors.avatar = 'Kích thước file không được vượt quá 2MB';
    }

    if (formData.avatar && !['image/jpeg', 'image/png'].includes(formData.avatar.type)) {
      newErrors.avatar = 'Chỉ chấp nhận file JPG và PNG';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải có chữ hoa, chữ thường và ký tự đặc biệt';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.secretQuestion) {
      newErrors.secretQuestion = 'Vui lòng chọn câu hỏi bí mật';
    }

    if (!formData.answer.trim()) {
      newErrors.answer = 'Câu trả lời là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'avatar') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          avatar: file,
          avatarPreview: URL.createObjectURL(file)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        secretQuestion: formData.secretQuestion,
        answer: formData.answer
      });
      
      if (result.success) {
        showToast('Đăng ký thành công! Bạn đã được đăng nhập.', 'success');
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

  const progress = (currentStep / 2) * 100;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
              
              <ProgressBar now={progress} className="mb-4" />
              
              <div className="text-center mb-3">
                <span className="text-muted">
                  Bước {currentStep} / 2: {currentStep === 1 ? 'Thông tin cá nhân' : 'Thông tin tài khoản'}
                </span>
              </div>

              {currentStep === 1 && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và tên *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      isInvalid={!!errors.fullName}
                      placeholder="Nhập họ và tên"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="Nhập email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Avatar (tùy chọn)</Form.Label>
                    <Form.Control
                      type="file"
                      name="avatar"
                      onChange={handleChange}
                      isInvalid={!!errors.avatar}
                      accept="image/jpeg,image/png"
                    />
                    <Form.Text className="text-muted">
                      Chỉ chấp nhận file JPG, PNG. Kích thước tối đa 2MB.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.avatar}
                    </Form.Control.Feedback>
                    
                    {formData.avatarPreview && (
                      <div className="mt-2">
                        <img
                          src={formData.avatarPreview}
                          alt="Avatar preview"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </div>
                    )}
                  </Form.Group>

                  <Button variant="primary" onClick={handleNext} className="w-100">
                    Tiếp theo
                  </Button>
                </Form>
              )}

              {currentStep === 2 && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập *</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      placeholder="Nhập tên đăng nhập"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Nhập mật khẩu"
                    />
                    <Form.Text className="text-muted">
                      Ít nhất 6 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Xác nhận mật khẩu *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Câu hỏi bí mật *</Form.Label>
                    <Form.Select
                      name="secretQuestion"
                      value={formData.secretQuestion}
                      onChange={handleChange}
                      isInvalid={!!errors.secretQuestion}
                    >
                      <option value="">Chọn câu hỏi bí mật</option>
                      {secretQuestions.map((question, index) => (
                        <option key={index} value={question}>
                          {question}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.secretQuestion}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Câu trả lời *</Form.Label>
                    <Form.Control
                      type="text"
                      name="answer"
                      value={formData.answer}
                      onChange={handleChange}
                      isInvalid={!!errors.answer}
                      placeholder="Nhập câu trả lời"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.answer}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={handlePrevious} className="flex-fill">
                      Quay lại
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="flex-fill"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Đang đăng ký...
                        </>
                      ) : (
                        'Đăng ký'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
