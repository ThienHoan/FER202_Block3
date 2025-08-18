import { Row, Col, Form, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Filters = ({ 
  searchTerm, 
  onSearchChange, 
  ageRange, 
  onAgeRangeChange, 
  hasAvatar, 
  onHasAvatarChange 
}) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Filters</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Search by name/email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name or email..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Age range</Form.Label>
              <Form.Select 
                value={ageRange} 
                onChange={(e) => onAgeRangeChange(e.target.value)}
              >
                <option value="all">All ages</option>
                <option value="young">≤ 20 years old</option>
                <option value="middle">21 - 25 years old</option>
                <option value="older">&gt; 25 years old</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="has-avatar"
                label="Has avatar only"
                checked={hasAvatar}
                onChange={(e) => onHasAvatarChange(e.target.checked)}
                className="mt-4"
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Filters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  ageRange: PropTypes.string.isRequired,
  onAgeRangeChange: PropTypes.func.isRequired,
  hasAvatar: PropTypes.bool.isRequired,
  onHasAvatarChange: PropTypes.func.isRequired
};

export default Filters;
