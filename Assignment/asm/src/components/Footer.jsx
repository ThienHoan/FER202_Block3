import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="g-4">
          <Col md={4} className="text-center text-md-start">
            <h5 className="mb-3">📱 PhoneStore</h5>
            <p className="text-muted">
              Cửa hàng điện thoại hàng đầu Việt Nam. 
              Chuyên cung cấp các sản phẩm điện thoại chính hãng với giá tốt nhất.
            </p>
          </Col>
          
          <Col md={4} className="text-center text-md-start">
            <h6 className="mb-3">Liên hệ</h6>
            <div className="text-muted">
              <div className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                <FaMapMarkerAlt className="me-2" />
                123 Đường ABC, Quận 1, TP.HCM
              </div>
              <div className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                <FaPhone className="me-2" />
                0123-456-789
              </div>
              <div className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                <FaEnvelope className="me-2" />
                info@phonestore.com
              </div>
            </div>
          </Col>
          
          <Col md={4} className="text-center text-md-start">
            <h6 className="mb-3">Theo dõi chúng tôi</h6>
            <div className="mb-3">
              <a 
                href="https://github.com/ThienHoan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                <FaGithub size={32} className="hover-opacity" />
              </a>
            </div>
            <div className="text-muted">
              <small>
                Phát triển bởi: <strong>Thiên Hoàn</strong>
              </small>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; 2025 PhoneStore. Tất cả quyền được bảo lưu.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
