import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import NavBar from './NavBar';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Lỗi tải dữ liệu sản phẩm');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products using useMemo
  const visibleProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [products, searchQuery, sortBy]);

  // Handlers using useCallback
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <NavBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        searchQuery={searchQuery}
        sortBy={sortBy}
      />
      
      <Container className="py-4">
        {visibleProducts.length === 0 ? (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="info" className="text-center">
                <Alert.Heading>Không tìm thấy sản phẩm</Alert.Heading>
                <p className="mb-0">Thử tìm kiếm với từ khóa khác hoặc xem tất cả sản phẩm.</p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
            {visibleProducts.map((product) => (
              <Col 
                key={product.id} 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                className="d-flex justify-content-center"
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductGrid;
