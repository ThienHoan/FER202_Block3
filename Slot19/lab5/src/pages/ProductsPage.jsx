import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';
import { dishes } from '../data/db';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const filteredProducts = useProductFilters(dishes, searchQuery, sortBy, filterBy);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Our Products</h2>
          
          {/* Search and Filter Section */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                {/* Search */}
                <Col md={6} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant="outline-secondary"
                        onClick={clearSearch}
                        title="Clear search"
                      >
                        <FaTimesCircle />
                      </Button>
                    )}
                  </InputGroup>
                </Col>

                {/* Sort */}
                <Col md={3} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaSort />
                    </InputGroup.Text>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                      <option value="price-asc">Price Low to High</option>
                      <option value="price-desc">Price High to Low</option>
                    </Form.Select>
                  </InputGroup>
                </Col>

                {/* Filter */}
                <Col md={3} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaFilter />
                    </InputGroup.Text>
                    <Form.Select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="pizza">Pizza</option>
                      <option value="dessert">Dessert</option>
                      <option value="snack">Snack</option>
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>

              {/* Results Summary */}
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </small>
                {(searchQuery || filterBy !== 'all' || sortBy !== 'newest') && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSortBy('newest');
                      setFilterBy('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Row className="text-center py-5">
          <Col>
            <Card className="border-0 bg-light">
              <Card.Body>
                <h4 className="text-muted">No products found</h4>
                <p className="text-muted">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy('newest');
                    setFilterBy('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductsPage;
