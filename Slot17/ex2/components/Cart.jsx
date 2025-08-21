import React, { useContext, useState } from "react";
import { CartContext } from "../src/CartContext";
import { Card, Button, ListGroup, Alert, Badge, Modal, Spinner } from "react-bootstrap";
import { FaShoppingCart, FaShoppingBasket, FaTrash, FaTrashAlt, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const startCheckout = () => {
        if (cartItems.length === 0) return;
        setShowConfirm(true);
    };

    const handleConfirmCheckout = async () => {
        setProcessing(true);
        // Giả lập quá trình thanh toán
        setTimeout(() => {
            setProcessing(false);
            setShowConfirm(false);
            clearCart();
            setShowSuccess(true);
            // Ẩn thông báo sau 3 giây
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1200);
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaShoppingCart className="me-2" />
                    Giỏ hàng
                </h5>
            </Card.Header>
            <Card.Body>
                {showSuccess && (
                    <Alert variant="success" className="d-flex align-items-center">
                        <FaCheckCircle className="me-2" />
                        Thanh toán thành công! Cảm ơn bạn đã đặt món.
                    </Alert>
                )}

                {cartItems.length === 0 ? (
                    <Alert variant="dark" className="text-center">
                        <FaShoppingBasket className="fa-2x mb-2" />
                        <p className="mb-0">Giỏ hàng của bạn đang trống.</p>
                    </Alert>
                ) : (
                    <div>
                        <ListGroup variant="flush">
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
                        
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span>Tổng số món:</span>
                            <Badge bg="secondary">{cartItems.length}</Badge>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span>Tổng giá trị:</span>
                            <Badge bg="success" className="fs-6">${totalValue}</Badge>
                        </div>
                        
                        <div className="d-grid gap-2">
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

export default Cart;