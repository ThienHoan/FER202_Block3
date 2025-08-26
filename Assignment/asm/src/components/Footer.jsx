import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaGithub, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaMobileAlt
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-light py-3 mt-auto">
      <Container>
        <Row className="g-3">
          {/* Brand Section */}
          <Col md={4} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
              <div className="bg-primary rounded-circle p-2 me-2">
                <FaMobileAlt size={20} className="text-white" />
              </div>
              <h6 className="mb-0 fw-bold text-primary">BikesStore</h6>
            </div>
            <p className="text-muted small mb-0">
              Cửa hàng xe chính hãng với giá tốt nhất
            </p>
          </Col>
          
          {/* Contact Section */}
          <Col md={4} className="text-center text-md-start">
            <h6 className="mb-2 text-primary">
              <FaPhone className="me-1" />
              Liên hệ
            </h6>
            <div className="small text-muted">
              <div className="mb-1">
                <FaMapMarkerAlt className="me-1" />
                123 Đường ABC, Quận 1, TP.HCM
              </div>
              <div className="mb-1">
                <FaPhone className="me-1" />
                0123-456-789
              </div>
              <div className="mb-1">
                <FaEnvelope className="me-1" />
                info@phonestore.com
              </div>
            </div>
          </Col>
          
          {/* Social Section */}
          <Col md={4} className="text-center text-md-start">
            <h6 className="mb-2 text-primary">
              <FaGithub className="me-1" />
              Theo dõi chúng tôi
            </h6>
            <div className="mb-2">
              <a 
                href="https://github.com/ThienHoan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                <FaGithub size={24} />
              </a>
            </div>
            <div className="small text-muted">
              Phát triển bởi: <strong>Thiên Hoàn</strong>
            </div>
          </Col>
        </Row>
        
        <hr className="my-3 border-secondary" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted small mb-0">
              &copy; {currentYear} BikeStore. Tất cả quyền được bảo lưu.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Footer không cần PropTypes vì không nhận props

export default Footer;
