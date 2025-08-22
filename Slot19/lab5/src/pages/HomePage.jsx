import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowRight, FaStar, FaUsers, FaClock } from 'react-icons/fa';
import Carousel from '../components/Carousel';
import { carouselImages } from '../data/db';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Hero Carousel */}
      <section className="mb-5">
        <Carousel images={carouselImages} autoPlay={true} interval={4000} />
      </section>

      {/* Welcome Section */}
      <section className="mb-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 mb-3">Welcome to Our Restaurant</h1>
              <p className="lead text-muted mb-4">
                Discover the perfect blend of traditional flavors and modern culinary excellence
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => handleNavigation('/products')}
              >
                Explore Our Menu <FaArrowRight className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="mb-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaStar size={40} className="text-warning" />
                  </div>
                  <Card.Title>Premium Quality</Card.Title>
                  <Card.Text>
                    We use only the finest ingredients to ensure every dish meets our high standards.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaUsers size={40} className="text-primary" />
                  </div>
                  <Card.Title>Expert Chefs</Card.Title>
                  <Card.Text>
                    Our experienced chefs bring creativity and passion to every meal they prepare.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaClock size={40} className="text-success" />
                  </div>
                  <Card.Title>Fast Service</Card.Title>
                  <Card.Text>
                    Quick and efficient service to ensure you enjoy your meal without waiting.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="mb-5 bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4">About Our Restaurant</h2>
              <p className="mb-3">
                Founded with a passion for exceptional dining experiences, our restaurant combines 
                traditional recipes with innovative culinary techniques to create memorable meals 
                for our valued customers.
              </p>
              <p className="mb-4">
                From our signature dishes to daily specials, every item on our menu is crafted 
                with care and attention to detail, ensuring a dining experience that exceeds expectations.
              </p>
              <Button 
                variant="outline-primary"
                onClick={() => handleNavigation('/products')}
              >
                View Full Menu
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="images/vadonut.png"
                alt="Restaurant Interior"
                className="img-fluid rounded shadow"
                style={{ height: '300px', objectFit: 'cover', width: '100%' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="mb-5">
        <Container>
          <Row className="text-center">
            <Col>
              <Card className="bg-primary text-white border-0">
                <Card.Body className="py-5">
                  <h2 className="mb-3">Ready to Experience Great Food?</h2>
                  <p className="mb-4">
                    Join us for an unforgettable culinary journey. Order now or visit us today!
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button 
                      variant="light" 
                      size="lg"
                      onClick={() => handleNavigation('/products')}
                    >
                      Order Now
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg"
                      onClick={() => handleNavigation('/register')}
                    >
                      Create Account
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
