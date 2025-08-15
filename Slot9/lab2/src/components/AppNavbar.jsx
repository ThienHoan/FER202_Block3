import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFavourites } from '../hooks/useFavourites';

const AppNavbar = ({ currentPath }) => {
  const { favouritesCount } = useFavourites();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎬 Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={currentPath === '/' ? 'active' : ''}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/favourites" 
              className={currentPath === '/favourites' ? 'active' : ''}
            >
              My Favourite Movies 
              {favouritesCount > 0 && (
                <Badge bg="success" className="ms-1">
                  {favouritesCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/request" 
              className={currentPath === '/request' ? 'active' : ''}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  currentPath: PropTypes.string.isRequired
};

export default AppNavbar;
