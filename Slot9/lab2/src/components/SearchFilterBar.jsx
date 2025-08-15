import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { allGenres } from '../movie.js';

const SearchFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>
            🔍
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Col>
      
      <Col md={4}>
        <Form.Select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {allGenres.map(genre => (
            <option key={genre} value={genre}>
              {genre === 'All' ? 'All Genres' : genre}
            </option>
          ))}
        </Form.Select>
      </Col>
      
      <Col md={4}>
        <Form.Select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Sort by Duration</option>
          <option value="duration-asc">Duration ↑ (Shortest first)</option>
          <option value="duration-desc">Duration ↓ (Longest first)</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  setSelectedGenre: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default SearchFilterBar;
