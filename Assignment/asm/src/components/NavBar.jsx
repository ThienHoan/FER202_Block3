import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NavBar = ({ onSearchChange, onSortChange, searchQuery, sortBy }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, onSearchChange]);

  const handleSearchChange = useCallback((e) => {
    setLocalSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    onSortChange(e.target.value);
  }, [onSortChange]);

  const sortOptions = [
    { value: 'name-asc', label: 'Tên A→Z' },
    { value: 'price-asc', label: 'Giá tăng dần' },
    { value: 'price-desc', label: 'Giá giảm dần' },
    { value: 'default', label: 'Mặc định' }
  ];

  return (
    <div className="bg-light py-3 border-bottom">
      <Container>
        <Row className="justify-content-center align-items-center g-3">
          <Col md={8} lg={6}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="border-start-0"
              />
            </InputGroup>
          </Col>
          <Col md={4} lg={3}>
            <Form.Select value={sortBy} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

NavBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default NavBar;
