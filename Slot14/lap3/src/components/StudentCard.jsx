import { Card, Button, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const StudentCard = ({ student, onViewDetails }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        {student.avatar ? (
          <Card.Img 
            variant="top" 
            src={student.avatar} 
            alt={student.name}
            style={{ height: '330px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div 
            className="bg-light d-flex align-items-center justify-content-center"
            style={{ height: '330px' }}
          >
            <span className="text-muted">No Avatar</span>
          </div>
        )}
        <Badge 
          bg="primary" 
          className="position-absolute top-0 start-0 m-2"
        >
          ID: {student.id}
        </Badge>
        {student.isNewProfile && (
          <Badge 
            bg="success" 
            className="position-absolute top-0 end-0 m-2"
          >
            NEW
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{student.name}</Card.Title>
        <Card.Text className="text-muted mb-2">
          <i className="fas fa-envelope me-2"></i>
          {student.email}
        </Card.Text>
        {student.phone && (
          <Card.Text className="text-muted mb-2">
            <i className="fas fa-phone me-2"></i>
            {student.phone}
          </Card.Text>
        )}
        <Card.Text className="mb-3">
          <Badge bg="info" className="me-2">
            Age: {student.age}
          </Badge>
          <Badge bg={student.avatar ? 'success' : 'secondary'}>
            {student.avatar ? 'Has Avatar' : 'No Avatar'}
          </Badge>
          {student.isNewProfile && (
            <Badge bg="warning" className="ms-2">
              Custom Profile
            </Badge>
          )}
        </Card.Text>
        <Button 
          variant="outline-primary" 
          onClick={() => onViewDetails(student)}
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentCard;
