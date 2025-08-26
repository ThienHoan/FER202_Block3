import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import { productAPI } from '../services/api';

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
        const response = await productAPI.getAll();
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper: convert price (number | "$123") to number
  const toNumberPrice = (price) => {
    if (price == null) return 0;
    if (typeof price === 'number') return price;
    const cleaned = String(price).replace(/[^0-9.-]+/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  // Điều chỉnh stock cục bộ và sync server theo delta (+/-)
  const adjustStock = useCallback(async (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId && typeof p.stock === 'number') {
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    }));

    try {
      const current = products.find(p => p.id === productId);
      const currentStock = typeof current?.stock === 'number' ? current.stock : null;
      if (currentStock !== null) {
        const newStock = Math.max(0, currentStock + delta);
        await productAPI.update(productId, { stock: newStock });
      }
    } catch (e) {
      console.warn('Không thể cập nhật stock trên server:', e?.message || e);
    }
  }, [products]);

  // Giảm stock khi add to cart từ ProductCard
  const handleDecreaseStock = useCallback(async (productId, decreaseBy = 1) => {
    await adjustStock(productId, -Math.abs(decreaseBy));
  }, [adjustStock]);

  // Lắng nghe sự kiện toàn cục từ CartPage để tăng/giảm stock
  useEffect(() => {
    const handler = (e) => {
      const { productId, delta } = e.detail || {};
      if (!productId || !delta) return;
      adjustStock(productId, delta);
    };
    window.addEventListener('stock-adjust', handler);
    return () => window.removeEventListener('stock-adjust', handler);
  }, [adjustStock]);

  // Filter and sort products using useMemo
  const visibleProducts = useMemo(() => {
    let filtered = products || [];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const title = (product?.title || '').toLowerCase();
        const brand = (product?.brand || '').toLowerCase();
        return title.includes(q) || brand.includes(q);
      });
    }

    // Sort products
    switch (sortBy) {
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'price-asc': {
        filtered = [...filtered].sort((a, b) => {
          const priceA = toNumberPrice(a.salePrice ?? a.price);
          const priceB = toNumberPrice(b.salePrice ?? b.price);
          return priceA - priceB;
        });
        break;
      }
      case 'price-desc': {
        filtered = [...filtered].sort((a, b) => {
          const priceA = toNumberPrice(a.salePrice ?? a.price);
          const priceB = toNumberPrice(b.salePrice ?? b.price);
          return priceB - priceA;
        });
        break;
      }
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
                <ProductCard product={product} onDecreaseStock={handleDecreaseStock} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

// ProductGrid không cần PropTypes vì không nhận props

export default ProductGrid;
