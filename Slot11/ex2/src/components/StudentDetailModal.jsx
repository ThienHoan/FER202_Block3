import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const StudentDetailModal = ({ show, onHide, student }) => {
  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center">
            {student.avatar ? (
              <Image 
                src={student.avatar} 
                alt={student.name}
                fluid
                rounded
                className="mb-3"
                style={{ maxHeight: '200px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                }}
              />
            ) : (
              <div 
                className="bg-light d-flex align-items-center justify-content-center rounded mb-3"
                style={{ height: '200px' }}
              >
                <span className="text-muted">No Avatar</span>
              </div>
            )}
          </Col>
          <Col md={8}>
            <div className="student-info">
              <h4 className="mb-3">{student.name}</h4>
              <div className="mb-2">
                <strong>ID:</strong> {student.id}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> 
                <a href={`mailto:${student.email}`} className="ms-2">
                  {student.email}
                </a>
              </div>
              <div className="mb-2">
                <strong>Age:</strong> {student.age} years old
              </div>
              <div className="mb-2">
                <strong>Avatar Status:</strong> 
                <span className={`ms-2 badge ${student.avatar ? 'bg-success' : 'bg-secondary'}`}>
                  {student.avatar ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StudentDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  })
};

export default StudentDetailModal;
