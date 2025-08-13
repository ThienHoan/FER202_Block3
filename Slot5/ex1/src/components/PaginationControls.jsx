import { Pagination, Form, Row, Col } from 'react-bootstrap';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const renderPaginationItems = () => {
    const items = [];
    
    // First button
    items.push(
      <Pagination.First 
        key="first" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      />
    );
    
    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
    );

    // Page numbers
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next 
        key="next" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    );
    
    // Last button
    items.push(
      <Pagination.Last 
        key="last" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    );

    return items;
  };

  return (
    <Row className="align-items-center mt-4">
      <Col md={6}>
        <div className="d-flex align-items-center">
          <span className="me-2">Items per page:</span>
          <Form.Select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
            style={{ width: 'auto' }}
            size="sm"
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </Form.Select>
        </div>
      </Col>
      <Col md={6}>
        <div className="d-flex justify-content-end">
          <Pagination className="mb-0">
            {renderPaginationItems()}
          </Pagination>
        </div>
      </Col>
    </Row>
  );
};

export default PaginationControls;
