import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h1 className="display-5 fw-bold text-dark mb-3">
              Explore our simple, healthy recipes
            </h1>
            <p className="lead text-muted">
              Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
              Use the search bar to find a recipe by name or ingredient, or simply scroll through 
              the list and let your senses be drawn to one.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
