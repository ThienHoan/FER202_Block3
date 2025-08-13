import { Form, Row, Col } from 'react-bootstrap';

const SortControls = ({ sortBy, setSortBy }) => {
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'name-asc', label: 'Name A→Z' },
    { value: 'name-desc', label: 'Name Z→A' },
    { value: 'prep-asc', label: 'Prep Time ↑' },
    { value: 'prep-desc', label: 'Prep Time ↓' },
    { value: 'cook-asc', label: 'Cook Time ↑' },
    { value: 'cook-desc', label: 'Cook Time ↓' }
  ];

  return (
    <Row className="mb-3">
      <Col md={3}>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="sm"
        >
          <option value="">Sort by...</option>
          {sortOptions.slice(1).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default SortControls;
