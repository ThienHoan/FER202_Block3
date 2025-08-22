import React, { useContext, useState } from "react"; // React và các hook cần thiết
import { CartContext } from "../context/CartContext"; // Context giỏ hàng
import { Card, Button, ListGroup, Alert, Badge, Modal, Spinner } from "react-bootstrap"; // UI từ Bootstrap
import { FaShoppingCart, FaShoppingBasket, FaTrash, FaTrashAlt, FaCheckCircle, FaCreditCard } from "react-icons/fa"; // Icon

const Cart = () => { // Component giỏ hàng
    const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext); // Lấy dữ liệu và action từ context
    const [showConfirm, setShowConfirm] = useState(false); // Hiện modal xác nhận thanh toán
    const [processing, setProcessing] = useState(false); // Trạng thái đang xử lý thanh toán
    const [showSuccess, setShowSuccess] = useState(false); // Hiện thông báo thanh toán thành công

    const startCheckout = () => { // Bắt đầu quy trình thanh toán
        if (cartItems.length === 0) return; // Không làm gì nếu giỏ rỗng
        setShowConfirm(true); // Mở modal xác nhận
    };

    const handleConfirmCheckout = async () => { // Xác nhận thanh toán
        setProcessing(true); // Bắt đầu xử lý
        // Giả lập quá trình thanh toán
        setTimeout(() => {
            setProcessing(false); // Kết thúc xử lý
            setShowConfirm(false); // Đóng modal
            clearCart(); // Xóa giỏ hàng
            setShowSuccess(true); // Hiện thông báo thành công
            // Ẩn thông báo sau 3 giây
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1200);
    };

    return (
        <Card className="shadow-sm"> {/* Khung giỏ hàng */}
            <Card.Header className="bg-primary text-white"> {/* Header */}
                <h5 className="mb-0 d-flex align-items-center">
                    <FaShoppingCart className="me-2" />
                    Giỏ hàng
                </h5>
            </Card.Header>
            <Card.Body>
                {showSuccess && (
                    <Alert variant="success" className="d-flex align-items-center"> {/* Alert thành công */}
                        <FaCheckCircle className="me-2" />
                        Thanh toán thành công! Cảm ơn bạn đã đặt món.
                    </Alert>
                )}

                {cartItems.length === 0 ? (
                    <Alert variant="dark" className="text-center"> {/* Khi giỏ trống */}
                        <FaShoppingBasket className="fa-2x mb-2" />
                        <p className="mb-0">Giỏ hàng của bạn đang trống.</p>
                    </Alert>
                ) : (
                    <div>
                        <ListGroup variant="flush"> {/* Danh sách món trong giỏ */}
                            {cartItems.map((item) => (
                                <ListGroup.Item 
                                    key={item.id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h6 className="mb-0">{item.name}</h6>
                                        <small className="text-muted">${item.price}</small>
                                    </div>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        
                        <hr />
                        
                        <div className="d-flex justify-content-between align-items-center mb-3"> {/* Tổng số món */}
                            <span>Tổng số món:</span>
                            <Badge bg="secondary">{cartItems.length}</Badge>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-3"> {/* Tổng giá trị */}
                            <span>Tổng giá trị:</span>
                            <Badge bg="success" className="fs-6">${totalValue}</Badge>
                        </div>
                        
                        <div className="d-grid gap-2"> {/* Hành động chính */}
                            <Button 
                                variant="success"
                                onClick={startCheckout}
                            >
                                <FaCreditCard className="me-1" />
                                Xác nhận đơn hàng
                            </Button>
                            <Button 
                                variant="danger"
                                onClick={clearCart}
                            >
                                <FaTrashAlt className="me-1" />
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                )}
            </Card.Body>

            {/* Modal xác nhận thanh toán */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận thanh toán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn thanh toán đơn hàng tổng trị giá <strong>${totalValue}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)} disabled={processing}>
                        Hủy
                    </Button>
                    <Button variant="success" onClick={handleConfirmCheckout} disabled={processing}>
                        {processing && <Spinner size="sm" animation="border" className="me-2" />}
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default Cart; // Xuất mặc định giỏ hàng