import React, { useContext } from "react";
import { CartContext } from "../src/CartContext";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { FaList, FaCartPlus } from "react-icons/fa";

const DishesList = ({ dishes }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div>
          <h2 className="mb-4">
            <FaList className="me-2" />
            Danh sách món ăn
          </h2>
          <Row xs={1} md={2} className="g-4">
            {dishes.map((dish) => (
              <Col key={dish.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={dish.image} 
                    alt={dish.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {dish.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge bg="primary" className="fs-6">
                        ${parseFloat(dish.price).toFixed(2)}
                      </Badge>
                      <Button 
                        variant="success"
                        onClick={() => addToCart(dish)}
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

export default DishesList;  
    
