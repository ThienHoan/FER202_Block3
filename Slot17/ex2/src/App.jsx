import React, { useMemo, useState, useEffect } from "react";
import { CartProvider } from "./CartContext";
import DishesList from "../components/DishesList"
import Cart from "../components/Cart";
import { Container, Row, Col, Navbar, Nav, Form, InputGroup, Button } from "react-bootstrap";
import { FaUtensils, FaSearch, FaTimesCircle, FaMoon, FaSun } from "react-icons/fa";

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return dishes;
    return dishes.filter((dish) =>
      dish.name.toLowerCase().includes(query) ||
      dish.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <CartProvider>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#">
              <FaUtensils className="me-2" />
              Restaurant Menu
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="me-3">
                <Nav.Link href="#menu">Menu</Nav.Link>
                <Nav.Link href="#cart">Cart</Nav.Link>
              </Nav>
              <Button
                variant="outline-light"
                onClick={() => setIsDark((v) => !v)}
                aria-label="Toggle dark mode"
              >
                {isDark ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}
                {isDark ? "Light" : "Dark"}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Container>
          <Row>
            <Col lg={8}>
              <div id="menu">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Tìm món ăn theo tên hoặc mô tả..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearchQuery("")}
                      title="Xóa tìm kiếm"
                    >
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
                <div className="text-muted mb-2">
                  {filteredDishes.length} món phù hợp
                </div>
              </div>
              <DishesList dishes={filteredDishes} />
            </Col>
            <Col lg={4}>
              <div id="cart">
                <Cart />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;

