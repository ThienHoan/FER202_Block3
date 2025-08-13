import { Form, InputGroup, Row, Col, Container } from 'react-bootstrap';

const Filters = ({ searchTerm, setSearchTerm, maxPrepTime, setMaxPrepTime, maxCookTime, setMaxCookTime }) => {
  return (
    <div className="bg-light py-4">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Row className="g-3">
              {/* Prep Time Filter - Half width on tablet, full on mobile */}
              <Col lg={3} md={6} sm={12} className="mb-3 mb-lg-0">
                <Form.Select
                  size="lg"
                  value={maxPrepTime}
                  onChange={(e) => setMaxPrepTime(e.target.value)}
                >
                  <option value="">Max Prep Time</option>
                  <option value="5">5 mins</option>
                  <option value="10">10 mins</option>
                  <option value="15">15 mins</option>
                  <option value="20">20 mins</option>
                </Form.Select>
              </Col>
              
              {/* Cook Time Filter - Half width on tablet, full on mobile */}
              <Col lg={3} md={6} sm={12}>
                <Form.Select
                  size="lg"
                  value={maxCookTime}
                  onChange={(e) => setMaxCookTime(e.target.value)}
                >
                  <option value="">Max Cook Time</option>
                  <option value="0">No cooking</option>
                  <option value="10">10 mins</option>
                  <option value="15">15 mins</option>
                  <option value="20">20 mins</option>
                </Form.Select>
              </Col>

              {/* Search Input - Full width on mobile, half on desktop */}
              <Col lg={6} md={12} className="mb-3 mb-lg-0">
                <InputGroup size="lg">
                  <InputGroup.Text className="bg-white border-end-0">
                    🔍
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or ingredient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                    style={{ boxShadow: 'none' }}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filters;
