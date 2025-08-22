import { Form, InputGroup, Row, Col } from 'react-bootstrap'; // Form và layout Bootstrap
import PropTypes from 'prop-types'; // Kiểm tra kiểu props
import { allGenres } from '../movie.js'; // Danh sách thể loại để render select

const SearchFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy 
}) => { // Thanh công cụ tìm kiếm/lọc/sắp xếp
  return (
    <Row className="mb-4"> {/* Hàng chứa 3 cột */}
      <Col md={4}> {/* Ô nhập từ khóa */}
        <InputGroup>
          <InputGroup.Text>
            🔍
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa
          />
        </InputGroup>
      </Col>
      
      <Col md={4}> {/* Chọn thể loại */}
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
      
      <Col md={4}> {/* Chọn cách sắp xếp theo thời lượng */}
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

SearchFilterBar.propTypes = { // Kiểu props cho thanh công cụ
  searchTerm: PropTypes.string.isRequired, // Giá trị từ khóa hiện tại
  setSearchTerm: PropTypes.func.isRequired, // Hàm cập nhật từ khóa
  selectedGenre: PropTypes.string.isRequired, // Thể loại đang chọn
  setSelectedGenre: PropTypes.func.isRequired, // Hàm cập nhật thể loại
  sortBy: PropTypes.string.isRequired, // Cách sắp xếp hiện tại
  setSortBy: PropTypes.func.isRequired // Hàm cập nhật sắp xếp
};

export default SearchFilterBar; // Xuất mặc định thanh tìm kiếm/lọc/sắp xếp
