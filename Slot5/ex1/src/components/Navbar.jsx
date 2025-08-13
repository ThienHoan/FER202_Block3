import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RecipeRequestForm from './RecipeRequestForm';

const NavbarComponent = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <span className="text-success me-2">🍃</span>
            <span className="fw-bold text-dark">Healthy Recipe Finder</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" className="text-dark fw-medium">Home</Nav.Link>
              <Nav.Link href="#" className="text-dark fw-medium">About</Nav.Link>
              <Nav.Link href="#" className="text-dark fw-medium">Recipes</Nav.Link>
              <Nav.Link 
                href="#" 
                className="text-primary fw-medium"
                onClick={() => setShowForm(true)}
              >
                📝 Recipe Request Form
              </Nav.Link>
              <Nav.Link 
                href="#" 
                className="btn btn-dark text-white px-3 py-2 rounded ms-2"
                style={{ textDecoration: 'none' }}
              >
                Browse recipes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RecipeRequestForm 
        show={showForm} 
        onHide={() => setShowForm(false)} 
      />
    </>
  );
};

export default NavbarComponent
