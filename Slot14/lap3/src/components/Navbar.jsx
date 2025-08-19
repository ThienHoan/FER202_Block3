import { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavigationBar = ({ onQuickSearch, onShowProfileForm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onQuickSearch(searchTerm);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#students" className="fw-bold">Students</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#" onClick={onShowProfileForm}>Build your Profile</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Quick search..."
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  onQuickSearch: PropTypes.func.isRequired,
  onShowProfileForm: PropTypes.func.isRequired
};

export default NavigationBar;
