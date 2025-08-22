import React, { useContext } from "react"; // React và hook useContext
import { CartContext } from "../context/CartContext"; // Context giỏ hàng
import { Card, Button, Badge, Row, Col } from "react-bootstrap"; // Thành phần UI Bootstrap
import { FaList, FaCartPlus } from "react-icons/fa"; // Icon danh sách và thêm vào giỏ

const DishesList = ({ dishes }) => { // Danh sách món ăn
    const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ từ context

    return (
        <div>
          <h2 className="mb-4"> {/* Tiêu đề danh sách món */}
            <FaList className="me-2" />
            Danh sách món ăn
          </h2>
          <Row xs={1} md={2} className="g-4"> {/* Lưới món ăn */}
            {dishes.map((dish) => (
              <Col key={dish.id}>
                <Card className="h-100 shadow-sm"> {/* Thẻ món ăn */}
                  <Card.Img 
                    variant="top" 
                    src={dish.image} 
                    alt={dish.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column"> {/* Nội dung món */}
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {dish.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center"> {/* Giá và nút */}
                      <Badge bg="primary" className="fs-6">
                        ${parseFloat(dish.price).toFixed(2)}
                      </Badge>
                      <Button 
                        variant="success"
                        onClick={() => addToCart(dish)} // Thêm vào giỏ
                      >
                        <FaCartPlus className="me-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    );
};

export default DishesList;  // Xuất mặc định danh sách món
    
