import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect_uri=' + encodeURIComponent('/checkout'));
    }
  }, [user, navigate]);

  // Redirect to cart if empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Create order data
      const orderData = {
        userId: user.id,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: item.qty,
          total: item.price * item.qty
        })),
        total: subtotal,
        date: new Date().toISOString(),
        status: 'confirmed'
      };

      // Save order to JSON server
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        
        // Clear cart
        clearCart();
        
        showToast('Đặt hàng thành công!', 'success');
        
        // Navigate to order confirmation
        navigate(`/order-confirmation/${order.id}`);
      } else {
        throw new Error('Lỗi tạo đơn hàng');
      }
    } catch {
      showToast('Có lỗi xảy ra khi đặt hàng', 'danger');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user || items.length === 0) {
    return null; // Will redirect
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Thanh toán</h2>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Thông tin đơn hàng</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="me-3 rounded"
                          />
                          <div>
                            <h6 className="mb-0">{item.title}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {formatPrice(item.price)}
                      </td>
                      <td className="align-middle">
                        {item.qty}
                      </td>
                      <td className="align-middle fw-bold">
                        {formatPrice(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Thông tin khách hàng</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.name}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ giao hàng</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập địa chỉ giao hàng"
                    required
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tóm tắt đơn hàng</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Thuế VAT:</span>
                <span>Đã bao gồm</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Tổng cộng:</strong>
                <strong className="text-danger">{formatPrice(subtotal)}</strong>
              </div>

              <Alert variant="info" className="small">
                <strong>Lưu ý:</strong> Đơn hàng sẽ được xử lý trong vòng 24h. 
                Thời gian giao hàng từ 2-5 ngày làm việc.
              </Alert>

              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
              </Button>

              <div className="text-center mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/cart')}
                >
                  Quay lại giỏ hàng
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
