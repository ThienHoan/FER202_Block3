import { Provider } from "react-redux";
import { store } from "./store";
import Counter from "./components/Counter";
import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <Container className="py-4 d-flex flex-column justify-content-center min-vh-100">
        <h1 className="text-center mb-5 text-white">Lab 6 - Redux Examples</h1>
        <Row className="justify-content-center">
          <Col lg={3} md={4} sm={6} className="mb-3">
            <Counter />
          </Col>
          <Col lg={3} md={4} sm={6} className="mb-3">
            <Cart />
          </Col>
          <Col lg={3} md={4} sm={6} className="mb-3">
            <Auth />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}
