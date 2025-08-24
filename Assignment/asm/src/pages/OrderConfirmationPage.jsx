import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Không tìm thấy đơn hàng');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>Lỗi</h4>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body className="text-center py-5">
              <FaCheckCircle size={80} className="text-success mb-4" />
              <h2 className="text-success mb-3">Đặt hàng thành công!</h2>
              <p className="lead mb-4">
                Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
              </p>
              
              {order && (
                <div className="text-start">
                  <Row className="mb-4">
                    <Col md={6}>
                      <strong>Mã đơn hàng:</strong> #{order.id}
                    </Col>
                    <Col md={6}>
                      <strong>Ngày đặt:</strong> {formatDate(order.date)}
                    </Col>
                  </Row>

                  <h5 className="mb-3">Chi tiết đơn hàng</h5>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{formatPrice(item.price)}</td>
                          <td>{item.qty}</td>
                          <td>{formatPrice(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="3">Tổng cộng:</th>
                        <th className="text-danger">{formatPrice(order.total)}</th>
                      </tr>
                    </tfoot>
                  </Table>

                  <Alert variant="info" className="mt-4">
                    <h6>Thông tin giao hàng:</h6>
                    <ul className="mb-0">
                      <li>Đơn hàng sẽ được xử lý trong vòng 24 giờ</li>
                      <li>Thời gian giao hàng: 2-5 ngày làm việc</li>
                      <li>Bạn sẽ nhận được email xác nhận và thông tin theo dõi đơn hàng</li>
                    </ul>
                  </Alert>
                </div>
              )}

              <div className="d-flex gap-3 justify-content-center mt-4">
                <Button variant="primary" onClick={() => navigate('/')}>
                  Tiếp tục mua sắm
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/account')}>
                  Xem đơn hàng của tôi
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmationPage;
