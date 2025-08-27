import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/authSlice";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

export default function Auth() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3">Auth Example</Card.Title>
        
        <div className="flex-grow-1 d-flex flex-column justify-content-center">
          {user ? (
            <>
              <Alert variant="success" className="text-center mb-3">
                <i className="bi bi-person-check fs-4 d-block mb-2"></i>
                Welcome, <Badge bg="success">{user.username}</Badge>!
              </Alert>
              <div className="d-grid">
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={() => dispatch(logout())}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Alert variant="light" className="text-center mb-3">
                <i className="bi bi-person-x fs-4 d-block mb-2 text-muted"></i>
                <span className="text-muted">You are not logged in</span>
              </Alert>
              <div className="d-grid">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => dispatch(login({ username: "Thien" }))}
                >
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Button>
              </div>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
