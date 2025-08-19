import { useState, useMemo } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';

const StudentsPage = ({ students, quickSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [profileType, setProfileType] = useState('all'); // New filter for profile type
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Combined search term from navbar quick search and local search
  const effectiveSearchTerm = quickSearchTerm || searchTerm;

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    // Apply search filter - expanded to include phone and username
    if (effectiveSearchTerm) {
      const searchLower = effectiveSearchTerm.toLowerCase();
      filtered = filtered.filter(student => {
        // Basic search fields (all students have these)
        const nameMatch = student.name.toLowerCase().includes(searchLower);
        const emailMatch = student.email.toLowerCase().includes(searchLower);
        
        // Additional search fields for new profiles
        const phoneMatch = student.phone ? student.phone.toLowerCase().includes(searchLower) : false;
        const usernameMatch = student.username ? student.username.toLowerCase().includes(searchLower) : false;
        
        // Address search for new profiles
        const addressMatch = student.address ? (
          student.address.street.toLowerCase().includes(searchLower) ||
          student.address.city.toLowerCase().includes(searchLower) ||
          student.address.state.toLowerCase().includes(searchLower) ||
          student.address.country.toLowerCase().includes(searchLower)
        ) : false;
        
        return nameMatch || emailMatch || phoneMatch || usernameMatch || addressMatch;
      });
    }

    // Apply age range filter
    if (ageRange !== 'all') {
      filtered = filtered.filter(student => {
        switch (ageRange) {
          case 'young':
            return student.age <= 20;
          case 'middle':
            return student.age >= 21 && student.age <= 25;
          case 'older':
            return student.age > 25;
          default:
            return true;
        }
      });
    }

    // Apply avatar filter
    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar);
    }

    // Apply profile type filter
    if (profileType !== 'all') {
      filtered = filtered.filter(student => {
        switch (profileType) {
          case 'original':
            return !student.isNewProfile; // Original students from file
          case 'custom':
            return student.isNewProfile; // New profiles from localStorage
          default:
            return true;
        }
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'age-asc':
          return a.age - b.age;
        case 'age-desc':
          return b.age - a.age;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [students, effectiveSearchTerm, ageRange, hasAvatar, profileType, sortBy]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <Container className="py-4">
      {/* Hero Section */}
      <Card className="bg-primary text-white mb-4">
        <Card.Body className="text-center py-5">
          <h1 className="display-4 mb-3">Student Management</h1>
          <p className="lead">
            Manage and view student information with powerful filtering and sorting options
          </p>
        </Card.Body>
      </Card>

      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        ageRange={ageRange}
        onAgeRangeChange={setAgeRange}
        hasAvatar={hasAvatar}
        onHasAvatarChange={setHasAvatar}
        profileType={profileType}
        onProfileTypeChange={setProfileType}
      />

      {/* Sort and Results Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h4>
            Students ({filteredAndSortedStudents.length} of {students.length})
          </h4>
        </Col>
        <Col xs="auto">
          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </Col>
      </Row>

      {/* Student Grid */}
      <StudentGrid
        students={filteredAndSortedStudents}
        onViewDetails={handleViewDetails}
      />

      {/* Student Detail Modal */}
      <StudentDetailModal
        show={showModal}
        onHide={handleCloseModal}
        student={selectedStudent}
      />
    </Container>
  );
};

StudentsPage.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string
    })
  ).isRequired,
  quickSearchTerm: PropTypes.string
};

export default StudentsPage;
