import React from 'react';
import { Container, Row, Col, Table, Button, Card, Alert, InputGroup, Form } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useToast, useCart} from '../hooks/index';
import { productAPI } from '../services/api';
import { toNumberPrice, formatPricePreserve, detectCurrency, formatWithCurrency } from '../utils/price';

const CartPage = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, count, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Helper: lấy stock hiện tại và PATCH stock mới
  const patchStock = async (productId, delta) => {
    try {
      const res = await productAPI.getById(productId);
      const current = res.data;
      if (typeof current?.stock === 'number') {
        const newStock = Math.max(0, current.stock + delta);
        await productAPI.update(productId, { stock: newStock });
      }
    } catch (e) {
      console.warn('Không thể cập nhật stock trên server:', e?.message || e);
    }
  };

  const handleRemoveItem = async (id, title) => {
    // Hoàn lại toàn bộ tồn kho theo số lượng hiện tại trong giỏ
    const current = items.find(it => it.id === id);
    if (current) {
      await patchStock(id, current.qty); // tăng stock lại
    }
    removeFromCart(id);
    showToast(`Đã xóa ${title} khỏi giỏ hàng`, 'info');
  };

  const handleClearCart = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
      // Hoàn lại tồn kho cho tất cả sản phẩm trong giỏ
      for (const it of items) {
        await patchStock(it.id, it.qty);
      }
      clearCart();
      showToast('Đã xóa tất cả sản phẩm khỏi giỏ hàng', 'info');
    }
  };

  const formatPrice = (price) => formatPricePreserve(price);

  const handleIncreaseQty = async (id) => {
    // Giảm tồn kho đi 1 khi tăng số lượng
    await patchStock(id, -1);
    increaseQuantity(id);
  };

  const handleDecreaseQty = async (id) => {
    // Tăng tồn kho lại 1 khi giảm số lượng (không dưới 1)
    await patchStock(id, +1);
    decreaseQuantity(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container className="py-4">
        <Alert variant="info" className="text-center">
          <FaShoppingCart size={48} className="mb-3" />
          <h4>Giỏ hàng trống</h4>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Tiếp tục mua sắm
          </Button>
        </Alert>
      </Container>
    );
  }

  // Chọn currency dựa trên item đầu tiên (mặc định VND)
  const currency = detectCurrency(typeof items[0]?.price === 'string' ? items[0]?.price : '');

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Giỏ hàng ({count} sản phẩm)</h2>
        <Button variant="outline-danger" onClick={handleClearCart}>
          <FaTrash className="me-1" />
          Xóa tất cả
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const itemCurrency = detectCurrency(typeof item.price === 'string' ? item.price : '');
                    const lineTotal = toNumberPrice(item.price) * item.qty;
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
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
                          <InputGroup style={{ width: '120px' }}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDecreaseQty(item.id)}
                              disabled={item.qty <= 1}
                            >
                              <FaMinus />
                            </Button>
                            <Form.Control
                              value={item.qty}
                              readOnly
                              className="text-center"
                              size="sm"
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleIncreaseQty(item.id)}
                            >
                              <FaPlus />
                            </Button>
                          </InputGroup>
                        </td>
                        <td className="align-middle fw-bold">
                          {formatWithCurrency(lineTotal, itemCurrency)}
                        </td>
                        <td className="align-middle">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.title)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          <div className="mt-3">
            <Button variant="outline-primary" onClick={() => navigate('/')}>
              ← Tiếp tục mua sắm
            </Button>
          </div>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tóm tắt đơn hàng</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{formatWithCurrency(subtotal, currency)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Tổng cộng:</strong>
                <strong className="text-danger">{formatWithCurrency(subtotal, currency)}</strong>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handleCheckout}
              >
                Tiến hành thanh toán
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
