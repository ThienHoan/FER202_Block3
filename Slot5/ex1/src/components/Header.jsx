import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href="#" className="d-flex align-items-center">
        <span className="text-success fw-bold me-2">🍃</span>
        Healthy Recipe Finder
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" className="fw-semibold" style={{ marginLeft: "500px" }}>Home</Nav.Link>
          <Nav.Link href="#" className="fw-semibold">About</Nav.Link>
          <Nav.Link href="#" className="fw-semibold">Recipes</Nav.Link>
        </Nav>
        <Button variant="dark" className="ms-auto">
          Browse recipes
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
