import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/cartSlice";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3">
          Cart Example
          <Badge bg="info" className="ms-2">{cart.length}</Badge>
        </Card.Title>
        
        <Button 
          variant="primary" 
          className="mb-3" 
          size="lg"
          onClick={() => dispatch(addItem({ id: Date.now(), name: `Product ${cart.length + 1}` }))}
        >
          <i className="bi bi-plus-circle"></i> Add Product
        </Button>
        
        <div className="flex-grow-1">
          {cart.length > 0 ? (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item 
                  key={item.id} 
                  className="d-flex justify-content-between align-items-center px-0"
                >
                  <span>{item.name}</span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-center text-muted">
              <i className="bi bi-cart-x fs-2 d-block mb-2"></i>
              <p>Cart is empty</p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
